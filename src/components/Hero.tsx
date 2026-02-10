import React, { useCallback, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../lib/translations';
import { Sparkles, Upload, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
    onFilesSelect: (files: File[]) => void;
}

export const Hero: React.FC<HeroProps> = ({ onFilesSelect }) => {
                        </div >
    <div className="flex flex-col items-center gap-2 text-[10px] font-bold text-slate-400 mt-4 uppercase tracking-wider">
        <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
            <ImageIcon className="w-3 h-3 text-slate-400" /> JPG, PNG, WEBP (Max 15MB)
        </span>
    </div>
                    </div >
                </div >
            </motion.div >

    {/* Background Decor */ }
    < div className = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-30 pointer-events-none" >
        <div className="w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
            </div >
        </div >
    );
};
