'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const timeline = [
    {
        year: '2026',
        title: 'Advanced Projects & Growth',
        description: 'Working on complex projects, mastering scalable architectures, and diving deeper into modern web technologies to build production-grade scalable systems.',
    },
    {
        year: '2025',
        title: 'Building Various Projects',
        description: 'Developed diverse full-stack applications and standalone utility projects. Enhanced UI/UX design skills and focused on creating real-world solutions that provide value.',
    },
    {
        year: '2024',
        title: 'The Beginning & Hackathons',
        description: 'Started my journey with basic Web Development. Participated in multiple hackathons, rapidly turning ideas into working prototypes over intense coding weekends.',
    },
];

export default function About() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section id="about" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-[150px]" />

            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left side */}
                    <div>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="section-label"
                        >
                            {/* About Me */}
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="section-title"
                        >
                            Crafting digital{' '}
                            <span className="gradient-text">experiences</span> that leave a mark
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-4 text-text-secondary leading-relaxed"
                        >
                            <p>
                                I&apos;m a passionate developer and designer who believes that the web should be more
                                than just functional — it should be an <span className="text-accent-cyan">experience</span>.
                            </p>
                            <p>
                                With a keen eye for design and a deep understanding of modern web technologies, I
                                create interfaces that aren&apos;t just visually stunning but also performant,
                                accessible, and delightful to use.
                            </p>
                            <p>
                                Every pixel matters. Every animation serves a purpose. Every interaction tells a story.
                            </p>
                        </motion.div>

                        {/* Code snippet card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mt-8 glass-card p-5 rounded-xl"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                                <span className="w-3 h-3 rounded-full bg-green-500/60" />
                                <span className="ml-4 text-xs font-mono text-text-muted">about.ts</span>
                            </div>
                            <pre className="text-sm font-mono text-text-secondary overflow-x-auto">
                                <code>
                                    <span className="text-accent-purple">const</span>{' '}
                                    <span className="text-accent-cyan">developer</span> = {'{\n'}
                                    {'  '}name: <span className="text-green-400">&quot;Ojas&quot;</span>,{'\n'}
                                    {'  '}role: <span className="text-green-400">&quot;Creative Developer&quot;</span>,{'\n'}
                                    {'  '}passion: <span className="text-green-400">&quot;Building Experiences&quot;</span>,{'\n'}
                                    {'  '}coffee: <span className="text-accent-pink">Infinity</span>,{'\n'}
                                    {'}'};
                                </code>
                            </pre>
                        </motion.div>
                    </div>

                    {/* Right side — Timeline */}
                    <div className="relative">
                        {/* Vertical line */}
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={isInView ? { scaleY: 1 } : {}}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent-cyan via-accent-purple to-transparent origin-top"
                        />

                        <div className="space-y-10">
                            {timeline.map((item, i) => (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                                    className="relative pl-14"
                                >
                                    {/* Dot */}
                                    <div className="absolute left-[11px] top-1 w-[18px] h-[18px] rounded-full border-2 border-accent-cyan bg-bg-primary flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-accent-cyan" />
                                    </div>

                                    <span className="text-xs font-mono text-accent-cyan tracking-widest">{item.year}</span>
                                    <h3 className="text-xl font-heading font-semibold text-white mt-1 mb-2">{item.title}</h3>
                                    <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
