'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a',
];

export function useEasterEgg() {
    const [unlocked, setUnlocked] = useState(false);
    const [keyIndex, setKeyIndex] = useState(0);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === KONAMI_CODE[keyIndex]) {
            const next = keyIndex + 1;
            if (next === KONAMI_CODE.length) {
                setUnlocked(true);
                setKeyIndex(0);
            } else {
                setKeyIndex(next);
            }
        } else {
            setKeyIndex(0);
        }
    }, [keyIndex]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return { unlocked, dismiss: () => setUnlocked(false) };
}

export function EasterEggOverlay({ unlocked, onDismiss }: { unlocked: boolean; onDismiss: () => void }) {
    return (
        <AnimatePresence>
            {unlocked && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onDismiss}
                    className="fixed inset-0 z-[10001] flex items-center justify-center bg-bg-primary/90 backdrop-blur-xl"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="text-center"
                    >
                        <div className="text-8xl mb-6">🎮</div>
                        <h2 className="text-3xl font-heading font-bold gradient-text mb-3">
                            Secret Unlocked!
                        </h2>
                        <p className="text-text-secondary font-mono text-sm mb-2">
                            You found the Konami Code easter egg!
                        </p>
                        <p className="text-text-muted text-xs font-mono">
                            ↑ ↑ ↓ ↓ ← → ← → B A
                        </p>
                        <p className="text-text-muted text-xs mt-4 animate-pulse">
                            Click anywhere to continue
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
