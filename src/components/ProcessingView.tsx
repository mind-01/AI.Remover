import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';

interface ProcessingViewProps {
    progress?: number;
    current?: number;
    total?: number;
}

export const ProcessingView: React.FC<ProcessingViewProps> = ({ progress, current, total }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 max-w-2xl mx-auto">
            <div className="relative group">
                <div className="absolute inset-0 bg-blue-400 blur-3xl opacity-20 group-hover:opacity-30 transition-opacity animate-pulse" />
                <div className="relative">
                    <Loader2 className="w-20 h-20 text-blue-600 animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-black text-blue-600">
                        {progress !== undefined ? `${Math.round(progress)}%` : ''}
                    </div>
                </div>
            </div>

            <div className="mt-12 text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100 mb-2">
                    <Sparkles className="w-3 h-3" />
                    AI is working magic
                </div>

                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                    {total && total > 1 ? `Batch Processing...` : `AI is Processing...`}
                </h2>

                {total && total > 1 && (
                    <p className="text-blue-600 font-black uppercase tracking-widest text-xs">
                        Handling {current} of {total} files
                    </p>
                )}

                <p className="text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
                    We're removing backgrounds and refining every edge for professional results.
                </p>
            </div>

            {progress !== undefined && (
                <div className="w-full mt-12 space-y-3">
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner border border-slate-50">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg"
                        />
                    </div>
                    <div className="flex justify-between items-center px-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Overall Progress</span>
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{Math.round(progress)}%</span>
                    </div>
                </div>
            )}
        </div>
    );
};
