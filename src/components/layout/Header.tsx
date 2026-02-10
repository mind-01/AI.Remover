import React from 'react';
import { Layers, Loader2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../lib/translations';
import { useAuth } from '../../contexts/AuthContext';
import { AuthModal } from '../auth/AuthModal';

export const Header: React.FC<{ setShowDashboard: (show: boolean) => void }> = ({ setShowDashboard }) => {
    const { language } = useLanguage();
    const { user, signOut, loading } = useAuth();
    const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
    const t = translations[language]?.common || translations.en.common;

    console.log('Header: Rendered. User:', user ? user.email : 'NULL');

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

                        {loading ? (
                            <div className="flex items-center gap-2 text-slate-400">
                                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Checking...</span>
                            </div>
                        ) : user ? (
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setShowDashboard(true)}
                                    className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-wider"
                                >
                                    {t.dashboard || 'Dashboard'}
                                </button>
                                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-blue-100 uppercase">
                                    {user.email?.[0] || 'U'}
                                </div>
                                <button
                                    onClick={signOut}
                                    className="text-[10px] font-black text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors"
                                >
                                    {t.logout || 'Logout'}
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsAuthModalOpen(true)}
                                className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-wider"
                            >
                                {t.login || 'Login'}
                            </button>
                        )}

                        <button className="px-6 py-2.5 bg-slate-900 text-white text-sm font-black rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 hover:scale-105 active:scale-95 uppercase tracking-wide">
                            {t.getPro}
                        </button>
                    </div>
                </div>
            </div>
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </nav>
    );
};
