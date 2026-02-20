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
                        title: 'How to Remove Background for Amazon Product Photos<br />(Step-by-Step Guide)',
                        slug: 'how-to-remove-background-for-amazon-product-photos',
                        content: `
                            <article>
                                <div class="blog-content-wrapper">
                                    <p class="text-xl leading-relaxed text-slate-600 dark:text-slate-400 mb-10 font-medium">Selling on Amazon is one of the fastest ways to grow an e-commerce business, but it comes with a strict set of rules. One of the most important rules is the <strong>"Main Image"</strong> requirement. If you want to list a product, your primary image must have a pure white background. This isn't just a suggestion; it is a requirement that can make or break your success.</p>
                                    
                                    <p class="text-lg leading-relaxed mb-10">When you <strong>remove background for Amazon product photos</strong>, you are doing more than just following rules—you are optimizing your listing for sales. Statistics show that high-quality images with clean backgrounds can increase conversion rates by up to 30%.</p>

                                    <div class="blog-image-container my-16 text-center">
                                        <div class="inline-block relative p-1 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[2.5rem] shadow-2xl">
                                            <img src="/blog/best-removebg-alternative-before-after.webp" alt="Amazon product photo before and after background removal comparison" loading="lazy" width="800" height="500" class="rounded-[2.4rem] block m-0">
                                        </div>
                                        <p class="mt-6 text-slate-400 font-bold italic text-sm">Professional clarity: Before and After background removal</p>
                                    </div>

                                    <h2 class="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-20 mb-8 border-l-8 border-blue-600 pl-6">Why Amazon Requires a Pure White Background</h2>
                                    <p>Amazon’s philosophy is simple: <strong>clarity leads to sales</strong>. By mandating a pure white background (RGB 255, 255, 255 or Hex #FFFFFF), Amazon creates a consistent and clean shopping experience across its entire platform.</p>
                                    
                                    <p>Using a white background also reduces "visual noise." In mobile shopping, where screens are small, a busy background makes it difficult for customers to see details. By choosing to <strong>remove background for Amazon product photos</strong>, you ensure that your product "pops" on the screen.</p>

                                    <div class="bg-slate-900 text-white p-10 rounded-[3rem] my-16 shadow-2xl relative overflow-hidden">
                                        <div class="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full translate-x-10 -translate-y-10"></div>
                                        <h2 class="text-2xl font-black mb-8 text-white mt-0 flex items-center gap-3">
                                            <span class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm">!</span>
                                            Technical Requirements Checklist
                                        </h2>
                                        <ul class="grid grid-cols-1 md:grid-cols-2 gap-6 p-0 list-none m-0">
                                            <li class="flex items-start gap-3 m-0 text-slate-300">
                                                <span class="text-blue-500 font-black mt-1">✓</span>
                                                <span><strong>Pure White Background:</strong> Pure RGB 255, 255, 255 or #FFFFFF.</span>
                                            </li>
                                            <li class="flex items-start gap-3 m-0 text-slate-300">
                                                <span class="text-blue-500 font-black mt-1">✓</span>
                                                <span><strong>85% Coverage:</strong> Product must fill at least 85% of the frame.</span>
                                            </li>
                                            <li class="flex items-start gap-3 m-0 text-slate-300">
                                                <span class="text-blue-500 font-black mt-1">✓</span>
                                                <span><strong>No Watermarks:</strong> Absolutely no text or logos added.</span>
                                            </li>
                                            <li class="flex items-start gap-3 m-0 text-slate-300">
                                                <span class="text-blue-500 font-black mt-1">✓</span>
                                                <span><strong>Sharp Edges:</strong> No pixelation or rough cutouts.</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <h2 class="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-24 mb-10 border-l-8 border-blue-600 pl-6">Step-by-Step Guide for Sellers</h2>
                                    <p>Achieving studio-quality results doesn't require an expensive studio. Follow this professional workflow to prepare your catalog.</p>

                                    <div class="space-y-20 my-20">
                                        <div class="group">
                                            <h3 class="text-2xl font-black mb-6 text-blue-600 flex items-center gap-3">
                                                <span class="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center text-lg">1</span>
                                                Upload Your Product Image
                                            </h3>
                                            <p class="mb-8">Start by taking a clear photo with good lighting. Simply drag and drop it into the Remove Pro upload zone. Our system handles high-resolution files instantly.</p>
                                            <img src="/blog/ai-background-remover-upload-interface.webp" alt="Uploading a product photo" class="rounded-[2.5rem] shadow-xl border border-slate-100 group-hover:scale-[1.01] transition-transform duration-500" />
                                        </div>

                                        <div class="group">
                                            <h3 class="text-2xl font-black mb-6 text-blue-600 flex items-center gap-3">
                                                <span class="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center text-lg">2</span>
                                                AI Analysis & Background Removal
                                            </h3>
                                            <p class="mb-8">Our neural network analyzes your product to distinguish fine details. This process happens locally in your browser for 100% privacy and speed.</p>
                                            <img src="/blog/ai-processing-step.webp" alt="AI processing step" class="rounded-[2.5rem] shadow-xl border border-slate-100 group-hover:scale-[1.01] transition-transform duration-500" />
                                        </div>

                                        <div class="group">
                                            <h3 class="text-2xl font-black mb-6 text-blue-600 flex items-center gap-3">
                                                <span class="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center text-lg">3</span>
                                                Instant HD Export
                                            </h3>
                                            <p class="mb-8">Download your high-definition transparent PNG. Check the precision zoom preview to ensure every edge is crisp and professional.</p>
                                            <img src="/blog/download-png-step.webp" alt="Download HD PNG step" class="rounded-[2.5rem] shadow-xl border border-slate-100 group-hover:scale-[1.01] transition-transform duration-500" />
                                        </div>

                                        <div class="group">
                                            <h3 class="text-2xl font-black mb-6 text-blue-600 flex items-center gap-3">
                                                <span class="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center text-lg">4</span>
                                                Set Pure White Background
                                            </h3>
                                            <p class="mb-8">Use our built-in background tool to set a pure #FFFFFF background. Export as a high-quality JPG, and you're ready to upload to Seller Central.</p>
                                            <img src="/blog/free-ai-background-remover-before-after.webp" alt="Final Amazon ready image" class="rounded-[2.5rem] shadow-xl border border-slate-100 group-hover:scale-[1.01] transition-transform duration-500" />
                                        </div>
                                    </div>

                                    <h2 class="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-24 mb-10 border-l-8 border-blue-600 pl-6">Professional FAQs</h2>
                                    <div class="grid grid-cols-1 gap-6 my-12">
                                        <div class="p-8 bg-blue-50/50 dark:bg-slate-900 rounded-[2.5rem] border border-blue-100 dark:border-slate-800 shadow-sm">
                                            <h4 class="text-xl font-black mb-3 text-slate-900 dark:text-white m-0">1. Can I use a background that is almost white?</h4>
                                            <p class="text-slate-600 dark:text-slate-400 m-0">No. Amazon specifically requires <strong>pure white (RGB 255, 255, 255)</strong>. Even a slight off-white can lead to listing suppression.</p>
                                        </div>
                                        <div class="p-8 bg-blue-50/50 dark:bg-slate-900 rounded-[2.5rem] border border-blue-100 dark:border-slate-800 shadow-sm">
                                            <h4 class="text-xl font-black mb-3 text-slate-900 dark:text-white m-0">2. Does Remove Pro reduce photo quality?</h4>
                                            <p class="text-slate-600 dark:text-slate-400 m-0">No. We maintain the original resolution of your file. We offer <strong>free HD downloads</strong> specifically to support small businesses.</p>
                                        </div>
                                        <div class="p-8 bg-blue-50/50 dark:bg-slate-900 rounded-[2.5rem] border border-blue-100 dark:border-slate-800 shadow-sm">
                                            <h4 class="text-xl font-black mb-3 text-slate-900 dark:text-white m-0">3. Is no-signup really true?</h4>
                                            <p class="text-slate-600 dark:text-slate-400 m-0">Yes. You can start editing immediately. We believe in removing barriers for e-commerce entrepreneurs.</p>
                                        </div>
                                        <div class="p-8 bg-blue-50/50 dark:bg-slate-900 rounded-[2.5rem] border border-blue-100 dark:border-slate-800 shadow-sm">
                                            <h4 class="text-xl font-black mb-3 text-slate-900 dark:text-white m-0">4. Can I bulk-process photos?</h4>
                                            <p class="text-slate-600 dark:text-slate-400 m-0">Absolutely. Use our multi-upload feature to process dozens of items in seconds, saving hours of manual work.</p>
                                        </div>
                                        <div class="p-8 bg-blue-50/50 dark:bg-slate-900 rounded-[2.5rem] border border-blue-100 dark:border-slate-800 shadow-sm">
                                            <h4 class="text-xl font-black mb-3 text-slate-900 dark:text-white m-0">5. Is this suitable for Shopify too?</h4>
                                            <p class="text-slate-600 dark:text-slate-400 m-0">Yes. While optimized for Amazon, these high-quality cutouts are perfect for Shopify, Etsy, and eBay.</p>
                                        </div>
                                    </div>

                                    <div class="mt-24 p-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3.5rem] text-center text-white shadow-2xl">
                                        <h2 class="text-3xl md:text-5xl font-black text-white m-0 mb-6 leading-tight">Ready to boost your Amazon sales?</h2>
                                        <p class="text-blue-100 text-lg mb-10 max-w-xl mx-auto font-medium">Get your professional white-background product shots in seconds for free.</p>
                                        <a href="/" class="inline-block bg-white text-blue-600 py-5 px-12 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:scale-105 transition-transform no-underline shadow-2xl">Start Editing Now</a>
                                    </div>

                                    <div class="mt-12 text-center">
                                        <p class="text-slate-400 font-bold">Explore more guides in our <a href="/blog" class="text-blue-600 no-underline">Blog Section</a></p>
                                    </div>
                                </div>
                            `,
                        cover_image: '/blog/nike-shoe-background-removal.webp',
                        created_at: new Date().toISOString()
                    });
                } else if (slug === 'how-to-remove-background-on-mobile') {
                    setPost({
                        id: '4',
                        title: 'How to Remove Background from Image on Mobile<br />(Free & No App Required)',
                        slug: 'how-to-remove-background-on-mobile',
                        content: `
                            <div class="blog-content-wrapper">
                                <p class="text-xl leading-relaxed text-slate-600 dark:text-slate-400 mb-10 font-medium">In 2026, your smartphone is more powerful than the desktop computers of a decade ago. Yet, when it comes to simple tasks like removing a background, most users still flock to "Free" apps that are cluttered with ads, limited by low-resolution exports, or worse—require monthly subscriptions.</p>
                                
                                <p class="text-lg leading-relaxed mb-10">We believe you shouldn't have to install a "Background Remover App" every time you want to edit a photo. In this guide, we'll show you how to use <strong>RemovePro's local AI</strong> to get professional, high-definition cutouts directly in your mobile browser with zero installs.</p>

                                <div class="blog-image-container my-16 text-center">
                                    <div class="inline-block relative p-1 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-[2.5rem] shadow-2xl">
                                        <img src="/blog/remove-background-on-your-phone-free-ai-tool.webp" alt="Professional mobile background removal demo" loading="lazy" width="800" height="500" class="rounded-[2.4rem] block m-0">
                                    </div>
                                    <p class="mt-6 text-slate-400 font-bold italic text-sm">Perfect results on any mobile device, instantly.</p>
                                </div>

                                <h2 class="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-20 mb-8 border-l-8 border-orange-500 pl-6">The App Trap: Why Browser-Based AI is Better</h2>
                                <p>Most "Free" apps on the App Store or Play Store follow a predictable pattern: they offer a free download but charge "credits" for high-resolution images. They also often upload your private photos to their servers for processing, which is a significant privacy risk.</p>
                                
                                <p><strong>RemovePro</strong> is different. It uses <strong>WebAssembly</strong> to run the neural network directly in your phone's browser RAM. This means your photos never leave your device, the processing is instant, and the quality is 100% original resolution.</p>

                                <div class="bg-indigo-900 text-white p-10 rounded-[3rem] my-16 shadow-2xl relative overflow-hidden text-left">
                                    <div class="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-3xl rounded-full translate-x-10 -translate-y-10"></div>
                                    <h2 class="text-2xl font-black mb-8 text-white mt-0 flex items-center gap-3">
                                        <span class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-sm">!</span>
                                        Why Browser AI Wins
                                    </h2>
                                    <ul class="grid grid-cols-1 md:grid-cols-2 gap-6 p-0 list-none m-0">
                                        <li class="flex items-start gap-3 m-0 text-indigo-100">
                                            <span class="text-orange-500 font-black mt-1">✓</span>
                                            <span><strong>Zero Storage:</strong> No need to delete photos to make room for apps.</span>
                                        </li>
                                        <li class="flex items-start gap-3 m-0 text-indigo-100">
                                            <span class="text-orange-500 font-black mt-1">✓</span>
                                            <span><strong>Total Privacy:</strong> Your data stays on your phone. period.</span>
                                        </li>
                                        <li class="flex items-start gap-3 m-0 text-indigo-100">
                                            <span class="text-orange-500 font-black mt-1">✓</span>
                                            <span><strong>Unlimited HD:</strong> No "Credits" required for your high-res shots.</span>
                                        </li>
                                        <li class="flex items-start gap-3 m-0 text-indigo-100">
                                            <span class="text-orange-500 font-black mt-1">✓</span>
                                            <span><strong>Instant Speed:</strong> No waiting for server uploads or queues.</span>
                                        </li>
                                    </ul>
                                </div>

                                <h2 class="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-24 mb-10 border-l-8 border-orange-500 pl-6">Step-by-Step Mobile Workflow</h2>
                                
                                <div class="space-y-20 my-20">
                                    <div class="group">
                                        <h3 class="text-2xl font-black mb-6 text-orange-600 flex items-center gap-3">
                                            <span class="w-10 h-10 bg-orange-600 text-white rounded-xl flex items-center justify-center text-lg">1</span>
                                            Pick Your Photo
                                        </h3>
                                        <p class="mb-8 font-medium text-slate-600 dark:text-slate-400">Open <a href="/" class="text-orange-600">RemovePro.com</a> in Safari, Chrome, or your default mobile browser. Tap the "Upload" button and select a photo from your library or take a new one.</p>
                                        <img src="/blog/mobile-background-remover-upload-screen.webp" alt="Mobile upload step" class="rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800" />
                                    </div>

                                    <div class="group">
                                        <h3 class="text-2xl font-black mb-6 text-orange-600 flex items-center gap-3">
                                            <span class="w-10 h-10 bg-orange-600 text-white rounded-xl flex items-center justify-center text-lg">2</span>
                                            AI Processing (On-Device)
                                        </h3>
                                        <p class="mb-8 font-medium text-slate-600 dark:text-slate-400">The AI will automatically identify the subject. You'll see a progress bar indicating the local neural network is working its magic.</p>
                                        <img src="/blog/mobile-background-remover-cutout-refinement.webp" alt="Mobile AI processing" class="rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800" />
                                    </div>

                                    <div class="group">
                                        <h3 class="text-2xl font-black mb-6 text-orange-600 flex items-center gap-3">
                                            <span class="w-10 h-10 bg-orange-600 text-white rounded-xl flex items-center justify-center text-lg">3</span>
                                            Review & Download
                                        </h3>
                                        <p class="mb-8 font-medium text-slate-600 dark:text-slate-400">Once finished, use the zoom tool to inspect the fine edges. If it looks perfect, tap "Download HD" to save the transparent PNG directly to your Files or Photos app.</p>
                                        <img src="/blog/mobile-ai-background-remover-zoom-precision.webp" alt="Mobile HD review" class="rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800" />
                                    </div>
                                </div>

                                <h2 class="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-24 mb-10 border-l-8 border-orange-500 pl-6">Mobile FAQ</h2>
                                <div class="grid grid-cols-1 gap-6 my-12 text-left">
                                    <div class="p-8 bg-orange-50/50 dark:bg-slate-900 rounded-[2.5rem] border border-orange-100 dark:border-slate-800 shadow-sm">
                                        <h4 class="text-xl font-black mb-3 text-slate-900 dark:text-white m-0">1. Is it really free on mobile?</h4>
                                        <p class="text-slate-600 dark:text-slate-400 m-0">Yes! RemovePro is completely free. We don't have credits, subscriptions, or hidden costs for HD downloads.</p>
                                    </div>
                                    <div class="p-8 bg-orange-50/50 dark:bg-slate-900 rounded-[2.5rem] border border-orange-100 dark:border-slate-800 shadow-sm">
                                        <h4 class="text-xl font-black mb-3 text-slate-900 dark:text-white m-0">2. Do I need to install any app?</h4>
                                        <p class="text-slate-600 dark:text-slate-400 m-0">No. Simply visit our website in your mobile browser. It works just like an app but without the storage footprint.</p>
                                    </div>
                                    <div class="p-8 bg-orange-50/50 dark:bg-slate-900 rounded-[2.5rem] border border-orange-100 dark:border-slate-800 shadow-sm">
                                        <h4 class="text-xl font-black mb-3 text-slate-900 dark:text-white m-0">3. Will my image be uploaded to your server?</h4>
                                        <p class="text-slate-600 dark:text-slate-400 m-0">No. Unlike other tools, RemovePro uses local AI. Your photo never leaves your phone, ensuring 100% data privacy.</p>
                                    </div>
                                </div>

                                <div class="mt-24 p-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-[3.5rem] text-center text-white shadow-2xl">
                                    <h2 class="text-3xl md:text-5xl font-black text-white m-0 mb-6 leading-tight uppercase">Edit on the Go. Free.</h2>
                                    <p class="text-orange-100 text-lg mb-10 max-w-xl mx-auto font-medium">Professional background removal is now a browser tab away. Try it now.</p>
                                    <a href="/" class="inline-block bg-white text-orange-600 py-5 px-12 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:scale-105 transition-transform no-underline shadow-2xl">Remove Background Now</a>
                                </div>
                            </div>
                        `,
                        cover_image: '/blog/remove-background-on-your-phone-free-ai-tool.webp',
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
                                
                                <p class="text-lg leading-relaxed mb-10">It’s frustrating, expensive, and frankly, unnecessary. In this 2026 review, we analyze why <strong>RemovePro</strong> is objectively the <strong>best free Remove.bg alternative</strong> for professional creators. We analyze the hidden costs of traditional tools and why on-device AI is the future.</p>

                                <div class="blog-image-container my-16 text-center">
                                    <div class="inline-block relative p-1 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-[2.5rem] shadow-2xl">
                                        <img src="/blog/ai-background-remover-upload-interface.webp" alt="RemovePro Clean & Simple Upload Interface" loading="lazy" width="800" height="500" class="rounded-[2.4rem] block m-0">
                                    </div>
                                    <p class="mt-6 text-slate-400 font-bold italic text-sm">Clean, professional, and zero cost: The RemovePro Dashboard.</p>
                                </div>

                                <h2 class="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-20 mb-8 border-l-8 border-green-500 pl-6">The 'Hidden Costs' of Traditional Tools</h2>
                                <p>While Remove.bg was the pioneer of AI suppression, its business model has become a barrier for small businesses. If you're processing 50+ images a month, you could be spending $40 USD or more just to remove backgrounds.</p>
                                
                                <div class="overflow-x-auto my-12 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-xl text-left bg-white dark:bg-slate-900">
                                    <table class="w-full text-left border-collapse">
                                         <thead>
                                            <tr class="bg-slate-50 dark:bg-slate-800/50">
                                                <th class="p-8 font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800">Metric</th>
                                                <th class="p-8 font-black text-green-600 border-b border-slate-100 dark:border-slate-800">RemovePro (Winner)</th>
                                                <th class="p-8 font-black text-slate-400 border-b border-slate-100 dark:border-slate-800">Remove.bg</th>
                                            </tr>
                                        </thead>
                                        <tbody class="text-slate-600 dark:text-slate-400 font-medium">
                                            <tr>
                                                <td class="p-8 border-b border-slate-50 dark:border-slate-800 font-bold">HD Download Cost</td>
                                                <td class="p-8 border-b border-slate-50 dark:border-slate-800 text-green-600 font-black">$0 (Unlimited)</td>
                                                <td class="p-8 border-b border-slate-50 dark:border-slate-800">~$1.00 USD / image</td>
                                            </tr>
                                            <tr>
                                                <td class="p-8 border-b border-slate-50 dark:border-slate-800 font-bold">Registration</td>
                                                <td class="p-8 border-b border-slate-50 dark:border-slate-800 text-green-600 font-black">Not Required</td>
                                                <td class="p-8 border-b border-slate-50 dark:border-slate-800">Mandatory for HD</td>
                                            </tr>
                                            <tr>
                                                <td class="p-8 border-b border-slate-50 dark:border-slate-800 font-bold">Data Privacy</td>
                                                <td class="p-8 border-b border-slate-50 dark:border-slate-800 text-green-600 font-black">100% On-Device</td>
                                                <td class="p-8 border-b border-slate-50 dark:border-slate-800">Server Uploads</td>
                                            </tr>
                                            <tr>
                                                <td class="p-8 border-b border-slate-50 dark:border-slate-800 font-bold">Watermark</td>
                                                <td class="p-8 border-b border-slate-50 dark:border-slate-800 text-green-600 font-black">Strictly None</td>
                                                <td class="p-8 border-b border-slate-50 dark:border-slate-800">On all "Free" previews</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <h2 class="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-24 mb-10 border-l-8 border-green-500 pl-6">Why RemovePro is the Professional's Choice</h2>
                                <p>Most browsers now support high-performance computing through <strong>WASM</strong>. RemovePro leverages this to run the neural network directly on your computer's GPU. This isn't just a "free tool"—it's a technical breakthrough that eliminates the need for expensive server farms.</p>
                                
                                <blockquote class="my-16 p-10 bg-green-50/50 dark:bg-emerald-900/10 border-l-8 border-green-500 rounded-r-[3rem] italic text-2xl font-medium text-slate-700 dark:text-slate-300">
                                    "The best tools don't ask for your credit card or your email; they just solve the problem. RemovePro is the first background remover that respects both your wallet and your privacy."
                                </blockquote>

                                <div class="blog-image-container my-16 text-center">
                                    <div class="inline-block relative p-1 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-[2.5rem] shadow-2xl">
                                        <img src="/blog/ai-background-remover-pro-editor-zoom.webp" alt="High-Definition Zoom & Pixel Perfect Refinement" loading="lazy" width="800" height="500" class="rounded-[2.4rem] block m-0">
                                    </div>
                                    <p class="mt-6 text-slate-400 font-bold italic text-sm">Pixel-perfect precision without the premium price tag.</p>
                                </div>

                                <h2 class="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-24 mb-10 border-l-8 border-green-500 pl-6">Real-World Testing: Accuracy vs. Price</h2>
                                <p>In our tests with complex subjects like flowing hair and semi-transparent fabrics, RemovePro's **local AI model** matched the accuracy of cloud engines. The difference? You don't have to wait for large files to upload to a remote server. Everything happens instantly in RAM.</p>

                                <div class="mt-24 p-12 bg-gradient-to-br from-green-600 to-emerald-700 rounded-[3.5rem] text-center text-white shadow-2xl">
                                    <h2 class="text-3xl md:text-5xl font-black text-white m-0 mb-6 leading-tight uppercase">Stop Paying for Backgrounds</h2>
                                    <p class="text-green-100 text-lg mb-10 max-w-xl mx-auto font-medium">Join thousands of creators switching to the best free alternative. No signup. No catch.</p>
                                    <a href="/" class="inline-block bg-white text-green-600 py-5 px-12 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:scale-105 transition-transform no-underline shadow-2xl">Reclaim Your Budget</a>
                                </div>
                            </div>
                        `,
                        cover_image: '/blog/nike-shoe-background-removal.webp',
                        created_at: new Date().toISOString()
                    });
                } else if (slug === 'remove-background-like-pro') {
                    setPost({
                        id: '1',
                        title: 'How to Remove Background Like a Pro (Pro Tips)',
                        slug: 'remove-background-like-pro',
                        content: `
                            <div class="blog-content-wrapper">
                                <p class="text-xl leading-relaxed text-slate-600 dark:text-slate-400 mb-10 font-medium">Achieving a pixel-perfect cutout isn't just about the AI—it's about the workflow. While our <strong>AI background remover</strong> handles 99% of the work, these pro tips will help you handle complex hair and tough shadows like a seasoned editor.</p>
                                
                                <h2 class="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-16 mb-8 border-l-8 border-blue-900 pl-6">1. Lighting and Contrast Matter</h2>
                                <p class="text-lg leading-relaxed mb-8">AI models work best when there is high contrast between the subject and the background. If you're shooting product photos, try to avoid "tangential" lighting that makes the edges of the object blend into the backdrop.</p>

                                <div class="blog-image-container my-16 text-center">
                                    <div class="inline-block relative p-1 bg-gradient-to-tr from-blue-900 to-indigo-900 rounded-[2.5rem] shadow-2xl">
                                        <img src="/blog/ai-background-remover-pro-editor-zoom.webp" alt="High-Definition Zoom & Pixel Perfect Refinement" loading="lazy" width="800" height="500" class="rounded-[2.4rem] block m-0">
                                    </div>
                                    <p class="mt-6 text-slate-400 font-bold italic text-sm">Professional editors use 400% zoom to ensure edge perfection.</p>
                                </div>

                                <h2 class="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-24 mb-10 border-l-8 border-blue-900 pl-6">2. Use the Manual Refinement Tool</h2>
                                <p class="text-lg leading-relaxed mb-8">For subjects with flowing hair or complex patterns, the <strong>RemovePro manual editor</strong> is your best friend. Zoom in to 400% to inspect the mask and use the 'Restore' brush to bring back fine details that the AI might have over-trimmed.</p>

                                <div class="my-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div class="p-10 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800">
                                        <div class="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl mb-6 shadow-lg shadow-blue-500/20">A</div>
                                        <h3 class="text-xl font-black mb-4">Focus on Hair</h3>
                                        <p class="text-slate-600 dark:text-slate-400 mb-0">Use the soft brush to blend the edges of hair. This prevents the "helmet" look and keeps the cutout feeling natural.</p>
                                    </div>
                                    <div class="p-10 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800">
                                        <div class="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl mb-6 shadow-lg shadow-indigo-500/20">B</div>
                                        <h3 class="text-xl font-black mb-4">Shadow Recovery</h3>
                                        <p class="text-slate-600 dark:text-slate-400 mb-0">Don't delete the natural contact shadow. Use the erase tool with low opacity to keep a hint of the original grounding.</p>
                                    </div>
                                </div>

                                <h2 class="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-24 mb-10 border-l-8 border-blue-900 pl-6">3. Match Your New Background</h2>
                                <p class="text-lg leading-relaxed mb-8">When placing your subject on a new background, remember to match the lighting. If your cutout was shot in soft light but your new background has harsh sun, it won't look "realistic". Use our brightness and contrast tools to bridge the gap.</p>

                                <div class="mt-24 p-12 bg-slate-900 rounded-[3.5rem] text-center text-white shadow-3xl border border-slate-800">
                                    <h2 class="text-3xl md:text-5xl font-black text-white m-0 mb-6 leading-tight uppercase">Ready to go Pro?</h2>
                                    <p class="text-slate-400 text-lg mb-10 max-w-xl mx-auto font-medium">Use our advanced dashbord for bulk processing and pixel-perfect results.</p>
                                    <a href="/" class="inline-block bg-blue-600 text-white py-5 px-12 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:scale-105 transition-transform no-underline">Open Pro Editor</a>
                                </div>
                            </div>
                        `,
                        cover_image: '/blog/ai-background-remover-pro-editor-zoom.webp',
                        created_at: new Date().toISOString()
                    });
                } else if (slug === 'free-ai-background-remover-without-watermark') {
                    setPost({
                        id: '2',
                        title: 'Free AI Background Remover Without Watermark<br />(HD Quality) – RemovePro',
                        slug: 'free-ai-background-remover-without-watermark',
                        content: `
                            <div class="blog-content-wrapper">
                                <div class="mb-12 text-center">
                                    <p class="text-blue-600 font-black uppercase tracking-[0.2em] text-xs mb-4">Ultimate Technical Guide (2026)</p>
                                    <p class="text-slate-400 font-bold text-sm">Professional Grade • 100% On-Device • No Watermark</p>
                                </div>

                                <p class="text-xl leading-relaxed text-slate-600 dark:text-slate-400 mb-10 font-medium">Stop paying $1.99 per credit just to get a high-quality background cutout. In the modern era of edge computing, you shouldn't have to upload your private data to a cloud server to perform a simple image task.</p>

                                <div class="blog-image-container my-16 text-center">
                                    <div class="inline-block relative p-1 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[2.5rem] shadow-2xl">
                                        <img src="/blog/ai-background-remover-upload-interface.webp" alt="RemovePro AI background removal dashboard interface" loading="lazy" width="800" height="500" class="rounded-[2.4rem] block m-0">
                                    </div>
                                    <p class="mt-6 text-slate-400 font-bold italic text-sm">Efficient, private, and 100% watermark-free processing.</p>
                                </div>

                                <h2 class="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-24 mb-10 border-l-8 border-blue-600 pl-6">Why "No Watermark" Matters for Professionals</h2>
                                <p class="text-lg leading-relaxed mb-8">Most "free" background removal services follow a bait-and-switch pattern. They allow you to remove the background but force you to pay for a high-resolution download or slap a large logo across your final PNG. For professional designers, e-commerce sellers, and developers, this is a major blocker.</p>

                                <div class="my-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-slate-50 dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-100 dark:border-slate-800">
                                    <div class="flex flex-col items-center">
                                        <img src="/blog/best-removebg-alternative-before-after.webp" alt="HD background removal output quality comparison" class="rounded-[2rem] shadow-xl max-w-[280px]" />
                                        <p class="mt-6 text-slate-400 font-bold italic text-xs">Pixel-perfect edges on every export.</p>
                                    </div>
                                    <div class="flex flex-col justify-center">
                                        <h3 class="text-2xl font-black mb-4">Lossless Standards</h3>
                                        <p class="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">We don't compress your images. Our AI processes the full resolution of your upload, ensuring fine details like hair and transparency are preserved.</p>
                                    </div>
                                </div>

                                <h2 class="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-24 mb-10 border-l-8 border-blue-600 pl-6">The Power of On-Device AI</h2>
                                <p class="text-lg leading-relaxed mb-8">Unlike traditional background removers that act as a "black box" on a remote server, RemovePro runs locally. This ensures your photos are never sent to a server. What happens in your browser, stays in your browser.</p>

                                <div class="overflow-x-auto my-12 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-xl bg-white dark:bg-slate-900">
                                    <table class="w-full text-left border-collapse">
                                         <thead>
                                            <tr class="bg-slate-50 dark:bg-slate-800/50">
                                                <th class="p-8 font-black text-slate-900 dark:text-white">Metric</th>
                                                <th class="p-8 font-black text-blue-600">RemovePro</th>
                                                <th class="p-8 font-black text-slate-400">Paid Rivals</th>
                                            </tr>
                                        </thead>
                                        <tbody class="text-slate-600 dark:text-slate-400 font-medium">
                                            <tr>
                                                <td class="p-8 border-b border-slate-50 dark:border-slate-800 font-bold">Price per HD View</td>
                                                <td class="p-8 border-b border-slate-50 dark:border-slate-800 text-green-600 font-black">$0 (Unlimited)</td>
                                                <td class="p-8 border-b border-slate-50 dark:border-slate-800">$1.00 - $2.50</td>
                                            </tr>
                                            <tr>
                                                <td class="p-8 border-b border-slate-50 dark:border-slate-800 font-bold">Privacy Layer</td>
                                                <td class="p-8 border-b border-slate-50 dark:border-slate-800 text-green-600 font-black">On-Device (Local)</td>
                                                <td class="p-8 border-b border-slate-50 dark:border-slate-800">Cloud Storage</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <h2 class="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-24 mb-10 border-l-8 border-blue-600 pl-6">Frequently Asked Questions</h2>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                                    <div class="p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 shadow-xl">
                                        <h4 class="text-xl font-black mb-4">Is it really unlimited?</h4>
                                        <p class="text-slate-600 dark:text-slate-400 mb-0 font-medium">Yes. Unlike other tools that charge credits for HD downloads, RemovePro offers unlimited high-resolution exports for free.</p>
                                    </div>
                                    <div class="p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 shadow-xl">
                                        <h4 class="text-xl font-black mb-4">Are there watermarks?</h4>
                                        <p class="text-slate-600 dark:text-slate-400 mb-0 font-medium">No. Every image processed through RemovePro is free of watermarks, even in the highest quality setting.</p>
                                    </div>
                                </div>

                                <div class="mt-24 p-12 bg-blue-600 rounded-[3.5rem] text-center text-white shadow-2xl">
                                    <h2 class="text-3xl md:text-5xl font-black text-white m-0 mb-6 leading-tight uppercase">REMOVE BACKGROUND – 100% FREE</h2>
                                    <p class="text-blue-100 text-lg mb-10 max-w-xl mx-auto font-medium">Pro-Level Speed. Zero Costs. Total Privacy. No account needed.</p>
                                    <a href="/" class="inline-block bg-white text-blue-600 py-5 px-12 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:scale-105 transition-transform no-underline">Start Editing Now</a>
                                </div>
                            </div>
                        `,
                        cover_image: '/blog/ai-background-remover-upload-interface.webp',
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
                                    id: 'hub',
                                    title: post.slug === 'how-to-remove-background-on-mobile' ? 'Best Free Remove.bg Alternative' : 'How to Remove Background from Image on Mobile',
                                    slug: post.slug === 'how-to-remove-background-on-mobile' ? 'best-free-remove-bg-alternative' : 'how-to-remove-background-on-mobile',
                                    excerpt: post.slug === 'how-to-remove-background-on-mobile' ? 'Discover why RemovePro is the best credit-free alternative to Remove.bg.' : 'Learn how to remove backgrounds instantly on your mobile phone without downloading any app.',
                                    cover_image: post.slug === 'how-to-remove-background-on-mobile' ? '/blog/nike-shoe-background-removal.webp' : '/blog/remove-background-on-your-phone-free-ai-tool.webp'
                                }
                            ].map((relatedPost) => (
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
