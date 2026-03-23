'use client';

import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="relative py-12 px-6 border-t border-white/5">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 border border-accent-cyan/30 flex items-center justify-center">
                            <span className="text-accent-cyan font-bold text-sm">O</span>
                        </div>
                        <span className="font-heading font-bold">
                            <span className="text-white">Ojas</span>
                            <span className="text-accent-cyan">.</span>
                        </span>
                    </div>

                    <p className="text-xs text-text-muted font-mono">
                        &copy; {new Date().getFullYear()} — Designed & Built with{' '}
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="inline-block text-accent-pink"
                        >
                            ♥
                        </motion.span>{' '}
                        by Ojas
                    </p>

                    <div className="flex items-center gap-4">
                        {[
                            { name: 'GitHub', url: 'https://github.com/ojaswii333' },
                            { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ojaswi-anand-sharma-7080b434a?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
                            { name: 'Instagram', url: 'https://www.instagram.com/ojaswi_333?utm_source=qr&igsh=MTNzNG02YWdzdzJjYw==' }
                        ].map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                className="hoverable text-xs text-text-muted hover:text-accent-cyan transition-colors font-mono"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {social.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
