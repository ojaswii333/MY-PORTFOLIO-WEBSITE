'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Contact() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const mailtoLink = `mailto:ojaswi8817@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )}`;
        window.location.href = mailtoLink;
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent-cyan/5 rounded-full blur-[150px]" />

            <div className="max-w-5xl mx-auto">
                <motion.p initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="section-label text-center">
          // Get In Touch
                </motion.p>
                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="section-title text-center">
                    Let&apos;s Build Something <span className="gradient-text">Amazing</span>
                </motion.h2>
                <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} className="text-center text-text-secondary max-w-md mx-auto mb-16">
                    Have a project in mind? Let&apos;s collaborate and turn your vision into reality.
                </motion.p>

                <div className="grid lg:grid-cols-2 gap-12">
                    <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="space-y-6">
                        {[
                            { name: 'name', label: 'Your Name', type: 'text', ph: '' },
                            { name: 'email', label: 'Email Address', type: 'email', ph: '@gmail.com' },
                        ].map((field) => (
                            <div key={field.name}>
                                <label className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">{field.label}</label>
                                <div className="relative">
                                    <input type={field.type} placeholder={field.ph} value={formData[field.name as keyof typeof formData]} onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })} onFocus={() => setFocusedField(field.name)} onBlur={() => setFocusedField(null)} className="hoverable w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white text-sm placeholder-text-muted focus:outline-none focus:border-accent-cyan/50 transition-all duration-300" required />
                                    <motion.div className="absolute inset-0 rounded-xl pointer-events-none" animate={{ boxShadow: focusedField === field.name ? '0 0 30px rgba(0,240,255,0.1)' : '0 0 0 transparent' }} />
                                </div>
                            </div>
                        ))}
                        <div>
                            <label className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">Message</label>
                            <textarea placeholder="Tell me about your project..." rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)} className="hoverable w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white text-sm placeholder-text-muted focus:outline-none focus:border-accent-cyan/50 transition-all duration-300 resize-none" required />
                        </div>
                        <motion.button type="submit" className="hoverable group relative w-full py-4 rounded-xl font-heading font-semibold text-sm tracking-wider uppercase overflow-hidden" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-xl opacity-80 group-hover:opacity-100 transition-opacity" />
                            <span className="relative z-10 text-white">Send Message ✨</span>
                        </motion.button>
                    </motion.form>

                    <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-col justify-between">
                        <div className="glass-card p-8 mb-6">
                            <h3 className="text-lg font-heading font-bold text-white mb-4">Quick Connect</h3>
                            <div className="space-y-4 text-sm text-text-secondary">
                                <div className="flex items-center gap-3"><span className="text-accent-cyan">📍</span><span>India</span></div>
                                <div className="flex items-center gap-3"><span className="text-accent-cyan">✉️</span><span>ojaswi8817@gmail.com</span></div>
                                <div className="flex items-center gap-3"><span className="text-accent-cyan">⏰</span><span>IST (UTC +5:30)</span></div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            {[
                                { name: 'GitHub', icon: '⚡', url: 'https://github.com/ojaswii333' },
                                { name: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/in/ojaswi-anand-sharma-7080b434a?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
                                { name: 'Instagram', icon: '📸', url: 'https://www.instagram.com/ojaswi_333?utm_source=qr&igsh=MTNzNG02YWdzdzJjYw==' },
                                { name: 'Email', icon: '✉️', url: 'mailto:ojaswi8817@gmail.com' }
                            ].map((s, i) => (
                                <motion.a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 + i * 0.1 }} className="hoverable glass-card p-4 flex items-center gap-3 group" whileHover={{ y: -4 }}>
                                    <span className="text-xl">{s.icon}</span>
                                    <span className="text-sm font-medium text-text-secondary group-hover:text-white transition-colors">{s.name}</span>
                                </motion.a>
                            ))}
                        </div>
                        <motion.div className="glass-card p-4 flex items-center gap-3" animate={{ boxShadow: ['0 0 20px rgba(34,197,94,0.05)', '0 0 20px rgba(34,197,94,0.15)', '0 0 20px rgba(34,197,94,0.05)'] }} transition={{ duration: 3, repeat: Infinity }}>
                            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-sm text-text-secondary">Currently <span className="text-green-400 font-medium">available</span> for new projects</span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
