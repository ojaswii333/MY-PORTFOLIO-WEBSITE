'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
    { name: 'React', level: 95, color: '#61DAFB', category: 'frontend' },
    { name: 'Next.js', level: 90, color: '#ffffff', category: 'frontend' },
    { name: 'TypeScript', level: 88, color: '#3178C6', category: 'frontend' },
    { name: 'Node.js', level: 85, color: '#339933', category: 'backend' },
    { name: 'Python', level: 80, color: '#3776AB', category: 'backend' },
    { name: 'Three.js', level: 75, color: '#00f0ff', category: 'frontend' },
    { name: 'Tailwind', level: 92, color: '#06B6D4', category: 'frontend' },
    { name: 'GSAP', level: 80, color: '#88CE02', category: 'frontend' },
    { name: 'MongoDB', level: 82, color: '#47A248', category: 'backend' },
    { name: 'PostgreSQL', level: 78, color: '#4169E1', category: 'backend' },
    { name: 'Docker', level: 70, color: '#2496ED', category: 'devops' },
    { name: 'Git', level: 90, color: '#F05032', category: 'devops' },
    { name: 'Figma', level: 85, color: '#F24E1E', category: 'design' },
    { name: 'Framer Motion', level: 88, color: '#a855f7', category: 'frontend' },
    { name: 'AWS', level: 65, color: '#FF9900', category: 'devops' },
    { name: 'GraphQL', level: 72, color: '#E10098', category: 'backend' },
];

const categories = ['all', 'frontend', 'backend', 'devops', 'design'];

export default function Skills() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const [activeCategory, setActiveCategory] = useState('all');
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    const filteredSkills = activeCategory === 'all'
        ? skills
        : skills.filter((s) => s.category === activeCategory);

    return (
        <section id="skills" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-cyan/3 rounded-full blur-[200px]" />

            <div className="max-w-6xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="section-label text-center"
                >
          // Tech Arsenal
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="section-title text-center"
                >
                    Skills & <span className="gradient-text">Technologies</span>
                </motion.h2>

                {/* Category filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-2 mb-12"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`hoverable px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${activeCategory === cat
                                    ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30'
                                    : 'text-text-muted border border-white/5 hover:border-white/20 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Skills grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredSkills.map((skill, i) => (
                        <motion.div
                            key={skill.name}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            onMouseEnter={() => setHoveredSkill(skill.name)}
                            onMouseLeave={() => setHoveredSkill(null)}
                            className="hoverable glass-card p-5 group relative overflow-hidden"
                        >
                            {/* Glow on hover */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: `radial-gradient(circle at center, ${skill.color}10, transparent 70%)`,
                                }}
                            />

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-semibold text-white">{skill.name}</span>
                                    <motion.span
                                        className="text-xs font-mono"
                                        style={{ color: skill.color }}
                                        animate={hoveredSkill === skill.name ? { scale: [1, 1.2, 1] } : {}}
                                    >
                                        {skill.level}%
                                    </motion.span>
                                </div>

                                {/* Progress bar */}
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full rounded-full"
                                        initial={{ width: 0 }}
                                        animate={isInView ? { width: `${skill.level}%` } : {}}
                                        transition={{ duration: 1, delay: 0.5 + i * 0.05, ease: 'easeOut' }}
                                        style={{
                                            background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`,
                                            boxShadow: `0 0 10px ${skill.color}40`,
                                        }}
                                    />
                                </div>

                                {/* Category badge */}
                                <span className="mt-3 inline-block text-[10px] font-mono text-text-muted uppercase tracking-wider">
                                    {skill.category}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
