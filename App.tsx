import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import AgentView from './components/AgentView';
import ToolIcon from './components/ToolIcon';
import { ProjectData, ProfileData } from './types';
import { Briefcase, GraduationCap, Mail, Phone, Globe, Github, Linkedin, Award, Download, ExternalLink, MapPin, Loader2 } from 'lucide-react';
import { useTranslation } from './i18n';
import profileDataJson from './content/profile.json';
import projectsDataJson from './content/projects.json';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [projectFilter, setProjectFilter] = useState('All');

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [projectsData, setProjectsData] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate loading for better UX, but use imported data for reliability
        await new Promise(res => setTimeout(res, 500));
        setProfile(profileDataJson as ProfileData);
        setProjectsData(projectsDataJson as ProjectData[]);
      } catch (e: any) {
        setError("Failed to load portfolio data.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-cyan-400">
        <Loader2 size={48} className="animate-spin" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{t('error_loading_title')}</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const categories = ['All', 'Data Analysis', 'Dashboards', 'ERP', 'Automation'];
  const filteredProjects = projectFilter === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === projectFilter);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200"
      >
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="container mx-auto px-6 pb-24">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Hero
                  profile={profile}
                  onAgentClick={() => setActiveTab('agent')}
                  onProjectsClick={() => setActiveTab('projects')}
                />

                <section className="py-32 max-w-6xl mx-auto">
                  <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-10">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                      >
                        <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight mb-6">
                          {t('home_feature_title_1')} <br />
                          <span className="text-cyan-400">{t('home_feature_title_2')}</span> <br />
                          {t('home_feature_title_3')} <span className="text-blue-500">{t('home_feature_title_4')}</span>.
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed max-w-lg">
                          {t('home_feature_description')}
                        </p>
                      </motion.div>

                      <div className="grid grid-cols-3 gap-6">
                        {profile.tools.slice(0, 9).map((tool, idx) => (
                          <motion.div
                            key={tool}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="group glass p-4 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-cyan-500/30 transition-all duration-300"
                          >
                            <ToolIcon toolName={tool} className="w-8 h-8 text-gray-500 dark:text-gray-400 group-hover:text-cyan-400 transition-colors" />
                            <span className="text-[10px] font-bold text-gray-600 dark:text-gray-500 text-center uppercase tracking-tighter group-hover:text-gray-900 dark:group-hover:text-cyan-200">{tool}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="relative lg:ps-10"
                    >
                      <div className="aspect-[2/3] rounded-[2rem] overflow-hidden glass p-4 relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <img
                          src="/profile.png"
                          alt="Mustafa Alramamneh"
                          className="w-full h-full object-contain rounded-[1.5rem] transition-all duration-700 group-hover:scale-105"
                        />
                        <div className="absolute bottom-6 start-6 end-6">
                          <div className="glass p-6 rounded-3xl border-cyan-500/20 backdrop-blur-xl shadow-2xl">
                            <h4 className="font-bold text-2xl mb-2 flex items-center gap-2">
                              <MapPin size={20} className="text-cyan-400" />
                              {t('home_targeting_roles_title')}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                              {t('home_targeting_roles_list')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="pt-32"
              >
                <div className="max-w-6xl mx-auto">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                    <div className="max-w-xl">
                      <h2 className="text-5xl font-bold font-heading mb-6 tracking-tight">{t('projects_title_1')} <span className="text-cyan-400">{t('projects_title_2')}</span></h2>
                      <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">{t('projects_description')}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 p-1 glass rounded-2xl">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setProjectFilter(cat)}
                          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${projectFilter === cat ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'}`}
                        >
                          {t(`projects_filter_${cat.toLowerCase().replace(' ', '_')}`)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((p: any) => (
                      <ProjectCard key={p.id} project={p} onClick={() => setSelectedProject(p)} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'resume' && (
              <motion.div
                key="resume"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="pt-32 max-w-4xl mx-auto"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-20">
                  <h2 className="text-5xl font-bold font-heading tracking-tight">{t('resume_title_1')} <span className="text-cyan-400">{t('resume_title_2')}</span></h2>
                  <a href="/Mustafa_Alramamneh_Resume.pdf" download target="_blank" rel="noopener noreferrer">
                    <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-cyan-500 text-white font-bold hover:scale-105 transition-all shadow-xl shadow-cyan-500/20 active:scale-95">
                      <Download size={20} />
                      {t('resume_download_button')}
                    </button>
                  </a>
                </div>

                <div className="space-y-32">
                  <section>
                    <div className="flex items-center gap-5 mb-16">
                      <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                        <Briefcase size={28} />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold font-heading">{t('resume_experience_title')}</h3>
                        <p className="text-gray-600 dark:text-gray-500 text-sm">{t('resume_experience_subtitle')}</p>
                      </div>
                    </div>
                    <div className="space-y-16 border-s-2 border-dashed border-gray-300 dark:border-gray-800 ms-7 ps-12 relative">
                      {profile.experience.map((exp, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          className="relative group"
                        >
                          <div className="absolute -start-[58px] top-1 w-5 h-5 rounded-full border-4 border-gray-50 dark:border-[#030712] bg-gray-300 dark:bg-gray-800 group-hover:bg-cyan-500 transition-colors duration-500 shadow-[0_0_10px_rgba(34,211,238,0)] group-hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                          <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <h4 className="text-2xl font-bold group-hover:text-cyan-400 transition-colors tracking-tight">{exp.role}</h4>
                              <p className="text-cyan-600 dark:text-cyan-500/80 font-semibold tracking-wide flex items-center gap-2">
                                {exp.company}
                                <span className="inline-block w-1 h-1 bg-gray-400 dark:bg-gray-700 rounded-full" />
                                <span className="text-xs text-gray-500 dark:text-gray-500 uppercase">{exp.period}</span>
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 italic">{exp.description}</p>
                          <div className="grid sm:grid-cols-2 gap-4">
                            {exp.achievements.map((ach, i) => (
                              <div key={i} className="flex gap-3 text-sm text-gray-700 dark:text-gray-300 glass p-3 rounded-xl dark:border-white/5 group-hover:border-cyan-500/10 transition-all">
                                <span className="text-cyan-500 font-bold">»</span>
                                {ach}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <div className="flex items-center gap-5 mb-16">
                      <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 dark:text-blue-400 border border-blue-500/20">
                        <GraduationCap size={28} />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold font-heading">{t('resume_education_title')}</h3>
                        <p className="text-gray-600 dark:text-gray-500 text-sm">{t('resume_education_subtitle')}</p>
                      </div>
                    </div>
                    <div className="grid gap-6">
                      {profile.education.map((edu, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="glass p-8 rounded-[2rem] hover:border-blue-500/30 transition-all duration-500 group"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                              <h4 className="text-xl font-bold group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">{edu.degree}</h4>
                              <p className="text-gray-600 dark:text-gray-400">{edu.school}</p>
                            </div>
                            <span className="px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono text-gray-600 dark:text-gray-500 whitespace-nowrap">{edu.period}</span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-500 text-sm leading-relaxed border-t border-black/5 dark:border-white/5 pt-6">{edu.details}</p>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                </div>
              </motion.div>
            )}

            {activeTab === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="pt-32 max-w-6xl mx-auto"
              >
                <div className="grid lg:grid-cols-2 gap-24 items-start">
                  <div className="space-y-16">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="glass p-4 rounded-3xl"
                    >
                      <div className="aspect-[2/3] w-full">
                        <img
                          src="/profile.png"
                          alt="Mustafa Alramamneh"
                          className="rounded-2xl w-full h-full object-contain"
                        />
                      </div>
                    </motion.div>

                    <div>
                      <h2 className="text-5xl font-bold font-heading mb-10 tracking-tight">{t('about_philosophy_title_1')} <span className="text-cyan-400">{t('about_philosophy_title_2')}</span></h2>
                      <div className="space-y-8 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                        <p className="text-gray-800 dark:text-gray-200 font-medium">
                          {t('about_philosophy_quote')}
                        </p>
                        <p>
                          {t('about_philosophy_p1_1')}
                          <span className="text-cyan-400"> {t('about_philosophy_p1_2')}</span>
                        </p>
                        <p>
                          {t('about_philosophy_p2')}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="glass p-8 rounded-3xl border-cyan-500/10">
                        <h4 className="font-bold text-lg mb-6 flex items-center gap-3">
                          <Award size={20} className="text-cyan-400" />
                          {t('about_languages_title')}
                        </h4>
                        <div className="space-y-4">
                          {profile.languages.map(l => (
                            <div key={l.name} className="flex justify-between items-center group">
                              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">{l.name}</span>
                              <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-[9px] font-bold text-gray-500 uppercase tracking-widest">{l.level}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="glass p-8 rounded-3xl border-cyan-500/10 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-lg mb-6 flex items-center gap-3">
                            <Globe size={20} className="text-cyan-400" />
                            {t('about_context_title')}
                          </h4>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                              Reutlingen, DE
                            </p>
                            <p className="text-sm text-gray-500">{t('about_context_availability')}</p>
                          </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-white/5">
                          <p className="text-[10px] text-gray-500 dark:text-gray-600 uppercase font-bold tracking-widest">{t('about_context_relocation')}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-16 lg:sticky lg:top-32">
                    <div className="glass p-10 rounded-[2.5rem] dark:border-white/5 bg-gray-100/40 dark:bg-gradient-to-br dark:from-gray-900/40 dark:to-black/40">
                      <h3 className="text-2xl font-bold font-heading mb-8 flex items-center gap-3">
                        <Briefcase size={22} className="text-cyan-400" />
                        {t('about_toolkit_title')}
                      </h3>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
                        {profile.tools.map(tool => (
                          <div key={tool} className="group flex flex-col items-center gap-3 text-center">
                            <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center group-hover:border-cyan-500/50 group-hover:-translate-y-1 transition-all duration-300">
                              <ToolIcon toolName={tool} className="w-9 h-9 text-gray-600 dark:text-gray-300 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors" />
                            </div>
                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{tool}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="glass p-10 rounded-[2.5rem] dark:border-white/5 bg-gray-100/40 dark:bg-gradient-to-br dark:from-gray-900/40 dark:to-black/40">
                      <h3 className="text-2xl font-bold font-heading mb-8 flex items-center gap-3">
                        <Award size={22} className="text-blue-500 dark:text-blue-400" />
                        {t('about_certifications_title')}
                      </h3>
                      <div className="grid gap-4">
                        {profile.certifications.map((cert, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-4 glass p-5 rounded-2xl group transition-all"
                          >
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                              <Award size={18} />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300 font-medium text-sm group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{cert}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="pt-32 max-w-5xl mx-auto text-center"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-7xl font-bold font-heading mb-10 tracking-tighter leading-tight">{t('contact_title_1')} <br /> <span className="text-cyan-400">{t('contact_title_2')}</span>.</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-xl max-w-2xl mx-auto mb-20 leading-relaxed">
                    {t('contact_description')}
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                  <a href={`mailto:${profile.contact.email}`} className="glass p-12 rounded-[2.5rem] group hover:border-cyan-500/50 transition-all duration-500 relative overflow-hidden">
                    <div className="absolute top-0 end-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                      <ExternalLink size={20} />
                    </div>
                    <Mail size={48} className="mx-auto mb-8 text-cyan-500 dark:text-cyan-400 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500" />
                    <h4 className="font-bold text-lg mb-2">{t('contact_email_title')}</h4>
                    <p className="text-gray-500 text-sm truncate max-w-full px-2">{profile.contact.email}</p>
                  </a>
                  <a href={`tel:${profile.contact.phone}`} className="glass p-12 rounded-[2.5rem] group hover:border-cyan-500/50 transition-all duration-500 relative overflow-hidden">
                    <div className="absolute top-0 end-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                      <ExternalLink size={20} />
                    </div>
                    <Phone size={48} className="mx-auto mb-8 text-cyan-500 dark:text-cyan-400 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500" />
                    <h4 className="font-bold text-lg mb-2">{t('contact_phone_title')}</h4>
                    <p className="text-gray-500 text-sm">{profile.contact.phone}</p>
                  </a>
                  <div className="glass p-12 rounded-[2.5rem] flex flex-col justify-center items-center gap-8 dark:border-white/5">
                    <div className="flex gap-8">
                      <a href={`https://${profile.contact.linkedin}`} target="_blank" className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:-translate-y-2"><Linkedin size={28} /></a>
                      <a href={`https://${profile.contact.github}`} target="_blank" className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:-translate-y-2"><Github size={28} /></a>
                    </div>
                    <p className="text-[10px] text-gray-500 dark:text-gray-600 uppercase font-bold tracking-[0.2em]">{t('contact_socials_title')}</p>
                  </div>
                </div>

                <div className="max-w-3xl mx-auto glass p-10 md:p-16 rounded-[3rem] text-start dark:border-white/5 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                  <h4 className="text-2xl font-bold font-heading mb-10 flex items-center gap-4">
                    <span className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500 dark:text-cyan-400 text-sm">01</span>
                    {t('contact_form_title')}
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase ms-2 tracking-widest">{t('contact_form_name_label')}</label>
                      <input placeholder={t('contact_form_name_placeholder')} className="w-full bg-white/50 dark:bg-black/40 border border-gray-300 dark:border-gray-800 rounded-2xl px-6 py-4 text-sm text-gray-900 dark:text-gray-100 focus:border-cyan-500 outline-none transition-all focus:ring-1 focus:ring-cyan-500/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase ms-2 tracking-widest">{t('contact_form_email_label')}</label>
                      <input placeholder={t('contact_form_email_placeholder')} className="w-full bg-white/50 dark:bg-black/40 border border-gray-300 dark:border-gray-800 rounded-2xl px-6 py-4 text-sm text-gray-900 dark:text-gray-100 focus:border-cyan-500 outline-none transition-all focus:ring-1 focus:ring-cyan-500/20" />
                    </div>
                  </div>
                  <div className="space-y-2 mb-8">
                    <label className="text-[10px] font-bold text-gray-500 uppercase ms-2 tracking-widest">{t('contact_form_message_label')}</label>
                    <textarea placeholder={t('contact_form_message_placeholder')} rows={4} className="w-full bg-white/50 dark:bg-black/40 border border-gray-300 dark:border-gray-800 rounded-2xl px-6 py-4 text-sm text-gray-900 dark:text-gray-100 focus:border-cyan-500 outline-none transition-all focus:ring-1 focus:ring-cyan-500/20"></textarea>
                  </div>
                  <button className="w-full py-5 bg-cyan-500 text-white font-bold rounded-2xl hover:bg-cyan-400 hover:scale-[1.02] transition-all shadow-xl shadow-cyan-500/20 active:scale-95">
                    {t('contact_form_submit_button')}
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'agent' && (
              <motion.div
                key="agent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <AgentView />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="w-full max-w-4xl bg-gray-50 dark:bg-[#030712] rounded-[2.5rem] border border-gray-200 dark:border-white/10 overflow-hidden relative max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              >
                <button onClick={() => setSelectedProject(null)} className="absolute top-6 end-6 z-10 w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-cyan-500 transition-all duration-300 backdrop-blur-md border border-white/10 font-bold text-xl active:scale-90">×</button>
                <img src={selectedProject.image} className="w-full aspect-video object-cover" />
                <div className="p-10 md:p-16">
                  <div className="flex flex-wrap items-center gap-4 mb-8">
                    <span className="px-5 py-2 rounded-xl bg-cyan-500 text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-cyan-500/20">{selectedProject.category}</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map(t => <span key={t} className="px-3 py-1 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">{t}</span>)}
                    </div>
                  </div>
                  <h3 className="text-5xl font-bold font-heading mb-8 tracking-tight">{selectedProject.title}</h3>
                  <div className="glass p-8 rounded-3xl border-cyan-500/20 mb-10 bg-cyan-500/5">
                    <p className="text-xl text-cyan-700 dark:text-cyan-200 font-medium leading-relaxed italic">" {selectedProject.shortOutcome} "</p>
                  </div>
                  <div className="space-y-8 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                    <p>{selectedProject.fullDescription}</p>
                    <div className="p-8 border-s-2 border-cyan-500/50 bg-black/5 dark:bg-white/5 rounded-e-3xl">
                      <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 uppercase tracking-widest text-xs">{t('project_modal_highlights_title')}</h4>
                      <p className="text-sm">{t('project_modal_highlights_content')}</p>
                    </div>
                  </div>
                  <div className="mt-16 pt-16 border-t border-gray-200 dark:border-white/5">
                    <button className="w-full px-8 py-5 rounded-2xl bg-gray-900 text-white dark:bg-white dark:text-black font-black uppercase tracking-widest text-xs hover:bg-cyan-500 dark:hover:bg-cyan-400 hover:text-white transition-all shadow-xl active:scale-95">{t('project_modal_button_deep_dive')}</button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="border-t border-gray-200 dark:border-white/5 py-16 bg-white/40 dark:bg-black/40 mt-32">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-10 max-w-6xl mx-auto">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center font-bold text-cyan-500 dark:text-cyan-400">M</div>
                <div>
                  <h5 className="font-bold text-gray-900 dark:text-gray-100">Mustafa Alramamneh</h5>
                  <p className="text-[10px] text-gray-500 dark:text-gray-600 uppercase tracking-widest font-bold">Reutlingen, Germany</p>
                </div>
              </div>

              <div className="flex gap-12">
                <div className="space-y-3">
                  <p className="text-[9px] font-bold text-gray-500 dark:text-gray-700 uppercase tracking-widest mb-4">{t('footer_nav_title')}</p>
                  <div className="flex flex-col gap-2">
                    {[t('nav_projects'), t('nav_resume'), t('nav_about'), t('nav_contact')].map(l => (
                      <button key={l} onClick={() => setActiveTab(l.toLowerCase())} className="text-xs text-gray-600 dark:text-gray-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-start">{l}</button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-[9px] font-bold text-gray-500 dark:text-gray-700 uppercase tracking-widest mb-4">{t('footer_connect_title')}</p>
                  <div className="flex flex-col gap-2">
                    {['LinkedIn', 'GitHub', 'Email'].map(l => (
                      <a key={l} href="#" className="text-xs text-gray-600 dark:text-gray-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">{l}</a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-white/5 text-center text-[10px] text-gray-500 dark:text-gray-600 uppercase tracking-[0.3em] font-medium">
              {t('footer_copyright')}
            </div>
          </div>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
};

export default App;