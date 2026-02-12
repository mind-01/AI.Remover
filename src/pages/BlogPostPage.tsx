import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Loader2 } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { supabase } from '../lib/supabase';

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    cover_image: string;
    created_at: string;
}

export const BlogPostPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            if (!supabase || !slug) return;
            try {
                const { data, error } = await supabase
                    .from('blog_posts')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (error) throw error;
                setPost(data);
            } catch (err) {
                console.error('Error fetching post:', err);
                // Fallback for demo
                if (slug === 'remove-background-like-pro') {
                    setPost({
                        id: '1',
                        title: 'How to Remove Background Like a Pro',
                        slug: 'remove-background-like-pro',
                        content: `
                            <p>Removing backgrounds from images used to be a tedious task that required professional software and hours of manual work. But with the advent of AI, that has all changed.</p>
                            <h2>The Rise of AI in Background Removal</h2>
                            <p>Modern machine learning models, like the ones used in AI Remover PRO, can now identify subjects with incredible precision. Whether it's complex hair patterns or fine edges, the AI analyzes every pixel to ensure a perfect cutout.</p>
                            <img src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200&q=80" alt="AI Analytics" />
                            <h2>Why Choose Local Processing?</h2>
                            <p>One of the biggest advantages of our tool is that it processes everything right in your browser. This means your images never leave your computer, ensuring 100% privacy and lightning-fast speeds.</p>
                            <blockquote>"The transition from manual masking to AI-powered removal is the single biggest productivity boost for photographers in a decade."</blockquote>
                            <p>Ready to try it out? Head over to our homepage and upload your first image today!</p>
                        `,
                        cover_image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200&q=80',
                        created_at: new Date().toISOString()
                    });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col pt-32">
                <Header setShowDashboard={() => { }} />
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                    <p className="text-slate-500 font-black uppercase tracking-widest text-sm">Loading article...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 text-center">
                <Header setShowDashboard={() => { }} />
                <div className="max-w-7xl mx-auto px-4 py-20">
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-6">Post Not Found</h1>
                    <Link to="/blog" className="text-blue-600 font-bold hover:underline flex items-center justify-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
            <Header setShowDashboard={() => { }} />

            <main className="pt-32 pb-20">
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumbs */}
                    <nav className="mb-12">
                        <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors font-bold uppercase tracking-widest text-xs">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Articles
                        </Link>
                    </nav>

                    {/* Header */}
                    <div className="space-y-8 mb-16">
                        <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <span className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-100 dark:bg-slate-900 rounded-full border border-slate-100 dark:border-slate-800">
                                <Calendar className="w-3 h-3 text-blue-600" />
                                {new Date(post.created_at).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-100 dark:bg-slate-900 rounded-full border border-slate-100 dark:border-slate-800">
                                <Clock className="w-3 h-3 text-amber-500" />
                                5 min read
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                            {post.title}
                        </h1>
                    </div>

                    {/* Cover Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-[3rem] overflow-hidden mb-16 shadow-2xl shadow-blue-900/10"
                    >
                        <img
                            src={post.cover_image}
                            alt={post.title}
                            className="w-full aspect-video object-cover"
                        />
                    </motion.div>

                    {/* Content Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16">
                        {/* Article Body */}
                        <div
                            className="prose prose-lg dark:prose-invert prose-slate max-w-none 
                                     prose-headings:font-black prose-headings:tracking-tight
                                     prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                                     prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed prose-p:mb-8
                                     prose-img:rounded-[2rem] prose-img:shadow-xl
                                     prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50/50 dark:prose-blockquote:bg-blue-900/10 prose-blockquote:p-8 prose-blockquote:rounded-r-3xl prose-blockquote:italic prose-blockquote:font-bold prose-blockquote:text-xl"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Sidebar / Social Share */}
                        <aside className="lg:w-16 space-y-8 flex lg:flex-col items-center">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest vertical-rl rotate-180 hidden lg:block">Share This</p>
                            <div className="flex lg:flex-col gap-4">
                                {[
                                    { icon: Facebook, color: 'hover:bg-blue-600' },
                                    { icon: Twitter, color: 'hover:bg-sky-500' },
                                    { icon: Linkedin, color: 'hover:bg-blue-700' },
                                    { icon: Share2, color: 'hover:bg-slate-900' }
                                ].map((item, i) => (
                                    <button
                                        key={i}
                                        className={`p-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-white transition-all shadow-sm ${item.color}`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                    </button>
                                ))}
                            </div>
                        </aside>
                    </div>

                    {/* Author Footer */}
                    <div className="mt-20 p-10 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                        <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-blue-200">
                            A
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-xl font-black text-slate-900 dark:text-white">AI Remover Editorial</h4>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">Providing the best tips and tricks for high-precision background removal since 2024.</p>
                        </div>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
};
