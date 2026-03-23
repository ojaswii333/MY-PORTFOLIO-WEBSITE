'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = navLinks.map((l) => l.href.replace('#', ''));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 200) {
                        setActiveSection(sections[i]);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (href: string) => {
        setIsMobileMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled
                        ? 'py-3 bg-bg-primary/80 backdrop-blur-xl border-b border-white/5'
                        : 'py-6 bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <motion.a
                        href="#hero"
                        onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
                        className="hoverable relative flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 border border-accent-cyan/30 flex items-center justify-center">
                            <span className="text-accent-cyan font-bold font-heading text-lg">O</span>
                        </div>
                        <span className="font-heading font-bold text-lg hidden sm:block">
                            <span className="text-white">Ojas</span>
                            <span className="text-accent-cyan">.</span>
                        </span>
                    </motion.a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                                className={`hoverable relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full ${activeSection === link.href.replace('#', '')
                                        ? 'text-accent-cyan'
                                        : 'text-text-secondary hover:text-white'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {activeSection === link.href.replace('#', '') && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute inset-0 rounded-full bg-accent-cyan/10 border border-accent-cyan/20"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{link.label}</span>
                            </motion.a>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <motion.a
                        href="#contact"
                        onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
                        className="hoverable hidden md:flex magnetic-btn !py-2 !px-6 !text-xs"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Let&apos;s Talk
                    </motion.a>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="hoverable md:hidden relative w-10 h-10 flex items-center justify-center"
                    >
                        <div className="flex flex-col gap-1.5">
                            <motion.span
                                animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                                className="w-6 h-[2px] bg-white block origin-center"
                            />
                            <motion.span
                                animate={isMobileMenuOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
                                className="w-6 h-[2px] bg-white block"
                            />
                            <motion.span
                                animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                                className="w-6 h-[2px] bg-white block origin-center"
                            />
                        </div>
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[99] bg-bg-primary/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 md:hidden"
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className={`text-2xl font-heading font-semibold transition-colors ${activeSection === link.href.replace('#', '')
                                        ? 'text-accent-cyan neon-text'
                                        : 'text-text-secondary'
                                    }`}
                            >
                                {link.label}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
