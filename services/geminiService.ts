import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { mcpTools, toolDefinitions } from "../mcp/toolRegistry";
import { ChatMessage, MCPToolNames } from "../types";

// IMPORTANT: This key is intentionally left blank for this browser-only environment.
// In a real-world application (like Next.js), you would use an environment variable
// (e.g., process.env.NEXT_PUBLIC_API_KEY) and route API calls through a backend
// to protect the key. For this demo, the user must provide their own key.
const API_KEY = process.env.API_KEY || "";

/**
 * Handles the conversation logic with Mahmood's Agent.
 * Uses a two-step process if tools are needed:
 * 1. Initial call to detect tool requirements.
 * 2. If tools are called, execute them and stream the final response.
 * 3. If no tools are called, stream the initial response directly.
 */
export const sendMessageStreamToAgent = async (
  history: ChatMessage[],
  onChunk: (text: string) => void,
  onSources: (sources: string[]) => void
) => {
  if (!API_KEY) {
    onChunk("AI functionality is disabled. An API key has not been configured in the environment. Please add it to start the chat.");
    return;
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const model = "gemini-3-flash-preview";

  const systemInstruction = `
    You are Mahmood Alshahahdi's Personal AI Agent. 
    Your goal is to answer recruiter questions ONLY using the data provided via tools.
    If you don't have a specific detail, state it clearly and suggest the recruiter contact Mahmood directly.
    Tone: Professional, confident, concise, and helpful.
    Citations: You MUST cite your sources using the tool output 'source' field (e.g., [Source: profile.json]).
  `;

  const contents = history.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : msg.role,
    parts: [{ text: msg.content }]
  }));

  try {
    // Step 1: Check for tool calls
    const initialResponse = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction,
        tools: [{
          functionDeclarations: toolDefinitions.map(d => ({
            name: d.name,
            description: d.description,
            parameters: {
              type: Type.OBJECT,
              properties: Object.entries(d.parameters.properties).reduce((acc, [key, val]: any) => {
                // Simplified schema for browser compatibility
                 acc[key] = { type: 'string', description: val.description };
                 return acc;
              }, {} as any),
              required: d.parameters.required
            }
          }))
        }]
      }
    });

    const candidate = initialResponse.candidates?.[0];
    const toolCalls = candidate?.content?.parts.filter(p => p.functionCall);

    if (toolCalls && toolCalls.length > 0) {
      const toolOutputs: any[] = [];
      const sourcesSet = new Set<string>();

      for (const call of toolCalls) {
        const fc = call.functionCall!;
        const toolName = fc.name as MCPToolNames;
        const args = fc.args as any;

        // Await the async tool call
        const toolResult = await (mcpTools as any)[toolName](args.query || args.section || "");
        toolOutputs.push({
          functionResponse: {
            name: toolName,
            response: toolResult.data
          }
        });
        sourcesSet.add(toolResult.source);
      }

      onSources(Array.from(sourcesSet));

      // Step 2: Stream the final answer with tool context
      const streamResponse = await ai.models.generateContentStream({
        model,
        contents: [
          ...contents,
          { role: 'model', parts: candidate!.content.parts },
          { role: 'user', parts: toolOutputs }
        ],
        config: { systemInstruction }
      });

      for await (const chunk of streamResponse) {
        const c = chunk as GenerateContentResponse;
        if (c.text) onChunk(c.text);
      }
    } else {
      // No tools needed, just output text if available
      const text = candidate?.content.parts[0]?.text;
      if (text) onChunk(text);
      else onChunk("I'm sorry, I couldn't generate a response. Please try rephrasing your question.");
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    onChunk("I encountered an issue while processing your request. This could be due to an invalid API key or a network problem. Please check the console for details.");
  }
};
