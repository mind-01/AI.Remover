import React from 'react';
import { Layers } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../lib/translations';

export const Header: React.FC = () => {
    const { language } = useLanguage();
    const t = translations[language]?.common || translations.en.common;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div
                        className="flex items-center space-x-2.5 cursor-pointer group"
                    >
                        <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-200 group-hover:scale-105 transition-all duration-300">
                            <Layers className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-black text-slate-800 tracking-tight">
                            AI Remover <span className="text-blue-600">PRO</span>
                        </span>
                    </div>

                    <div className="hidden md:flex items-center space-x-10">
                        <a href="#" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-wider">{t.tools}</a>
                        <a href="#" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-wider">{t.pricing}</a>
                        <a href="#" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-wider">{t.api}</a>
                        <button className="px-6 py-2.5 bg-slate-900 text-white text-sm font-black rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 hover:scale-105 active:scale-95 uppercase tracking-wide">
                            Get Pro
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
