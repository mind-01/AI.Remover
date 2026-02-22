import React from 'react';
import { Check, Sparkles, Zap, Shield, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

export const PricingSection: React.FC = () => {
    const plans = [
        {
            name: "Free",
            price: "$0",
            desc: "For hobbyists & individuals",
            icon: <Shield className="w-6 h-6 text-slate-400" />,
            features: [
                "Unlimited Local Exports",
                "Standard resolution",
                "Community support",
                "Privacy-first processing"
            ],
            cta: "Get Started",
            popular: false
        },
        {
            name: "Pro",
            price: "$19",
            desc: "For professional creators",
            icon: <Zap className="w-6 h-6 text-blue-500" />,
            features: [
                "Unlimited images",
                "Ultra-HD resolution",
                "Priority email support",
                "No watermarks",
                "History cloud-sync",
                "Batch processing"
            ],
            cta: "Go Pro",
            popular: true
        },
        {
            name: "Business",
            price: "$49",
            desc: "For teams & developers",
            icon: <Crown className="w-6 h-6 text-amber-500" />,
            features: [
                "Unlimited team members",
                "API access (1k req/mo)",
                "Custom Slack support",
                "SLA guarantee",
                "Advanced batch tools"
            ],
            cta: "Contact Sales",
            popular: false
        }
    ];

    return (
        <section id="pricing" className="py-32 bg-white dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 dark:bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.3em]"
                    >
                        Pricing Plans
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight"
                    >
                        Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Transparent</span> Pricing
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto"
                    >
                        Choose the plan that fits your creative workflow. No hidden fees, cancel anytime.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative group h-full flex flex-col p-1 rounded-[2.5rem] transition-all duration-500 ${plan.popular
                                    ? 'bg-gradient-to-b from-blue-500 to-indigo-600 shadow-2xl shadow-blue-500/20 scale-105 z-10'
                                    : 'bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-5 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-2 shadow-xl ring-4 ring-white dark:ring-slate-950">
                                    <Sparkles className="w-3 h-3 text-amber-400" />
                                    MOST POPULAR
                                </div>
                            )}

                            <div className="flex-1 bg-white dark:bg-slate-900 rounded-[2.3rem] p-10 flex flex-col">
                                <div className="mb-10 space-y-6">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${plan.popular ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-slate-50 dark:bg-slate-800'
                                        }`}>
                                        {plan.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">{plan.name}</h4>
                                        <div className="flex items-baseline gap-1 mb-2">
                                            <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">{plan.price}</span>
                                            <span className="text-slate-400 font-bold">/mo</span>
                                        </div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 font-bold leading-relaxed">{plan.desc}</p>
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-12 flex-grow">
                                    {plan.features.map((feature, fIndex) => (
                                        <li key={fIndex} className="flex items-start gap-3 text-slate-600 dark:text-slate-300 font-bold text-sm leading-relaxed">
                                            <div className={`mt-1 p-0.5 rounded-full shrink-0 ${plan.popular ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                                                }`}>
                                                <Check className="w-3 h-3" strokeWidth={3} />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3 overflow-hidden relative group/btn ${plan.popular
                                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-500/20'
                                            : 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 hover:opacity-90'
                                        }`}
                                >
                                    <span className="relative z-10">{plan.cta}</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-24 p-8 rounded-[2.5rem] bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800 text-center backdrop-blur-sm"
                >
                    <p className="text-slate-500 dark:text-slate-400 font-bold">
                        Looking for enterprise solutions? <a href="#" className="text-blue-600 dark:text-blue-400 underline underline-offset-4 hover:text-indigo-600 transition-colors">Chat with our sales team</a>.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
