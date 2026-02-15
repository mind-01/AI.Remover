import React from 'react';
import { motion } from 'framer-motion';

interface ProcessingViewProps {
    progress?: number;
    current?: number;
    total?: number;
}

export const ProcessingView: React.FC<ProcessingViewProps> = ({ progress, current, total }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 md:p-8 max-w-4xl mx-auto relative overflow-hidden">
            {/* Minimal Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

            {/* Glassmorphic Container (Minimalist) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative bg-white/30 dark:bg-slate-900/30 backdrop-blur-2xl p-12 md:p-20 rounded-[5rem] border border-white/20 dark:border-slate-800/20 w-full max-w-lg flex flex-col items-center shadow-2xl shadow-blue-950/5"
            >
                {/* AI Orb Animation - Central Focus */}
                <div className="relative mb-10">
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                            rotate: 360
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="w-48 h-48 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-[0_0_60px_rgba(37,99,235,0.15)]"
                    >
                        <div className="w-full h-full rounded-full bg-white dark:bg-slate-950 flex items-center justify-center relative overflow-hidden">
                            <motion.div
                                animate={{ opacity: [0.05, 0.15, 0.05] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute inset-0 bg-blue-500/10"
                            />

                            {/* Percentage inside Orb */}
                            {progress !== undefined && (
                                <div className="text-center relative z-10 flex flex-col items-center">
                                    <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter tabular-nums italic">
                                        {Math.round(progress)}%
                                    </span>
                                    <span className="text-[10px] font-black text-blue-600/60 uppercase tracking-widest mt-1">AI Processing</span>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Subtle Pulsing Outer Ring */}
                    <motion.div
                        animate={{ scale: [1, 1.3], opacity: [0.2, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        className="absolute inset-x-[-20px] inset-y-[-20px] border border-blue-500/20 rounded-full"
                    />
                </div>

                {/* File Count - Tiny & Subtle */}
                {total && total > 1 && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-6"
                    >
                        File {current} / {total}
                    </motion.p>
                )}

                {/* Sleek Minimal Progress Bar */}
                {progress !== undefined && (
                    <div className="w-full max-w-[180px]">
                        <div className="w-full h-1 bg-slate-100 dark:bg-slate-800/60 rounded-full overflow-hidden relative">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                                className="h-full bg-blue-600"
                            />
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};
