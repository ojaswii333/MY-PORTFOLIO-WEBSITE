'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsExiting(true);
                        setTimeout(onComplete, 1200);
                    }, 400);
                    return 100;
                }
                return prev + Math.random() * 12 + 3;
            });
        }, 60);
        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-bg-primary"
                >
                    {/* Grid background */}
                    <div className="absolute inset-0 opacity-10">
                        <div
                            className="w-full h-full"
                            style={{
                                backgroundImage:
                                    'linear-gradient(rgba(0,240,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.1) 1px, transparent 1px)',
                                backgroundSize: '60px 60px',
                            }}
                        />
                    </div>

                    {/* Animated rings */}
                    <div className="relative mb-12">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full border border-accent-cyan/20"
                                style={{
                                    width: 120 + i * 60,
                                    height: 120 + i * 60,
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                }}
                                animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                                transition={{
                                    rotate: { duration: 6 + i * 2, repeat: Infinity, ease: 'linear' },
                                    scale: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 },
                                }}
                            />
                        ))}
                        {/* Center logo */}
                        <motion.div
                            className="relative w-20 h-20 flex items-center justify-center"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <span
                                className="text-4xl font-bold font-heading neon-text"
                                style={{ color: '#00f0ff' }}
                            >
                                ∞
                            </span>
                        </motion.div>
                    </div>

                    {/* Progress */}
                    <div className="w-48 relative">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-xs font-mono text-text-secondary tracking-widest uppercase">
                                Loading
                            </span>
                            <span className="text-xs font-mono text-accent-cyan">
                                {Math.min(100, Math.round(progress))}%
                            </span>
                        </div>
                        <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                style={{
                                    background: 'linear-gradient(90deg, #00f0ff, #a855f7)',
                                    width: `${Math.min(100, progress)}%`,
                                    boxShadow: '0 0 20px rgba(0,240,255,0.5)',
                                }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>
                    </div>

                    {/* Bottom text */}
                    <motion.p
                        className="absolute bottom-12 text-xs font-mono text-text-muted tracking-[0.3em] uppercase"
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        Initializing Experience
                    </motion.p>

                    {/* Exit curtains */}
                    {isExiting && (
                        <>
                            <motion.div
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                                className="absolute inset-0 bg-bg-primary origin-top z-10"
                            />
                        </>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
