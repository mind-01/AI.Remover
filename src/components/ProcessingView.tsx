import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Cpu, Zap, Search, Fingerprint } from 'lucide-react';

interface ProcessingViewProps {
    progress?: number;
    current?: number;
    total?: number;
}

const statusMessages = [
    "Analyzing image structure...",
    "Tracing complex edges...",
    "Awaiting AI magic...",
    "Refining silhouettes...",
    "Finalizing transparent layers...",
    "Perfecting hair & details...",
    "Optimizing output resolution...",
    "Almost there..."
];

export const ProcessingView: React.FC<ProcessingViewProps> = ({ progress, current, total }) => {
    const [statusIndex, setStatusIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStatusIndex((prev) => (prev + 1) % statusMessages.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    // Also sync status with progress to feel more "real"
    useEffect(() => {
        if (progress !== undefined) {
            const index = Math.min(
                Math.floor((progress / 100) * statusMessages.length),
                statusMessages.length - 1
            );
            setStatusIndex(index);
        }
    }, [progress]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 md:p-8 max-w-4xl mx-auto relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full animate-pulse pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />

            {/* Glassmorphic Container */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl p-10 md:p-16 rounded-[4rem] border border-white/40 dark:border-slate-800/40 shadow-2xl shadow-blue-900/5 w-full flex flex-col items-center"
            >
                {/* AI Orb Animation */}
                <div className="relative mb-12">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: 360
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-[2px] shadow-[0_0_50px_rgba(37,99,235,0.3)]"
                    >
                        <div className="w-full h-full rounded-full bg-white dark:bg-slate-950 flex items-center justify-center relative overflow-hidden">
                            <motion.div
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent"
                            />
                            <Cpu className="w-12 h-12 text-blue-600 dark:text-blue-400 relative z-10" />
                        </div>
                    </motion.div>

                    {/* Floating Icons around Orb */}
                    {[Sparkles, Zap, Search, Fingerprint].map((Icon, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, 10, 0],
                                opacity: [0.4, 1, 0.4]
                            }}
                            transition={{
                                duration: 3,
                                delay: i * 0.5,
                                repeat: Infinity
                            }}
                            className="absolute"
                            style={{
                                top: `${50 + 60 * Math.sin(i * Math.PI / 2)}%`,
                                left: `${50 + 60 * Math.cos(i * Math.PI / 2)}%`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            <Icon className="w-5 h-5 text-blue-500/60" />
                        </motion.div>
                    ))}
                </div>

                <div className="text-center space-y-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-inner"
                    >
                        <Zap className="w-3 h-3 fill-current" />
                        AI is performing magic
                    </motion.div>

                    <div className="space-y-2">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none dark:text-white uppercase italic">
                            {total && total > 1 ? `Batch Processing` : `AI is Processing`}
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="text-blue-600"
                            >...</motion.span>
                        </h2>

                        <div className="h-6 overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={statusIndex}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-xs"
                                >
                                    {statusMessages[statusIndex]}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </div>

                    {total && total > 1 && (
                        <div className="flex items-center justify-center gap-3">
                            <span className="h-[1px] w-8 bg-slate-200 dark:bg-slate-800" />
                            <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] dark:text-blue-400">
                                File {current} of {total}
                            </p>
                            <span className="h-[1px] w-8 bg-slate-200 dark:bg-slate-800" />
                        </div>
                    )}
                </div>

                {progress !== undefined && (
                    <div className="w-full mt-12 max-w-md space-y-6">
                        <div className="relative">
                            {/* Glowing Progress Bar */}
                            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden shadow-inner relative">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 shadow-[0_0_15px_rgba(37,99,235,0.5)] relative z-10"
                                />
                            </div>
                            {/* Bottom Pulse Glow */}
                            <motion.div
                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute -bottom-2 inset-x-4 h-4 bg-blue-500/20 blur-xl rounded-full"
                            />
                        </div>

                        <div className="flex justify-between items-center px-2">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest dark:text-slate-500">Global Scan</span>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ opacity: [0.2, 1, 0.2] }}
                                            transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                                            className="w-4 h-1 bg-blue-600/30 rounded-full"
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Status</span>
                                <span className="text-2xl font-black text-blue-600 dark:text-blue-400 tracking-tighter tabular-nums italic">
                                    {Math.round(progress)}%
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};
