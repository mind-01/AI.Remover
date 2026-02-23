import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Send, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../lib/translations';

export const BlogUpdatesSection: React.FC = () => {
    const { language } = useLanguage();
    const t = translations[language] || translations.en;

    return (
        <section className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-900/30 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Blog Header */}
                <div className="flex items-end justify-between mb-12">
                    <div className="space-y-4">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl font-black text-slate-800 dark:text-white tracking-tight"
                        >
                            {t.blog?.title || 'Blog'}
                        </motion.h2>
                    </div>
                    <motion.a
                        href="/blog"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors group"
                    >
                        {t.blog?.seeMore || 'See more articles'}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    {(t.blog?.posts || []).slice(0, 3).map((post: any, idx: number) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                        >
                            <div className="p-8 space-y-4">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{post.date}</span>
                                <h3 className="text-xl font-black text-slate-800 dark:text-white group-hover:text-blue-600 transition-colors leading-tight">
                                    {post.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Newsletter & Product Hunt */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-4">
                                {t.newsletter?.title || 'Get Updates'}
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 font-bold max-w-md leading-relaxed">
                                {t.newsletter?.desc || 'Sign up for our mailing list to receive news and updates.'}
                            </p>
                        </div>

                        <form className="relative max-w-md" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder={t.newsletter?.placeholder || 'Enter your email'}
                                className="w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl py-4 pl-6 pr-32 font-bold text-slate-800 dark:text-white focus:border-blue-500 outline-none transition-all shadow-sm"
                            />
                            <button className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center gap-2">
                                {t.newsletter?.subscribe || 'Subscribe'}
                                <Send className="w-3 h-3" />
                            </button>
                        </form>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">
                            {t.newsletter?.privacyNote || 'To learn more about how we handle your data, check our Privacy Policy.'}
                        </p>
                    </div>

                    <div className="flex justify-center lg:justify-end">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-8 rounded-[2.5rem] shadow-xl inline-flex flex-col items-center gap-4 text-center group cursor-pointer"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                                    <Star className="w-5 h-5 text-orange-600 fill-orange-600" />
                                </div>
                                <span className="font-black text-slate-800 dark:text-white uppercase tracking-[0.2em] text-[10px]">Product Hunt</span>
                            </div>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4].map(i => (
                                    <Star key={i} className="w-6 h-6 text-slate-800 dark:text-slate-400 fill-slate-800 dark:fill-slate-400" />
                                ))}
                                <Star className="w-6 h-6 text-slate-200 dark:text-slate-700 fill-slate-200 dark:fill-slate-700" />
                            </div>
                            <span className="text-xs font-bold text-slate-400 dark:text-slate-500">(4.4) based on 155 reviews</span>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
