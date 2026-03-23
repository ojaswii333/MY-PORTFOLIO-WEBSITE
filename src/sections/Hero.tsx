'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const ParticleField = dynamic(() => import('@/components/ParticleField'), { ssr: false });

const titles = [
    'Full-Stack Developer',
    'UI/UX Designer',
    'Creative Technologist',
    'Problem Solver',
];

export default function Hero() {
    const [currentTitle, setCurrentTitle] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const title = titles[currentTitle];
        const timeout = setTimeout(
            () => {
                if (!isDeleting) {
                    setDisplayText(title.substring(0, displayText.length + 1));
                    if (displayText.length + 1 === title.length) {
                        setTimeout(() => setIsDeleting(true), 1500);
                    }
                } else {
                    setDisplayText(title.substring(0, displayText.length - 1));
                    if (displayText.length === 0) {
                        setIsDeleting(false);
                        setCurrentTitle((prev) => (prev + 1) % titles.length);
                    }
                }
            },
            isDeleting ? 40 : 80
        );
        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentTitle]);

    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Particle Background */}
            <ParticleField />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/30 to-bg-primary z-[1]" />

            {/* Radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent-cyan/5 blur-[120px] z-0" />

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                {/* Status Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-cyan/20 bg-accent-cyan/5 mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs font-mono text-accent-cyan tracking-wider">
                        Available for Opportunities
                    </span>
                </motion.div>

                {/* Main heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6"
                >
                    <span className="block text-white">I don&apos;t build</span>
                    <span className="block gradient-text">websites.</span>
                    <span className="block text-white mt-2">
                        I build{' '}
                        <span className="relative">
                            <span className="gradient-text">experiences</span>
                            <motion.span
                                className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-accent-cyan to-accent-purple"
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1, delay: 1.2 }}
                            />
                        </span>
                        <span className="text-accent-cyan">.</span>
                    </span>
                </motion.h1>

                {/* Typing effect */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-lg sm:text-xl font-mono text-text-secondary mb-10 h-8"
                >
                    {'>'} <span className="text-accent-cyan">{displayText}</span>
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="text-accent-cyan"
                    >
                        |
                    </motion.span>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <button
                        onClick={scrollToProjects}
                        className="hoverable group relative px-8 py-4 rounded-full font-heading font-semibold text-sm tracking-wider uppercase overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full" />
                        <div className="absolute inset-[1px] bg-bg-primary rounded-full group-hover:bg-transparent transition-all duration-300" />
                        <span className="relative z-10 gradient-text group-hover:text-white transition-all duration-300">
                            View My Work
                        </span>
                    </button>

                    <button onClick={scrollToContact} className="hoverable magnetic-btn">
                        Get In Touch
                    </button>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    className="flex justify-center gap-8 sm:gap-16 mt-16"
                >
                    {[
                        { value: '3+', label: 'Years Exp.' },
                        { value: '25+', label: 'Projects' },
                        { value: '15+', label: 'Technologies' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-2xl sm:text-3xl font-heading font-bold gradient-text-cyan">
                                {stat.value}
                            </div>
                            <div className="text-xs font-mono text-text-muted mt-1 tracking-wider uppercase">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <span className="text-[10px] font-mono text-text-muted tracking-[0.3em] uppercase">Scroll</span>
                <div className="w-5 h-8 rounded-full border border-accent-cyan/30 flex justify-center pt-1.5">
                    <motion.div
                        className="w-1 h-2 rounded-full bg-accent-cyan"
                        animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </section>
    );
}
