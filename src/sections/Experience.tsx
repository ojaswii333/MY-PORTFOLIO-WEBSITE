'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const experiences = [
    {
        role: 'Full-Stack Developer',
        company: 'Complex & Scalable Projects',
        period: '2026',
        description: 'Building immersive web experiences and diving into advanced frontend/backend architectures. Focusing on optimization, interactive 3D, and producing high-quality web applications.',
        highlights: ['Production-ready Apps', 'Scalable Architectures', 'Advanced Interactions'],
        color: '#00f0ff',
    },
    {
        role: 'Project Developer',
        company: 'Various Independent Projects',
        period: '2025',
        description: 'Developed diverse full-stack applications, utilizing modern frameworks like Next.js, React, and databases. Improved design skills by creating visually stunning UI/UX layouts.',
        highlights: ['Next.js / React', 'UI/UX Design', 'Database Modeling'],
        color: '#a855f7',
    },
    {
        role: 'Web Developer / Participant',
        company: 'Hackathons & Core Web Dev',
        period: '2024',
        description: 'Started learning the fundamentals of Web Development (HTML, CSS, JS). Participated in multiple hackathons to solve problems rapidly and collaborate with teams.',
        highlights: ['Hackathon Builds', 'Web Fundamentals', 'Rapid Prototyping'],
        color: '#ec4899',
    },
];

export default function Experience() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section id="experience" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
            <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[150px]" />

            <div className="max-w-4xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="section-label text-center"
                >
                    {/* Career Path */}
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="section-title text-center mb-16"
                >
                    Work <span className="gradient-text">Experience</span>
                </motion.h2>

                <div className="relative">
                    {/* Central line */}
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : {}}
                        transition={{ duration: 1.5 }}
                        className="absolute left-1/2 -translate-x-[1px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent-cyan via-accent-purple to-accent-pink origin-top hidden md:block"
                    />

                    {/* Mobile line */}
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : {}}
                        transition={{ duration: 1.5 }}
                        className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent-cyan via-accent-purple to-accent-pink origin-top md:hidden"
                    />

                    {experiences.map((exp, i) => (
                        <motion.div
                            key={exp.period}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            className={`relative mb-12 last:mb-0 ${i % 2 === 0
                                ? 'md:pr-[calc(50%+40px)] md:text-right'
                                : 'md:pl-[calc(50%+40px)] md:text-left'
                                } pl-12 md:pl-0`}
                        >
                            {/* Timeline dot - Desktop */}
                            <div
                                className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-2 w-4 h-4 rounded-full border-2 items-center justify-center z-10"
                                style={{ borderColor: exp.color, backgroundColor: '#0a0a0f' }}
                            >
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: exp.color }} />
                            </div>

                            {/* Timeline dot - Mobile */}
                            <div
                                className="md:hidden absolute left-[11px] top-2 w-4 h-4 rounded-full border-2 flex items-center justify-center z-10"
                                style={{ borderColor: exp.color, backgroundColor: '#0a0a0f' }}
                            >
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: exp.color }} />
                            </div>

                            {/* Card */}
                            <div className="glass-card p-6 group hover:translate-y-[-4px] transition-transform duration-300">
                                <span className="text-xs font-mono tracking-widest uppercase" style={{ color: exp.color }}>
                                    {exp.period}
                                </span>
                                <h3 className="text-lg font-heading font-bold text-white mt-1">{exp.role}</h3>
                                <p className="text-sm text-accent-cyan/80 mb-3">{exp.company}</p>
                                <p className="text-sm text-text-secondary leading-relaxed mb-4">{exp.description}</p>

                                <div className={`flex flex-wrap gap-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                                    {exp.highlights.map((h) => (
                                        <span
                                            key={h}
                                            className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-white/10 text-text-muted"
                                        >
                                            {h}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
