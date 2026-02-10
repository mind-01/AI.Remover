import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Trash2, Clock, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface DashboardProps {
    onClose: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onClose }) => {
    const { history, loading } = useAuth();

    const handleDownload = async (url: string, id: string) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `cleancut-${id}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-6">
                    <button
                        onClick={onClose}
                        className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight leading-none mb-2">My History</h1>
                        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                            <Clock className="w-3 h-3" /> {history.length} Professional Cutouts
                        </p>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 space-y-4">
                    <div className="w-12 h-12 border-4 border-blue-600/10 border-t-blue-600 rounded-full animate-spin" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading History...</span>
                </div>
            ) : history.length === 0 ? (
                <div className="bg-white rounded-[3rem] border border-slate-100 p-24 text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ImageIcon className="w-8 h-8 text-slate-300" />
                    </div>
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">No history yet</h2>
                    <p className="text-slate-500 font-medium max-w-xs mx-auto text-sm">Upload your first image to start building your professional collection.</p>
                    <button
                        onClick={onClose}
                        className="mt-8 px-8 py-3.5 bg-blue-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
                    >
                        Start Editing
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {history.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
                        >
                            <div className="aspect-[4/3] bg-slate-50 relative overflow-hidden">
                                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                                <img
                                    src={item.processed_url}
                                    className="w-full h-full object-contain relative z-10 p-6 drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
                                    alt="Process Result"
                                />
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                    <button
                                        onClick={() => handleDownload(item.processed_url, item.id)}
                                        className="p-2.5 bg-white border border-slate-100 rounded-xl text-blue-600 shadow-xl hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1"
                                    >
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">
                                        {new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                    <button className="text-slate-300 hover:text-red-500 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => window.open(item.processed_url, '_blank')}
                                        className="flex-grow py-3 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" /> View Full
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
