'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';

const projects = [
    {
        title: 'AI Anomaly Detection',
        description: 'Real-time ML-powered anomaly detection system with live analytics dashboard, WebSocket streaming, and automated alerts.',
        tags: ['Next.js', 'Python', 'FastAPI', 'TensorFlow', 'WebSocket'],
        gradient: 'from-cyan-500/20 to-blue-500/20',
        borderColor: 'rgba(0, 240, 255, 0.3)',
        link: 'https://ai-ojaswii333s-projects.vercel.app',
        image: '🔬',
    },
    {
        title: 'VidyaVani - Editorial & Events',
        description: 'The Official Editorial & Events Platform. A comprehensive hub for managing editorial pieces, articles, and university events with a rich interactive UI.',
        tags: ['React', 'Next.js', 'Tailwind', 'Node.js', 'MongoDB'],
        gradient: 'from-purple-500/20 to-pink-500/20',
        borderColor: 'rgba(168, 85, 247, 0.3)',
        link: 'https://vidhya-vani.vercel.app/',
        image: '📰',
    },
    {
        title: 'Mathematics Club MITS',
        description: 'The official platform for the Mathematics Club, providing a central hub for mathematical resources, event updates, and community engagement.',
        tags: ['React', 'Firebase', 'Tailwind', 'Framer Motion'],
        gradient: 'from-pink-500/20 to-orange-500/20',
        borderColor: 'rgba(236, 72, 153, 0.3)',
        link: 'https://mathematics-club-mits.web.app/',
        image: '➗',
    },
    {
        title: 'Analytics Club Platform',
        description: 'A modern landing page and platform for the Analytics Club, featuring live data visualizations, immersive aesthetics, and event showcases.',
        tags: ['HTML', 'CSS', 'JavaScript', 'GSAP', 'Firebase'],
        gradient: 'from-green-500/20 to-cyan-500/20',
        borderColor: 'rgba(34, 197, 94, 0.3)',
        link: 'https://Analytics-club.web.app',
        image: '📊',
    },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

    const handleMouse = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouse}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="hoverable group"
        >
            <div
                className={`relative glass-card p-6 sm:p-8 h-full overflow-hidden transition-all duration-500 ${isHovered ? 'shadow-2xl' : ''
                    }`}
                style={{
                    borderColor: isHovered ? project.borderColor : undefined,
                }}
            >
                {/* Background gradient */}
                <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Shine effect */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{
                        background: isHovered
                            ? `radial-gradient(circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%, rgba(255,255,255,0.06), transparent 60%)`
                            : undefined,
                    }}
                />

                <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
                    {/* Emoji icon */}
                    <div className="text-4xl mb-4">{project.image}</div>

                    {/* Number */}
                    <span className="text-xs font-mono text-text-muted mb-2 block">
                        Project {String(index + 1).padStart(2, '0')}
                    </span>

                    <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-accent-cyan transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-5">
                        {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full border border-white/10 text-text-muted"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Link */}
                    <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hoverable inline-flex items-center gap-2 text-sm font-medium text-accent-cyan group/link"
                        whileHover={{ x: 5 }}
                    >
                        View Deployed Project
                        <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </motion.a>
                </div>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section id="projects" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-pink/5 rounded-full blur-[150px]" />

            <div className="max-w-6xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="section-label text-center"
                >
          // Selected Work
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="section-title text-center mb-4"
                >
                    Featured <span className="gradient-text">Projects</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.2 }}
                    className="text-center text-text-secondary max-w-md mx-auto mb-16"
                >
                    A showcase of projects that push boundaries and deliver exceptional experiences.
                </motion.p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1000px' }}>
                    {projects.map((project, i) => (
                        <ProjectCard key={project.title} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
