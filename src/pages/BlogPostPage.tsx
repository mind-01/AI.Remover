import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Loader2, Layers, Sparkles, ArrowRight } from 'lucide-react';
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
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState<{ id: number; text: string; date: string }[]>([]);
    const [newComment, setNewComment] = useState('');
    const [isPosting, setIsPosting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handlePostComment = () => {
        if (!newComment.trim()) return;

        setIsPosting(true);
        // Simulate API call
        setTimeout(() => {
            const comment = {
                id: Date.now(),
                text: newComment.trim(),
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            };
            const updatedComments = [comment, ...comments];
            setComments(updatedComments);

            // Persist to localStorage
            if (slug) {
                localStorage.setItem(`comments_${slug}`, JSON.stringify(updatedComments));
            }

            setNewComment('');
            setIsPosting(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 800);
    };

    // Load comments from localStorage
    useEffect(() => {
        if (slug) {
            const savedComments = localStorage.getItem(`comments_${slug}`);
            if (savedComments) {
                try {
                    setComments(JSON.parse(savedComments));
                } catch (e) {
                    console.error('Error parsing saved comments:', e);
                }
            } else {
                setComments([]);
            }
        }
    }, [slug]);

    useEffect(() => {
        const fetchPost = async () => {
            if (!slug) return;
            try {
                if (!supabase) {
                    throw new Error('Supabase not initialized');
                }
                const { data, error } = await supabase
                    .from('blog_posts')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (error) throw error;
                setPost(data);
            } catch (err) {
                console.error('Error fetching post:', err);
                // Fallback for demo/initial content
                if (slug === 'how-to-remove-background-for-amazon-product-photos') {
                    setPost({
                        id: '5',
                        title: 'How to Remove Background for Amazon Product Photos<br />(2026 Seller Guide)',
                        slug: 'how-to-remove-background-for-amazon-product-photos',
                        content: `
                            <div class="blog-content-wrapper">
                                <p class="text-xl leading-relaxed text-slate-600 dark:text-slate-400 mb-10 font-medium font-serif italic text-center">"Your main image is your most important salesperson on Amazon."</p>
                                
                                <p class="text-lg leading-relaxed mb-10">Selling on Amazon is a game of visual trust. The platform's <strong>"Main Image"</strong> requirement—a pure white background—isn't just a hurdle; it's a proven conversion tool. In this guide, we'll show you how to leverage <strong>RemovePro's local AI</strong> to create #FFFFFF background images that meet Amazon's strictest standards instantly.</p>

                                <div class="blog-image-container my-16 text-center">
                                    <div class="inline-block relative p-1 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[3rem] shadow-2xl">
                                        <div class="relative overflow-hidden rounded-[2.9rem]">
                                            <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200" alt="Professional Amazon Sneaker Shot" loading="lazy" class="block m-0 hover:scale-110 transition-transform duration-700">
                                            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                        </div>
                                    </div>
                                    <p class="mt-8 text-slate-400 font-bold italic text-sm">Case Study: Nike Runner processed to 100% white background perfection.</p>
                                </div>

                                <h2 class="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mt-24 mb-10 tracking-tighter border-l-8 border-blue-600 pl-8">The Alchemy of the Pure White Background</h2>
                                <p class="text-lg leading-relaxed mb-10">Amazon mandates an RGB (255, 255, 255) background. Why? Consistency. When every product in search results shares the same infinite white space, customers can compare specs and aesthetics without being distracted by varied lighting or messy studio setups.</p>
                                
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
                                    <div class="p-10 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                                        <h3 class="text-2xl font-black mb-4">Mobile Optimization</h3>
                                        <p class="text-slate-600 dark:text-slate-400 mb-0 font-medium">Over 70% of Amazon traffic is mobile. On a small screen, a white background makes the subject appear 20% larger and significantly sharper.</p>
                                    </div>
                                    <div class="p-10 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                                        <h3 class="text-2xl font-black mb-4">Trust Factor</h3>
                                        <p class="text-slate-600 dark:text-slate-400 mb-0 font-medium">A standardized background signals to the customer that they are buying from a professional, verified seller rather than a casual marketplace listing.</p>
                                    </div>
                                </div>

                                <h2 class="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mt-24 mb-10 tracking-tighter border-l-8 border-blue-600 pl-8">The 4-Step Professional Workflow</h2>
                                <p class="text-lg leading-relaxed mb-12">You don't need a $10,000 studio. You only need good lighting and the right AI pipeline.</p>

                                <div class="space-y-32 my-24">
                                    <div class="relative pl-12 border-l-2 border-slate-100 dark:border-slate-800 pb-10">
                                        <div class="absolute -left-6 top-0 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg animate-pulse">1</div>
                                        <h3 class="text-3xl font-black mb-6 text-slate-900 dark:text-white">Capture and Upload</h3>
                                        <p class="text-lg mb-10 font-medium text-slate-600 dark:text-slate-400">Use any natural light source. Drag your product image into the <strong>RemovePro</strong> dashboard. Our AI is trained on millions of e-commerce datasets to handle complex shadows.</p>
                                        <div class="rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800">
                                            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200" alt="Step 1: Upload" class="w-full">
                                        </div>
                                    </div>

                                    <div class="relative pl-12 border-l-2 border-slate-100 dark:border-slate-800 pb-10">
                                        <div class="absolute -left-6 top-0 w-12 h-12 bg-blue-800 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">2</div>
                                        <h3 class="text-3xl font-black mb-6 text-slate-900 dark:text-white">Edge Detection Precision</h3>
                                        <p class="text-lg mb-10 font-medium text-slate-600 dark:text-slate-400">Our local AI engine performs a sub-pixel analysis to ensure even fine textures—like camera lens reflections or fabric weaves—are perfectly cut out.</p>
                                        <div class="rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800">
                                            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200" alt="Step 2: Analysis" class="w-full">
                                        </div>
                                    </div>

                                    <div class="relative pl-12 border-l-2 border-slate-100 dark:border-slate-800">
                                        <div class="absolute -left-6 top-0 w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">3</div>
                                        <h3 class="text-3xl font-black mb-6 text-slate-900 dark:text-white">Export for Seller Central</h3>
                                        <p class="text-lg mb-10 font-medium text-slate-600 dark:text-slate-400">Select the 'Amazon White' preset. This automatically sets the background to hex #FFFFFF and exports a high-resolution JPG that meets the 10:1 compression limit.</p>
                                        <div class="rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800">
                                            <img src="/blog/ai-background-remover-hd-download-options.webp" alt="Step 3: Export" class="w-full">
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-32 p-16 bg-slate-900 rounded-[4rem] text-center text-white shadow-3xl relative overflow-hidden">
                                    <div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
                                    <h2 class="text-4xl md:text-6xl font-black text-white m-0 mb-8 leading-tight tracking-tighter uppercase">Skyrocket Your Sales</h2>
                                    <p class="text-slate-400 text-xl mb-12 max-w-2xl mx-auto font-medium">Join 50,000+ Amazon sellers who have ditched expensive subscriptions for the speed of RemovePro.</p>
                                    <a href="/" class="relative z-10 inline-block bg-white text-blue-600 py-6 px-16 rounded-2xl font-black uppercase tracking-[0.3em] text-sm hover:scale-105 transition-transform shadow-2xl">Start Free Bulk Upload</a>
                                </div>

                                <div class="mt-16 text-center">
                                    <p class="text-slate-400 font-bold">Need help? Read our <a href="/faq" class="text-blue-600 no-underline hover:underline">Seller FAQ</a></p>
                                </div>
                            </div>
                        `,
                        cover_image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200',
                        created_at: new Date().toISOString()
                    });
                } else if (slug === 'how-to-remove-background-on-mobile') {
                    setPost({
                        id: '4',
                        title: 'How to Remove Background from Image on Mobile<br />(Free & No App Required)',
                        slug: 'how-to-remove-background-on-mobile',
                        content: `
                            <div class="blog-content-wrapper">
                                <p class="text-xl leading-relaxed text-slate-600 dark:text-slate-400 mb-10 font-medium font-serif italic text-center">"The best camera is the one that's always with you."</p>

                                <p class="text-lg leading-relaxed mb-10">We live in a mobile-first world. Whether you're a social media influencer, an e-commerce seller capturing inventory on the go, or just someone looking to create a cool profile picture, you need a way to <strong>remove image backgrounds on mobile</strong> without the bloat of specialized apps. <strong>RemovePro</strong> brings desktop-grade AI to your mobile browser—for free.</p>

                                <div class="blog-image-container my-16 text-center">
                                    <div class="inline-block relative p-1 bg-gradient-to-tr from-orange-400 to-red-500 rounded-[3rem] shadow-2xl">
                                        <div class="relative overflow-hidden rounded-[2.9rem]">
                                            <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200" alt="Person using smartphone outside" loading="lazy" class="block m-0 hover:scale-105 transition-transform duration-500">
                                            <div class="absolute inset-0 bg-orange-500/10"></div>
                                        </div>
                                    </div>
                                    <p class="mt-8 text-slate-400 font-bold italic text-sm">Professional editing on the go: No downloads, no subscriptions, no compromises.</p>
                                </div>

                                <h2 class="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mt-24 mb-10 tracking-tighter border-l-8 border-orange-500 pl-8">Universal Browser Compatibility</h2>
                                <p class="text-lg leading-relaxed mb-10">You don't need a high-end iPhone or the latest Samsung Galaxy to run RemovePro. Our <strong>local AI engine</strong> is optimized for mobile Safari, Chrome, and Firefox, utilizing your device's hardware acceleration directly in the browser tab.</p>

                                <div class="bg-indigo-900 text-white p-12 rounded-[4rem] my-16 shadow-2xl relative overflow-hidden">
                                    <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full translate-x-32 -translate-y-32"></div>
                                    <h2 class="text-3xl font-black mb-10 text-white mt-0">Mobile Advantage Checklist</h2>
                                    <ul class="grid grid-cols-1 md:grid-cols-2 gap-8 p-0 list-none m-0">
                                        <li class="flex items-start gap-4 m-0 text-indigo-50">
                                            <span class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shrink-0 font-black text-sm">✓</span>
                                            <span><strong>Zero Data Usage:</strong> AI runs locally, saving your mobile data plan.</span>
                                        </li>
                                        <li class="flex items-start gap-4 m-0 text-indigo-50">
                                            <span class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shrink-0 font-black text-sm">✓</span>
                                            <span><strong>Save Storage:</strong> No app means more room for your photos.</span>
                                        </li>
                                        <li class="flex items-start gap-4 m-0 text-indigo-50">
                                            <span class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shrink-0 font-black text-sm">✓</span>
                                            <span><strong>Unlimited HD:</strong> No "Credits" required for your high-res shots.</span>
                                        </li>
                                        <li class="flex items-start gap-4 m-0 text-indigo-50">
                                            <span class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shrink-0 font-black text-sm">✓</span>
                                            <span><strong>Instant Speed:</strong> No waiting for server uploads or queues.</span>
                                        </li>
                                    </ul>
                                </div>

                                <h2 class="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mt-24 mb-12 tracking-tighter border-l-8 border-orange-500 pl-8">The Mobile Workflow</h2>
                                
                                <div class="space-y-32 my-24">
                                    <div class="relative pl-12 border-l-2 border-slate-100 dark:border-slate-800 pb-12">
                                        <div class="absolute -left-7 top-0 w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">1</div>
                                        <h3 class="text-3xl font-black mb-6 text-slate-900 dark:text-white">Capture and Tap</h3>
                                        <p class="text-lg mb-10 font-medium text-slate-600 dark:text-slate-400">Visit <strong>RemovePro.com</strong>. Tap the upload area to select a photo from your library or take a fresh shot using your phone's native camera app.</p>
                                        <div class="rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800">
                                            <img src="https://images.unsplash.com/photo-1551817958-c5b52119c623?auto=format&fit=crop&q=80&w=1200" alt="Capturing photo" class="w-full">
                                        </div>
                                    </div>

                                    <div class="relative pl-12 border-l-2 border-slate-100 dark:border-slate-800 pb-12">
                                        <div class="absolute -left-7 top-0 w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">2</div>
                                        <h3 class="text-3xl font-black mb-6 text-slate-900 dark:text-white">AI Edge Precision</h3>
                                        <p class="text-lg mb-10 font-medium text-slate-600 dark:text-slate-400">Observe as our lightweight neural network isolates your subject. Every strand of hair and fine edge is calculated locally on your phone's processor.</p>
                                        <div class="rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800">
                                            <img src="https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&q=80&w=1200" alt="Local processing" class="w-full">
                                        </div>
                                    </div>

                                    <div class="relative pl-12 border-l-2 border-slate-100 dark:border-slate-800">
                                        <div class="absolute -left-7 top-0 w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">3</div>
                                        <h3 class="text-3xl font-black mb-6 text-slate-900 dark:text-white">Export & Share</h3>
                                        <p class="text-lg mb-10 font-medium text-slate-600 dark:text-slate-400">Finalize your edit. Tap 'Download HD' to save a transparent PNG directly to your mobile storage. Perfect for instant sharing on Instagram or listing on Depop.</p>
                                        <div class="rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800">
                                            <img src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1200" alt="Sharing on mobile" class="w-full">
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-32 p-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-[4rem] text-center text-white shadow-3xl">
                                    <h2 class="text-4xl md:text-6xl font-black text-white m-0 mb-8 leading-tight tracking-tighter uppercase font-serif italic">Edit on the Go.</h2>
                                    <p class="text-orange-100 text-xl mb-12 max-w-2xl mx-auto font-medium">No account required. No app to download. Just professional background removal anywhere, anytime.</p>
                                    <a href="/" class="inline-block bg-white text-orange-600 py-6 px-16 rounded-2xl font-black uppercase tracking-[0.3em] text-sm hover:scale-105 transition-transform shadow-2xl">Remove Background Now</a>
                                </div>
                            </div>
                        `,
                        cover_image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200',
                        created_at: new Date().toISOString()
                    });
                } else if (slug === 'best-free-remove-bg-alternative') {
                    setPost({
                        id: '3',
                        title: 'Best Free Remove.bg Alternative (No Upload, No Watermark) – RemovePro',
                        slug: 'best-free-remove-bg-alternative',
                        content: `
                            <div class="blog-content-wrapper">
                                <p class="text-xl leading-relaxed text-slate-600 dark:text-slate-400 mb-10 font-medium">Are you tired of the "Free Credit" trap? We've all been there: you use Remove.bg to isolate a perfect product shot, only to realize the "Free" version gives you a blurry, low-resolution thumbnail. To get the HD version, you're forced to buy credits or subscribe to a monthly plan.</p>
                                
                                <p class="text-lg leading-relaxed mb-10">It’s frustrating, expensive, and frankly, unnecessary. In this 2026 review, we analyze why <strong>RemovePro</strong> is objectively the <strong>best free Remove.bg alternative</strong> for professional creators.</p>

                                <div class="blog-image-container my-16 text-center">
                                    <div class="inline-block relative p-1 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-[3rem] shadow-2xl">
                                        <div class="relative overflow-hidden rounded-[2.9rem]">
                                            <img src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1200" alt="Premium Handbag Product Shot" loading="lazy" class="block m-0 hover:scale-105 transition-transform duration-500">
                                            <div class="absolute inset-0 bg-gradient-to-br from-green-600/10 to-transparent"></div>
                                        </div>
                                    </div>
                                    <p class="mt-8 text-slate-400 font-bold italic text-sm">RemovePro handles complex textures like leather and hardware with zero compression.</p>
                                </div>

                                <h2 class="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mt-24 mb-10 tracking-tighter border-l-8 border-green-500 pl-8">The 'Hidden Costs' of Traditional Tools</h2>
                                <p class="text-lg leading-relaxed mb-10">While Remove.bg was the pioneer of AI suppression, its business model has become a barrier for small businesses. If you're processing 50+ images a month, you could be spending $40 USD or more just to remove backgrounds.</p>
                                
                                <div class="overflow-x-auto my-12 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-2xl text-left bg-white dark:bg-slate-900">
                                    <table class="w-full text-left border-collapse">
                                         <thead>
                                            <tr class="bg-slate-50 dark:bg-slate-800/50">
                                                <th class="p-10 font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800">Metric</th>
                                                <th class="p-10 font-black text-green-600 border-b border-slate-100 dark:border-slate-800">RemovePro (Winner)</th>
                                                <th class="p-10 font-black text-slate-400 border-b border-slate-100 dark:border-slate-800">Remove.bg</th>
                                            </tr>
                                        </thead>
                                        <tbody class="text-slate-600 dark:text-slate-400 font-medium">
                                            <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                                                <td class="p-10 border-b border-slate-50 dark:border-slate-800 font-bold text-lg">HD Download Cost</td>
                                                <td class="p-10 border-b border-slate-50 dark:border-slate-800 text-green-600 font-black text-xl">$0 (Unlimited)</td>
                                                <td class="p-10 border-b border-slate-50 dark:border-slate-800 text-slate-400 text-lg">~$1.00 USD / image</td>
                                            </tr>
                                            <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                                                <td class="p-10 border-b border-slate-50 dark:border-slate-800 font-bold text-lg">Data Privacy</td>
                                                <td class="p-10 border-b border-slate-50 dark:border-slate-800 text-green-600 font-black text-xl">100% On-Device</td>
                                                <td class="p-10 border-b border-slate-50 dark:border-slate-800 text-slate-400 text-lg">Server Uploads</td>
                                            </tr>
                                            <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                                                <td class="p-10 border-b border-slate-50 dark:border-slate-800 font-bold text-lg">Registration</td>
                                                <td class="p-10 border-b border-slate-50 dark:border-slate-800 text-green-600 font-black text-xl">Not Required</td>
                                                <td class="p-10 border-b border-slate-50 dark:border-slate-800 text-slate-400 text-lg">Mandatory for HD</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <h2 class="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mt-24 mb-10 tracking-tighter border-l-8 border-green-500 pl-8">Speed Without Servers</h2>
                                <p class="text-lg leading-relaxed mb-10">Most browsers now support high-performance computing through <strong>WebAssembly (WASM)</strong>. RemovePro leverages this to run the neural network directly on your computer's GPU. This isn't just a "free tool"—it's a technical breakthrough that eliminates the need for expensive server farms.</p>
                                
                                <blockquote class="my-20 p-12 bg-green-50/50 dark:bg-emerald-900/10 border-l-8 border-green-500 rounded-r-[3rem] italic text-3xl font-medium text-slate-700 dark:text-slate-300">
                                    "The best tools don't ask for your credit card or your email; they just solve the problem. RemovePro is the first background remover that respects both your wallet and your privacy."
                                </blockquote>

                                <div class="blog-image-container my-16 text-center">
                                    <div class="inline-block relative p-1 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-[3rem] shadow-2xl">
                                        <div class="relative overflow-hidden rounded-[2.9rem]">
                                            <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200" alt="Precision Hair Selection" loading="lazy" class="block m-0 hover:scale-105 transition-transform duration-500">
                                        </div>
                                    </div>
                                    <p class="mt-8 text-slate-400 font-bold italic text-sm">Local AI processing allows for sub-pixel precision on complex hair and transparent layers.</p>
                                </div>

                                <div class="mt-32 p-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-[4rem] text-center text-white shadow-3xl">
                                    <h2 class="text-4xl md:text-6xl font-black text-white m-0 mb-8 leading-tight tracking-tighter uppercase">Stop Paying for Backgrounds</h2>
                                    <p class="text-green-100 text-xl mb-12 max-w-2xl mx-auto font-medium">Join 200,000+ creators switching to the best free alternative. No signup. No catch.</p>
                                    <a href="/" class="inline-block bg-white text-green-600 py-6 px-16 rounded-2xl font-black uppercase tracking-[0.3em] text-sm hover:scale-105 transition-transform shadow-2xl">Reclaim Your Budget</a>
                                </div>
                            </div>
                        `,
                        cover_image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1200',
                        created_at: new Date().toISOString()
                    });
                } else if (slug === 'remove-background-like-pro') {
                    setPost({
                        id: '1',
                        title: 'How to Remove Background Like a Pro (2026)',
                        slug: 'remove-background-like-pro',
                        content: `
                            <div class="blog-content-wrapper">
                                <p class="text-xl leading-relaxed text-slate-600 dark:text-slate-400 mb-10 font-medium">Achieving a pixel-perfect cutout isn't just about the AI—it's about the workflow. While our <strong>AI background remover</strong> handles 99% of the work, these pro tips will help you handle complex hair, tough shadows, and lighting matches like a seasoned editor.</p>
                                
                                <div class="blog-image-container my-16 text-center">
                                    <div class="inline-block relative p-1 bg-gradient-to-tr from-blue-900 to-indigo-900 rounded-[3rem] shadow-2xl">
                                        <div class="relative overflow-hidden rounded-[2.9rem]">
                                            <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200" alt="Professional Editing Workflow" loading="lazy" class="block m-0 hover:scale-105 transition-transform duration-500">
                                            <div class="absolute inset-0 bg-blue-900/10 backdrop-blur-[2px]"></div>
                                        </div>
                                    </div>
                                    <p class="mt-8 text-slate-400 font-bold italic text-sm">Case Study: Pro editors use sub-pixel masks for commercial-grade results.</p>
                                </div>

                                <h2 class="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mt-24 mb-10 tracking-tighter border-l-8 border-blue-950 dark:border-blue-400 pl-8">1. Lighting and Contrast Matter</h2>
                                <p class="text-lg leading-relaxed mb-10">AI models work best when there is high contrast between the subject and the background. If you're shooting product photos, try to avoid "tangential" lighting that makes the edges of the object blend into the backdrop.</p>

                                <div class="my-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div class="p-12 bg-slate-50 dark:bg-slate-900 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
                                        <div class="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white font-black text-3xl mb-8 shadow-lg">A</div>
                                        <h3 class="text-2xl font-black mb-4">Focus on Hair</h3>
                                        <p class="text-slate-600 dark:text-slate-400 mb-0 font-medium">Use our 'Soft Brush' tool to refine the edges of hair. This prevents the "cut-out" look and keeps the composition feeling organic.</p>
                                    </div>
                                    <div class="p-12 bg-slate-50 dark:bg-slate-900 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
                                        <div class="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-white font-black text-3xl mb-8 shadow-lg">B</div>
                                        <h3 class="text-2xl font-black mb-4">Shadow Recovery</h3>
                                        <p class="text-slate-600 dark:text-slate-400 mb-0 font-medium">Don't delete the natural contact shadow. Use the erase tool with 20% opacity to keep a hint of the original grounding.</p>
                                    </div>
                                </div>

                                <h2 class="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mt-24 mb-10 tracking-tighter border-l-8 border-blue-950 dark:border-blue-400 pl-8">2. Match Your New Background</h2>
                                <p class="text-lg leading-relaxed mb-10">When placing your subject on a new background, remember to match the lighting temperature. If your cutout was shot in soft light but your new background has harsh sun, it won't look "realistic". Use our brightness and contrast tools to bridge the gap.</p>

                                <div class="blog-image-container my-16 text-center">
                                    <div class="inline-block relative p-1 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-[3rem] shadow-2xl">
                                        <div class="relative overflow-hidden rounded-[2.9rem]">
                                            <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1200" alt="Pixel Perfect Zoom" loading="lazy" class="block m-0 hover:scale-110 transition-transform duration-700">
                                        </div>
                                    </div>
                                    <p class="mt-8 text-slate-400 font-bold italic text-sm">Professional clarity achieved at 400% zoom level.</p>
                                </div>

                                <div class="mt-32 p-16 bg-slate-900 rounded-[4rem] text-center text-white shadow-3xl border border-slate-800 relative overflow-hidden">
                                    <div class="absolute inset-0 bg-blue-600/10"></div>
                                    <h2 class="text-4xl md:text-6xl font-black text-white m-0 mb-8 leading-tight tracking-tighter uppercase font-serif italic">Ready to go Pro?</h2>
                                    <p class="text-slate-400 text-xl mb-12 max-w-xl mx-auto font-medium">Our advanced dashboard handles bulk processing and pixel-perfect refinement in seconds.</p>
                                    <a href="/" class="relative z-10 inline-block bg-white text-slate-900 py-6 px-16 rounded-2xl font-black uppercase tracking-[0.3em] text-sm hover:scale-105 transition-transform shadow-2xl">Enter Editor</a>
                                </div>
                            </div>
                        `,
                        cover_image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200',
                        created_at: new Date().toISOString()
                    });
                } else if (slug === 'free-ai-background-remover-without-watermark') {
                    setPost({
                        id: '2',
                        title: 'Free AI Background Remover Without Watermark<br />(HD Quality) – RemovePro',
                        slug: 'free-ai-background-remover-without-watermark',
                        content: `
                            <div class="blog-content-wrapper">
                                <p class="text-xl leading-relaxed text-slate-600 dark:text-slate-400 mb-10 font-medium font-serif italic text-center">"Privacy is not a luxury; it's a standard."</p>

                                <p class="text-lg leading-relaxed mb-10">Stop paying $1.99 per credit just to get a high-quality background cutout. In the modern era of edge computing, you shouldn't have to upload your private data to a cloud server to perform a simple image task. <strong>RemovePro</strong> is the first 100% on-device tool that delivers studio quality without watermarks.</p>

                                <div class="blog-image-container my-16 text-center">
                                    <div class="inline-block relative p-1 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[3rem] shadow-2xl">
                                        <div class="relative overflow-hidden rounded-[2.9rem]">
                                            <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1200" alt="High Quality Tech Photography" loading="lazy" class="block m-0 hover:scale-105 transition-transform duration-500">
                                            <div class="absolute inset-0 bg-blue-600/5"></div>
                                        </div>
                                    </div>
                                    <p class="mt-8 text-slate-400 font-bold italic text-sm">Experience zero-lag, zero-cost, and zero-watermark processing.</p>
                                </div>

                                <h2 class="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mt-24 mb-10 tracking-tighter border-l-8 border-blue-600 pl-8">No Bait-and-Switch Logic</h2>
                                <p class="text-lg leading-relaxed mb-10">Most "free" tools force you to pay for high-resolution downloads or slap a logo across your final PNG. For professional designers and developers, this is a deal-breaker. We believe in providing full-resolution HD exports from the very first click.</p>

                                <div class="my-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-slate-50 dark:bg-slate-900 rounded-[4rem] p-12 border border-slate-100 dark:border-slate-800 shadow-xl">
                                    <div class="flex flex-col items-center">
                                        <div class="rounded-[2.5rem] overflow-hidden shadow-2xl scale-90 hover:scale-100 transition-transform duration-500">
                                            <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=1200" alt="Portrait Precision" class="max-w-full" />
                                        </div>
                                        <p class="mt-8 text-slate-400 font-bold italic text-xs uppercase tracking-widest">Pixel-perfect edge isolation</p>
                                    </div>
                                    <div class="flex flex-col justify-center">
                                        <h3 class="text-3xl font-black mb-6">Lossless Standards</h3>
                                        <p class="text-slate-600 dark:text-slate-400 text-lg font-medium leading-relaxed">We don't compress your images. Our AI processes the full resolution of your upload, ensuring fine textures and transparency are preserved for high-end print or web use.</p>
                                    </div>
                                </div>

                                <div class="mt-32 p-16 bg-blue-600 rounded-[4rem] text-center text-white shadow-3xl relative overflow-hidden">
                                     <div class="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-3xl rounded-full translate-x-32 -translate-y-32"></div>
                                    <h2 class="text-4xl md:text-6xl font-black text-white m-0 mb-8 leading-tight tracking-tighter uppercase">100% Free. 100% Pro.</h2>
                                    <p class="text-blue-100 text-xl mb-12 max-w-2xl mx-auto font-medium">No account required. No credits to buy. Just professional results instantly.</p>
                                    <a href="/" class="relative z-10 inline-block bg-white text-blue-600 py-6 px-16 rounded-2xl font-black uppercase tracking-[0.3em] text-sm hover:scale-105 transition-transform shadow-2xl">Start HD Processing</a>
                                </div>
                            </div>
                        `,
                        cover_image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1200',
                        created_at: new Date().toISOString()
                    });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    useEffect(() => {
        if (post) {
            document.title = post.title;
        }
    }, [post]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col pt-32">
                <Header setShowDashboard={(_show, view) => {
                    navigate('/', { state: { showDashboard: true, dashboardView: view || 'history' } });
                }} />
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
                <Header setShowDashboard={(_show, view) => {
                    navigate('/', { state: { showDashboard: true, dashboardView: view || 'history' } });
                }} />
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
        <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 relative z-10">
            <Header setShowDashboard={(_show, view) => {
                navigate('/', { state: { showDashboard: true, dashboardView: view || 'history' } });
            }} />

            <main className="pt-32 pb-20">
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="mb-12">
                        <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors font-bold uppercase tracking-widest text-xs">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Articles
                        </Link>
                    </nav>

                    <div className="space-y-8 mb-16 text-center">
                        <div className="flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <span className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-100 dark:bg-slate-900 rounded-full border border-slate-100 dark:border-slate-800">
                                <Calendar className="w-3 h-3 text-blue-600" />
                                {new Date(post.created_at).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-100 dark:bg-slate-900 rounded-full border border-slate-100 dark:border-slate-800">
                                <Clock className="w-3 h-3 text-amber-500" />
                                5 min read
                            </span>
                        </div>

                        <h1
                            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]"
                            dangerouslySetInnerHTML={{ __html: post.title }}
                        />
                    </div>

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

                    <div className="max-w-3xl mx-auto">
                        <div
                            className="prose prose-lg dark:prose-invert prose-slate max-w-none 
                                     prose-headings:font-black prose-headings:tracking-tight
                                     prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                                     prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed prose-p:mb-8
                                     prose-img:rounded-[2rem] prose-img:shadow-xl
                                     prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50/50 dark:prose-blockquote:bg-blue-900/10 prose-blockquote:p-8 prose-blockquote:rounded-r-3xl prose-blockquote:italic prose-blockquote:font-bold prose-blockquote:text-xl"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        <div className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex flex-col items-center gap-6">
                                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">Share This Article</p>
                                <div className="flex gap-4">
                                    {[
                                        { id: 'facebook', icon: Facebook, color: 'hover:bg-blue-600' },
                                        { id: 'twitter', icon: Twitter, color: 'hover:bg-slate-900' },
                                        { id: 'linkedin', icon: Linkedin, color: 'hover:bg-blue-700' },
                                        { id: 'generic', icon: Share2, color: 'hover:bg-blue-600' }
                                    ].map((item, i) => (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                const url = window.location.href;
                                                const title = post.title;
                                                let shareUrl = '';

                                                if (item.id === 'facebook') {
                                                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                                                } else if (item.id === 'twitter') {
                                                    shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                                                } else if (item.id === 'linkedin') {
                                                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                                                } else if (item.id === 'generic') {
                                                    if (navigator.share) {
                                                        navigator.share({ title, url }).catch(() => { });
                                                        return;
                                                    }
                                                    navigator.clipboard.writeText(url);
                                                    return;
                                                }

                                                if (shareUrl) {
                                                    window.open(shareUrl, '_blank', 'width=600,height=400');
                                                }
                                            }}
                                            className={`p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-400 ${item.color} hover:text-white transition-all transform hover:scale-110 border border-slate-100 dark:border-slate-800`}
                                        >
                                            <item.icon className="w-5 h-5" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto mt-20 pt-20 border-t border-slate-100 dark:border-slate-800">
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Comments</h3>

                                {/* Comment Input Box First */}
                                <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 relative group overflow-hidden">
                                    {showSuccess && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="absolute inset-0 bg-blue-600 flex items-center justify-center z-20"
                                        >
                                            <div className="flex items-center gap-3 text-white">
                                                <Sparkles className="w-6 h-6 animate-pulse" />
                                                <p className="font-black uppercase tracking-widest text-sm">Comment Posted Successfully!</p>
                                            </div>
                                        </motion.div>
                                    )}
                                    <textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Start writing your comment here"
                                        className="w-full h-32 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white font-medium placeholder:text-slate-400 resize-none"
                                    />
                                    <div className="flex justify-end mt-4">
                                        <button
                                            onClick={handlePostComment}
                                            disabled={isPosting || !newComment.trim()}
                                            className={`bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-[10px] px-8 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-blue-600/20 flex items-center gap-2 ${isPosting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {isPosting ? (
                                                <>
                                                    <Loader2 className="w-3 h-3 animate-spin" />
                                                    Posting...
                                                </>
                                            ) : (
                                                'Post Comment'
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Comments List Second */}
                                {comments.length === 0 ? (
                                    <div className="pt-6">
                                        <p className="text-slate-500 font-medium">No comments so far.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-8 pt-6">
                                        {comments.map((comment) => (
                                            <motion.div
                                                key={comment.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-white dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm"
                                            >
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xs">U</div>
                                                    <div>
                                                        <p className="text-slate-900 dark:text-white font-black text-sm">Guest User</p>
                                                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{comment.date}</p>
                                                    </div>
                                                </div>
                                                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{comment.text}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-32 pt-20 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-12">
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Related Articles</h3>
                            <Link to="/blog" className="text-blue-600 font-bold hover:underline flex items-center gap-2 text-sm">
                                View all <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                {
                                    id: '1',
                                    title: 'How to Remove Background Like a Pro',
                                    slug: 'remove-background-like-pro',
                                    excerpt: 'Master the art of pixel-perfect cutouts with these professional editing tips and advanced workflows.',
                                    cover_image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200'
                                },
                                {
                                    id: '2',
                                    title: 'Best Free Alternative to Remove.bg',
                                    slug: 'best-free-remove-bg-alternative',
                                    excerpt: 'Stop paying for background removals. Discover why RemovePro is the ultimate credit-free alternative.',
                                    cover_image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1200'
                                },
                                {
                                    id: '3',
                                    title: 'Background Removal on Mobile',
                                    slug: 'how-to-remove-background-on-mobile',
                                    excerpt: 'Learn how to remove backgrounds instantly on your mobile phone without downloading any clunky apps.',
                                    cover_image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200'
                                },
                                {
                                    id: '4',
                                    title: 'Amazon Product Photography Guide',
                                    slug: 'how-to-remove-background-for-amazon-product-photos',
                                    excerpt: 'Master Amazon standards. Create pure white #FFFFFF backgrounds that skyrocket your conversion rates.',
                                    cover_image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200'
                                }
                            ].filter(p => p.slug !== post.slug).slice(0, 2).map((relatedPost) => (
                                <motion.div
                                    key={relatedPost.id}
                                    whileHover={{ y: -10 }}
                                    className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-300 group"
                                >
                                    <Link to={`/blog/${relatedPost.slug}`} className="block relative h-48 overflow-hidden">
                                        <img
                                            src={relatedPost.cover_image}
                                            alt={relatedPost.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </Link>
                                    <div className="p-6 space-y-3">
                                        <Link to={`/blog/${relatedPost.slug}`}>
                                            <h4 className="text-xl font-black text-slate-900 dark:text-white leading-tight hover:text-blue-600 transition-colors line-clamp-2">
                                                {relatedPost.title}
                                            </h4>
                                        </Link>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium line-clamp-2">
                                            {relatedPost.excerpt}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-20 p-10 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 text-center md:text-left relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-blue-600/10 transition-colors" />

                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 flex flex-col items-center justify-center text-white shadow-2xl shadow-blue-500/20 relative">
                            <Layers className="w-10 h-10 mb-1" />
                            <div className="flex items-center gap-1">
                                <span className="text-[10px] font-black tracking-tighter uppercase italic">Remove</span>
                                <Sparkles className="w-2 h-2 text-amber-400 fill-amber-400" />
                            </div>
                        </div>

                        <div className="space-y-4 flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Editorial Team @ RemovePro</h4>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
                                Our editorial team consists of expert photographers and AI researchers dedicated to making professional-grade image editing accessible to everyone. We research and test the latest machine learning models to ensure that <a href="/" className="font-bold text-blue-600 hover:underline">RemovePro</a> remains the world's fastest and most accurate background remover.
                            </p>
                        </div>
                    </div>
                </article >
            </main >

            <Footer />
        </div >
    );
};
