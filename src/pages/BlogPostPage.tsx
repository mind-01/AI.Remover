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
                        title: 'How to Remove Background for Amazon Product Photos (2026 Seller Guide)',
                        slug: 'how-to-remove-background-for-amazon-product-photos',
                        content: `
                            <div class="blog-content-wrapper">
                                <p class="text-xl leading-relaxed text-slate-600 dark:text-slate-400 mb-10 font-medium font-serif italic text-center">"Your main image is your most important salesperson on Amazon."</p>
                                
                                <p class="text-lg leading-relaxed mb-10">Selling on Amazon is one of the fastest ways to grow an e-commerce business, but it comes with a strict set of rules. One of the most important rules is the "Main Image" requirement. If you want to list a product, your primary image must have a pure white background. This isn't just a suggestion; it is a requirement that can make or break your success. When you <strong>remove background for Amazon product photos</strong>, you are optimizing your listing for maximum conversion.</p>
                                
                                <div class="blog-image-container my-16 text-center">
                                    <div class="inline-block relative p-1 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[3rem] shadow-2xl">
                                        <div class="relative overflow-hidden rounded-[2.9rem]">
                                            <img src="/blog/nike-shoe-background-removal.webp" alt="Nike shoe with background removed for Amazon" loading="lazy" class="block m-0 hover:scale-105 transition-transform duration-500" />
                                            <div class="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent"></div>
                                        </div>
                                    </div>
                                    <p class="text-center text-slate-500 text-sm font-bold italic mt-8">— Compliant #FFFFFF white background generated in 3 seconds —</p>
                                </div>

                                <h2 class="text-3xl font-black text-slate-900 dark:text-white mt-12 mb-6">Why Amazon Compliance Matters</h2>
                                <p class="text-lg leading-relaxed mb-10">By mandating a pure white background, Amazon creates a clean shopping experience. A white background keeps the focus entirely on the product, ensuring it "pops" on small mobile screens. Listings that comply with <strong>Amazon white background</strong> standards typically see higher visibility in search results.</p>
                                
                                <div class="my-10 p-10 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
                                    <h3 class="text-2xl font-black mb-6">Seller Central Photography Standards</h3>
                                    <ul class="space-y-4 list-none p-0 m-0">
                                        <li class="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                                            <span class="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-black text-xs shrink-0">✓</span>
                                            <div>
                                                <p class="font-black mb-1">Pure White Backdrop</p>
                                                <p class="text-sm opacity-70">Strict RGB 255, 255, 255 or #FFFFFF compliance.</p>
                                            </div>
                                        </li>
                                        <li class="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                                            <span class="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-black text-xs shrink-0">✓</span>
                                            <div>
                                                <p class="font-black mb-1">85% Frame Fill</p>
                                                <p class="text-sm opacity-70">The product must dominate the image area.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <h2 class="text-3xl font-black text-slate-900 dark:text-white mt-24 mb-10 uppercase tracking-tighter">4-Step Workflow for Professional Sellers</h2>
                                
                                <div class="space-y-20 my-16">
                                    <div class="relative pl-12 border-l-2 border-slate-100 dark:border-slate-800 pb-12">
                                        <div class="absolute -left-7 top-0 w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">1</div>
                                        <h3 class="text-2xl font-black mb-4 uppercase">Capture & Upload</h3>
                                        <p class="text-lg mb-8 font-medium text-slate-600 dark:text-slate-400">Take a high-res photo. Drag it into the RemovePro dashboard. Our AI works locally in your RAM.</p>
                                        <img src="/blog/ai-background-remover-upload-interface.webp" alt="Amazon product photo upload interface" class="rounded-[2rem] shadow-2xl max-w-full h-auto mb-10 border border-slate-100 dark:border-slate-800" />
                                    </div>

                                    <div class="relative pl-12 border-l-2 border-slate-100 dark:border-slate-800 pb-12">
                                        <div class="absolute -left-7 top-0 w-14 h-14 bg-blue-800 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">2</div>
                                        <h3 class="text-2xl font-black mb-4 uppercase">AI Extraction</h3>
                                        <p class="text-lg mb-8 font-medium text-slate-600 dark:text-slate-400">The neural network isolates the product instantly. It handles complex textures and fine edges automatically.</p>
                                        <img src="/blog/ai-processing-step.webp" alt="AI background removal for e-commerce products" class="rounded-[2rem] shadow-2xl max-w-full h-auto mb-10 border border-slate-100 dark:border-slate-800" />
                                    </div>

                                    <div class="relative pl-12 border-l-2 border-slate-100 dark:border-slate-800 pb-12">
                                        <div class="absolute -left-7 top-0 w-14 h-14 bg-blue-900 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">3</div>
                                        <h3 class="text-2xl font-black mb-4 uppercase">Edge Refinement</h3>
                                        <p class="text-lg mb-8 font-medium text-slate-600 dark:text-slate-400">Review the cutout. Our tool ensures a studio-grade finish with no jagged artifacts or blurry halos.</p>
                                        <img src="/blog/ai-background-remover-pro-editor-cutout.webp" alt="Quality check for product photo cutouts" class="rounded-[2rem] shadow-2xl max-w-full h-auto mb-10 border border-slate-100 dark:border-slate-800" />
                                    </div>

                                    <div class="relative pl-12 border-l-2 border-slate-100 dark:border-slate-800">
                                        <div class="absolute -left-7 top-0 w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">4</div>
                                        <h3 class="text-2xl font-black mb-4 uppercase">White Background Export</h3>
                                        <p class="text-lg mb-8 font-medium text-slate-600 dark:text-slate-400">Apply the official Amazon preset and download. Your photo is now ready for Seller Central.</p>
                                        <img src="/blog/ai-background-remover-change-background-color.webp" alt="Final Amazon compliant white background export" class="rounded-[2rem] shadow-2xl max-w-full h-auto border border-slate-100 dark:border-slate-800" />
                                    </div>
                                </div>

                                <div class="my-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                    <div>
                                        <h2 class="text-3xl font-black mb-6">Power Seller: Bulk Processing</h2>
                                        <p class="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">Processing 100+ items? Our industrial dashboard allows for rapid bulk background removal. Save hours of manual labor and maintain consistent quality across your entire catalog.</p>
                                    </div>
                                    <div class="relative p-1 bg-gradient-to-tr from-slate-200 to-slate-400 dark:from-slate-800 dark:to-slate-700 rounded-[2.5rem] shadow-2xl overflow-hidden">
                                        <img src="/blog/ai-background-remover-bulk-download-sidebar.webp" alt="Bulk background removal for Amazon catalog" class="max-w-full h-auto" />
                                    </div>
                                </div>

                                <div class="my-24 bg-slate-900 rounded-[3.5rem] p-12 text-white relative overflow-hidden text-center md:text-left">
                                    <div class="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full"></div>
                                    <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                        <div class="order-2 md:order-1 relative rounded-3xl overflow-hidden shadow-2xl">
                                            <img src="/blog/ai-background-remover-editor-zoom-view.webp" alt="Technical edge analysis" class="w-full" />
                                        </div>
                                        <div class="order-1 md:order-2">
                                            <h2 class="text-3xl font-black mb-6 uppercase tracking-tighter">Technical Edge Check</h2>
                                            <p class="text-slate-400 text-lg leading-relaxed font-medium">Amazon’s algorithms detect jagged edges. Use our Pro-Zoom view to inspect transitions at 400% magnification, ensuring a pixel-perfect isolation for high-ticket items.</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-32 p-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[4rem] text-center text-white shadow-3xl border border-white/10 relative overflow-hidden">
                                    <div class="absolute -top-24 -right-24 w-64 h-64 bg-white/10 blur-[60px] rounded-full animate-pulse"></div>
                                    <h2 class="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter uppercase font-serif italic relative z-10">Scale Your Sales</h2>
                                    <p class="text-blue-100 text-xl mb-12 max-w-2xl mx-auto font-medium relative z-10">Join thousands of sellers using the world's fastest on-device AI for Amazon listing optimization.</p>
                                    <a href="/" class="relative z-10 inline-block bg-white text-blue-600 py-6 px-16 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl">Optimize My Listings</a>
                                </div>
                            </div>
                        `,
                        cover_image: '/blog/nike-shoe-background-removal.webp',
                        created_at: new Date().toISOString()
                    });
                }
                else if (slug === 'how-to-remove-background-on-mobile') {
                    setPost({
                        id: '4',
                        title: 'How to Remove Background from Image on Mobile (Free & No App Required)',
                        slug: 'how-to-remove-background-on-mobile',
                        content: `
                            <script type="application/ld+json">
                            {
                              "@context": "https://schema.org",
                              "@type": "FAQPage",
                              "mainEntity": [
                                {
                                  "@type": "Question",
                                  "name": "Is it really free on mobile?",
                                  "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes! RemovePro is completely free. We don't have credits, subscriptions, or hidden costs for HD downloads."
                                  }
                                },
                                {
                                  "@type": "Question",
                                  "name": "Do I need to install any app?",
                                  "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "No. Simply visit our website in your mobile browser. It works just like an app but without the storage footprint."
                                  }
                                },
                                {
                                  "@type": "Question",
                                  "name": "Will my image be uploaded to your server?",
                                  "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "No. Unlike other tools, RemovePro uses local AI. Your photo never leaves your phone, ensuring 100% data privacy."
                                  }
                                }
                              ]
                            }
                            </script>

                            <div class="blog-content-wrapper">
                                <div class="mb-12 text-center">
                                    <p class="text-blue-600 font-black uppercase tracking-[0.2em] text-xs mb-4">Mobile Optimization Guide (2026)</p>
                                    <p class="text-slate-400 font-bold text-sm">Instant • 100% Private • No Watermark • No App Needed</p>
                                </div>

                                <p class="text-lg leading-relaxed mb-8">Don’t want to install heavy, space-consuming apps just to edit one photo? You’re not alone. Most mobile users are tired of apps that promise freedom but deliver watermarks, ads, and privacy risks. If you are looking for a way to <strong>remove background on mobile</strong> without downloading any third-party app, you are in the right place.</p>

                                <div class="blog-image-container my-16 text-center">
                                    <div class="inline-block relative p-1 bg-gradient-to-tr from-orange-500 to-red-600 rounded-[3rem] shadow-2xl">
                                        <div class="relative overflow-hidden rounded-[2.9rem]">
                                            <img src="/blog/remove-background-on-your-phone-free-ai-tool.webp" alt="Remove background on mobile using RemovePro interface" loading="lazy" class="block m-0 hover:scale-105 transition-transform duration-500" />
                                            <div class="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent"></div>
                                        </div>
                                    </div>
                                    <p class="text-center text-slate-500 text-sm font-bold italic mt-8">— Efficient and private background removal directly on your mobile browser —</p>
                                </div>

                                <div class="flex flex-wrap items-center justify-center gap-4 md:gap-12 py-8 my-10 border-y border-slate-100 dark:border-slate-800">
                                    <div class="flex items-center gap-2 text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest">
                                        <div class="w-2 h-2 rounded-full bg-blue-600"></div>
                                        No Signup Required
                                    </div>
                                    <div class="flex items-center gap-2 text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest">
                                        <div class="w-2 h-2 rounded-full bg-indigo-600"></div>
                                        No Watermark
                                    </div>
                                    <div class="flex items-center gap-2 text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest">
                                        <div class="w-2 h-2 rounded-full bg-blue-900"></div>
                                        Android & iPhone
                                    </div>
                                </div>

                                <h2 class="text-3xl font-black text-slate-900 dark:text-white mt-12 mb-6">Can You Remove Background on Mobile Without an App?</h2>
                                <p>The short answer is: <strong>Yes!</strong> In fact, using a browser-based tool is often superior to using a mobile app. Modern mobile browsers now support high-performance computing through technologies like WebAssembly (WASM).</p>

                                <div class="my-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800">
                                    <div class="flex flex-col items-center">
                                        <img src="/blog/mobile-background-remover-upload-screen.webp" alt="RemovePro Mobile Upload Interface" class="rounded-[2.5rem] shadow-xl max-w-[280px]" />
                                        <p class="mt-6 text-slate-500 text-xs font-bold italic">— Intuitive mobile-first interface —</p>
                                    </div>
                                    <div class="flex flex-col justify-center">
                                        <h3 class="text-2xl font-black mb-4">One-Tap Mobile Editing</h3>
                                        <p class="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Our tool is designed for precision on small screens. With a clean upload button and instant feedback, you can start <strong>removing background on mobile</strong> with a single tap. No cluttered menus—just high-performance AI.</p>
                                    </div>
                                </div>

                                <h2 class="text-3xl font-black text-slate-900 dark:text-white mt-24 mb-10 uppercase tracking-tighter text-center">The 4-Step Mobile Workflow</h2>
                                
                                <div class="space-y-16 my-16">
                                    <div class="relative pl-12 border-l-2 border-slate-100 dark:border-slate-800 pb-12">
                                        <div class="absolute -left-7 top-0 w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">1</div>
                                        <h3 class="text-2xl font-black mb-4 uppercase">Upload from Gallery</h3>
                                        <p class="text-lg mb-8 font-medium text-slate-600 dark:text-slate-400">Launch Chrome or Safari. Tap upload and select your photo. No heavy app download required.</p>
                                        <img src="/blog/mobile-background-remover-upload-screen.webp" alt="Mobile gallery upload" class="rounded-[2rem] shadow-2xl max-w-full h-auto mb-10 border border-slate-100 dark:border-slate-800" />
                                    </div>

                                    <div class="relative pl-12 border-l-2 border-slate-100 dark:border-slate-800 pb-12">
                                        <div class="absolute -left-7 top-0 w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">2</div>
                                        <h3 class="text-2xl font-black mb-4 uppercase">AI Precision Cutout</h3>
                                        <p class="text-lg mb-8 font-medium text-slate-600 dark:text-slate-400">Our neural network isolates your subject. It uses <strong>mobile edge detection</strong> specifically tuned for portrait and object shots.</p>
                                        <img src="/blog/mobile-background-remover-cutout-refinement.webp" alt="AI mobile edge detection" class="rounded-[2rem] shadow-2xl max-w-full h-auto mb-10 border border-slate-100 dark:border-slate-800" />
                                    </div>

                                    <div class="relative pl-12 border-l-2 border-slate-100 dark:border-slate-800 pb-12">
                                        <div class="absolute -left-7 top-0 w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">3</div>
                                        <h3 class="text-2xl font-black mb-4 uppercase">Apply Style Presets</h3>
                                        <p class="text-lg mb-8 font-medium text-slate-600 dark:text-slate-400">Choose from solid colors, gradients, or professional backgrounds with our mobile-first preset carousel.</p>
                                        <img src="/blog/mobile-background-remover-presets.webp" alt="Mobile styling presets" class="rounded-[2rem] shadow-2xl max-w-full h-auto mb-10 border border-slate-100 dark:border-slate-800" />
                                    </div>

                                    <div class="relative pl-12 border-l-2 border-slate-100 dark:border-slate-800">
                                        <div class="absolute -left-7 top-0 w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">4</div>
                                        <h3 class="text-2xl font-black mb-4 uppercase">Instant HD Export</h3>
                                        <p class="text-lg mb-8 font-medium text-slate-600 dark:text-slate-400">Download your high-resolution PNG or JPG directly to your phone. No logins, no watermarks, no fees.</p>
                                        <img src="/blog/mobile-background-remover-effects-editor.webp" alt="Mobile HD export options" class="rounded-[2rem] shadow-2xl max-w-full h-auto border border-slate-100 dark:border-slate-800" />
                                    </div>
                                </div>

                                <div class="my-24 bg-slate-50 dark:bg-slate-900 rounded-[3.5rem] p-12 relative overflow-hidden">
                                     <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                        <div>
                                            <h2 class="text-3xl font-black mb-6 uppercase tracking-tight">Precision Zoom for Small Screens</h2>
                                            <p class="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">Don't let a small screen ruin your edit. Our mobile editor includes a specialized zoom view that allows you to inspect and refine edges with pixel-perfect accuracy using simple pinch gestures.</p>
                                        </div>
                                        <div class="relative rounded-3xl overflow-hidden shadow-2xl">
                                            <img src="/blog/mobile-ai-background-remover-zoom-precision.webp" alt="Mobile zoom precision editing" class="w-full" />
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-32 p-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-[4rem] text-center text-white shadow-3xl relative overflow-hidden">
                                    <div class="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-3xl rounded-full translate-x-32 -translate-y-32 animate-pulse"></div>
                                    <h2 class="text-4xl md:text-6xl font-black mb-8 uppercase leading-tight tracking-tighter">Edit on the Go</h2>
                                    <p class="text-orange-50 text-xl mb-12 max-w-2xl mx-auto font-medium">Experience the power of pro-level background removal original files on your smartphone. Free forever.</p>
                                    <a href="/" class="relative z-10 inline-block bg-white text-orange-600 py-6 px-16 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl">Start Mobile Editing</a>
                                </div>
                            </div>
                        `,
                        cover_image: '/blog/remove-background-on-your-phone-free-ai-tool.webp',
                        created_at: new Date().toISOString()
                    });
                }
                else if (slug === 'best-free-remove-bg-alternative') {
                    setPost({
                        id: '3',
                        title: 'Best Free Remove.bg Alternative (No Upload, No Watermark) – RemovePro',
                        slug: 'best-free-remove-bg-alternative',
                        content: `
                            <script type="application/ld+json">
                            {
                              "@context": "https://schema.org",
                              "@type": "FAQPage",
                              "mainEntity": [
                                {
                                  "@type": "Question",
                                  "name": "Why is RemovePro better than Remove.bg?",
                                  "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "RemovePro is 100% free for HD downloads, whereas Remove.bg requires paid credits. Additionally, RemovePro processes images locally on your device, ensuring total privacy."
                                  }
                                },
                                {
                                  "@type": "Question",
                                  "name": "Is there a limit on free HD exports?",
                                  "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "No. Because our AI runs on your hardware, we don't have server costs to pass on. You can export unlimited HD images for free."
                                  }
                                }
                              ]
                            }
                            </script>

                            <div class="blog-content-wrapper">
                                <div class="mb-12 p-10 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-[3rem] border border-green-100 dark:border-green-800">
                                    <p class="text-green-600 dark:text-green-400 font-black uppercase tracking-[0.2em] text-xs mb-4">2026 Industry Comparison</p>
                                    <p class="text-xl font-medium leading-relaxed text-slate-700 dark:text-slate-300">Are you tired of the "Free Credit" trap? We've all been there: you isolate a perfect product shot, only to realize the "Free" version is a blurry thumbnail. To get the HD version, you're forced to subscribe. <strong>RemovePro</strong> changes that.</p>
                                </div>

                                <p class="text-lg leading-relaxed mb-10">In this review, we analyze why RemovePro is objectively the <strong>best free Remove.bg alternative</strong> for professional creators. Unlike traditional web services that rely on expensive cloud servers, RemovePro runs entirely on your local device using high-performance AI.</p>

                                <div class="blog-image-container my-16 text-center">
                                    <div class="inline-block relative p-1 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-[3rem] shadow-2xl">
                                        <div class="relative overflow-hidden rounded-[2.9rem]">
                                            <img src="/blog/best-removebg-alternative-before-after.webp" alt="RemovePro vs Remove.bg Comparison" loading="lazy" class="block m-0 hover:scale-105 transition-transform duration-500" />
                                            <div class="absolute inset-0 bg-green-600/10 to-transparent"></div>
                                        </div>
                                    </div>
                                    <p class="mt-8 text-slate-400 font-bold italic text-sm">— Experience the freedom of 100% free HD exports without any hidden costs —</p>
                                </div>

                                <h2 class="text-4xl font-black text-slate-900 dark:text-white mt-24 mb-10 uppercase tracking-tighter">The 'Credit' Problem</h2>
                                <p class="text-lg mb-12">The "Freemium" model is designed to catch you at your moment of need. Most sites offer a "free" service that either watermarks your image or limits the resolution to 0.25 megapixels. For any professional use—be it social media, e-commerce, or print—these low-res files are useless.</p>

                                <div class="overflow-x-auto my-16 border border-slate-100 dark:border-slate-800 rounded-[3rem] shadow-3xl text-left bg-white dark:bg-slate-950">
                                    <table class="w-full text-left border-collapse">
                                        <thead>
                                            <tr class="bg-slate-50 dark:bg-slate-900">
                                                <th class="p-10 font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 uppercase tracking-widest text-xs">Feature Check</th>
                                                <th class="p-10 font-black text-green-600 border-b border-slate-100 dark:border-slate-800 uppercase tracking-widest text-xs">RemovePro AI</th>
                                                <th class="p-10 font-black text-slate-400 border-b border-slate-100 dark:border-slate-800 uppercase tracking-widest text-xs">Cloud Tools</th>
                                            </tr>
                                        </thead>
                                        <tbody class="text-slate-600 dark:text-slate-400 font-medium">
                                            <tr>
                                                <td class="p-10 border-b border-slate-50 dark:border-slate-800">HD Downloads (Full Res)</td>
                                                <td class="p-10 border-b border-slate-50 dark:border-slate-800 text-green-600 font-black">Unlimited Free</td>
                                                <td class="p-10 border-b border-slate-50 dark:border-slate-800">1 Credit ($1.99+)</td>
                                            </tr>
                                            <tr>
                                                <td class="p-10 border-b border-slate-50 dark:border-slate-800">Account Required</td>
                                                <td class="p-10 border-b border-slate-50 dark:border-slate-800 text-green-600 font-black">No</td>
                                                <td class="p-10 border-b border-slate-50 dark:border-slate-800">Yes (Email/Google)</td>
                                            </tr>
                                            <tr>
                                                <td class="p-10 border-b border-slate-50 dark:border-slate-800">Data Privacy</td>
                                                <td class="p-10 border-b border-slate-50 dark:border-slate-800 text-green-600 font-black">Local Execution</td>
                                                <td class="p-10 border-b border-slate-50 dark:border-slate-800">Cloud Storage</td>
                                            </tr>
                                            <tr>
                                                <td class="p-10">Watermark Free</td>
                                                <td class="p-10 text-green-600 font-black">Always</td>
                                                <td class="p-10 italic">Only on Paid</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <h2 class="text-4xl font-black text-slate-900 dark:text-white mt-24 mb-10 uppercase tracking-tighter">Technology: The WASM Edge</h2>
                                <p class="text-lg leading-relaxed mb-12">RemovePro uses a technical breakthrough called <strong>WebAssembly (WASM)</strong>. Instead of uploading your image to our servers, we bring the AI model directly to your browser's RAM. This allows for a <strong>free background remover no watermark</strong> experience that is also completely private.</p>
                                
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
                                    <div class="p-10 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all">
                                        <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600 mb-8 text-2xl">🚀</div>
                                        <h3 class="text-2xl font-black mb-4">Zero Latency</h3>
                                        <p class="text-slate-600 dark:text-slate-400 font-medium">No upload or download wait times. Processing happens as fast as your device can think.</p>
                                    </div>
                                    <div class="p-10 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all">
                                        <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 mb-8 text-2xl">🛡️</div>
                                        <h3 class="text-2xl font-black mb-4">SOC-2 Privacy</h3>
                                        <p class="text-slate-600 dark:text-slate-400 font-medium">Your photos never leave your RAM. Even we can't see what you're editing.</p>
                                    </div>
                                    <div class="p-10 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all">
                                        <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 mb-8 text-2xl">💎</div>
                                        <h3 class="text-2xl font-black mb-4">Pixel Purity</h3>
                                        <p class="text-slate-600 dark:text-slate-400 font-medium">We don't believe in thumbnails. Get the full resolution you uploaded, every time.</p>
                                    </div>
                                </div>

                                <div class="mt-32 p-16 bg-slate-900 rounded-[4rem] text-center text-white relative overflow-hidden shadow-3xl border border-white/5">
                                    <div class="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-green-500/20 via-transparent to-transparent"></div>
                                    <h2 class="text-4xl md:text-7xl font-black mb-8 relative z-10 uppercase tracking-tighter">Ready to Switch?</h2>
                                    <p class="text-slate-400 text-xl mb-12 max-w-2xl mx-auto relative z-10 font-medium">Stop paying for credits. Stop compromising on privacy. Start using the best Remove.bg alternative 2026.</p>
                                    <a href="/" class="relative z-10 inline-block bg-green-500 text-white py-6 px-16 rounded-2xl font-black uppercase tracking-widest hover:scale-105 hover:bg-green-400 transition-all shadow-2xl">Start Free HD Export</a>
                                </div>
                            </div>
                        `,
                        cover_image: '/blog/best-removebg-alternative-before-after.webp',
                        created_at: new Date().toISOString()
                    });
                }
                else if (slug === 'remove-background-like-pro') {
                    setPost({
                        id: '1',
                        title: 'How to Remove Background Like a Pro (2026 Edition)',
                        slug: 'remove-background-like-pro',
                        content: `
                            <script type="application/ld+json">
                            {
                              "@context": "https://schema.org",
                              "@type": "HowTo",
                              "name": "How to Remove Background Like a Pro",
                              "step": [
                                {
                                  "@type": "HowToStep",
                                  "name": "Optimizing Lighting",
                                  "text": "Ensure high contrast between the subject and the background to help the AI detect edges more accurately."
                                },
                                {
                                  "@type": "HowToStep",
                                  "name": "Quality Check at 400% Zoom",
                                  "text": "Always zoom in to inspect fine details like hair and complex edges for sub-pixel accuracy."
                                }
                              ]
                            }
                            </script>

                            <div class="blog-content-wrapper">
                                <div class="mb-12 text-center">
                                    <p class="text-indigo-600 font-black uppercase tracking-[0.3em] text-xs mb-4 text-center">Professional Workflow Series</p>
                                    <h2 class="text-3xl font-black text-slate-900 dark:text-white mb-6 italic font-serif text-center">"Great results come from great preparation."</h2>
                                </div>

                                <p class="text-lg leading-relaxed mb-10">Achieving a pixel-perfect cutout isn't just about the AI—it's about the workflow. While our <strong>AI background remover</strong> handles 99% of the manual labor, these pro tips will help you manage complex hair, tough shadows, and lighting matches like a seasoned editor.</p>
                                
                                 <div class="blog-image-container my-16 text-center">
                                    <div class="inline-block relative p-1 bg-gradient-to-tr from-blue-900 to-indigo-900 rounded-[3rem] shadow-2xl">
                                        <div class="relative overflow-hidden rounded-[2.9rem]">
                                            <img src="/blog/ai-background-remover-pro-editor-background.webp" alt="Professional Background Removal Workflow" loading="lazy" class="block m-0 hover:scale-105 transition-transform duration-500" />
                                            <div class="absolute inset-0 bg-blue-900/10 backdrop-blur-[2px]"></div>
                                        </div>
                                    </div>
                                    <p class="mt-8 text-slate-400 font-bold italic text-sm">— Case Study: Pro editors use sub-pixel masks for commercial-grade results —</p>
                                </div>

                                <h2 class="text-4xl font-black text-slate-900 dark:text-white mt-24 mb-10 uppercase tracking-tighter">The Pro Pre-Processing Checklist</h2>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
                                    <div class="p-10 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl group hover:border-blue-500/30 transition-all duration-500">
                                        <div class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl mb-8 shadow-lg group-hover:rotate-12 transition-transform">01</div>
                                        <h3 class="text-2xl font-black mb-4">Lighting Contrast</h3>
                                        <p class="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">AI works best with clear distinction. When shooting, ensure your subject doesn't "bleed" into the background lighting. Use a backlight to create a clean 'rim' around the edges.</p>
                                    </div>
                                    <div class="p-10 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl group hover:border-indigo-500/30 transition-all duration-500">
                                        <div class="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl mb-8 shadow-lg group-hover:-rotate-12 transition-transform">02</div>
                                        <h3 class="text-2xl font-black mb-4">Shadow Retention</h3>
                                        <p class="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Never remove the natural 'contact shadow' completely. It keeps the object feeling 'grounded' in reality. Our Pro editor allows for <strong>sub-pixel shadow masking</strong>.</p>
                                    </div>
                                </div>

                                <h2 class="text-4xl font-black text-slate-900 dark:text-white mt-24 mb-10 uppercase tracking-tighter">Advanced Edging Techniques</h2>
                                <p class="text-lg mb-10">When dealing with hair or semi-transparent fabrics, a standard "hard" cutout looks fake. To <strong>remove background like a pro</strong>, you must understand the 'halo' effect. Our AI automatically handles sub-pixel transparency, but you can refine it by slightly 'feathering' the edges in our advanced editor.</p>

                                <div class="relative my-20 p-1 bg-slate-900 rounded-[4rem] overflow-hidden shadow-3xl">
                                    <img src="/blog/pro-background-removal-quality-zoom.webp" alt="Zoomed in quality check" class="block w-full opacity-80" />
                                    <div class="absolute inset-0 flex items-center justify-center">
                                        <div class="p-10 bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 text-white text-center max-w-md mx-6">
                                            <p class="text-xs font-black uppercase tracking-[0.3em] mb-4 opacity-60">Quality Protocol</p>
                                            <p class="text-xl font-bold italic leading-relaxed">"Zoom in to 400% when checking edges. If it looks clean at 4x, it's perfect for 4K."</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="my-24 bg-indigo-50 dark:bg-indigo-900/10 rounded-[3.5rem] p-16 border border-indigo-100 dark:border-indigo-900/30">
                                    <h2 class="text-3xl font-black mb-8 uppercase tracking-tight">The Pro Advantage: Sub-Pixel Accuracy</h2>
                                    <p class="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium mb-8">Unlike standard tools, RemovePro analyzes the <strong>transition pixels</strong>. This means hair strands aren't just 'cut', they are blended based on the luminosity of the original background, allowing you to place subjects on any new background without that classic 'Photoshopped' look.</p>
                                    <div class="flex flex-wrap gap-4">
                                        <span class="px-6 py-3 bg-white dark:bg-slate-900 rounded-xl text-indigo-600 font-bold text-sm border border-indigo-50 shadow-sm">Hair Masking</span>
                                        <span class="px-6 py-3 bg-white dark:bg-slate-900 rounded-xl text-indigo-600 font-bold text-sm border border-indigo-50 shadow-sm">Edge Feathering</span>
                                        <span class="px-6 py-3 bg-white dark:bg-slate-900 rounded-xl text-indigo-600 font-bold text-sm border border-indigo-50 shadow-sm">Color Spill Removal</span>
                                    </div>
                                </div>

                                <div class="mt-32 p-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 rounded-[4rem] text-center text-white shadow-3xl border border-white/5 relative overflow-hidden">
                                     <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                                    <h2 class="text-4xl md:text-7xl font-black text-white m-0 mb-8 leading-tight tracking-tighter uppercase relative z-10">Elevate Your Output</h2>
                                    <p class="text-slate-400 text-xl mb-12 max-w-xl mx-auto font-medium relative z-10">Stop settling for mediocre cutouts. Use the tool built for professional perfectionists. 100% Free.</p>
                                    <a href="/" class="relative z-10 inline-block bg-white text-indigo-900 py-6 px-16 rounded-2xl font-black uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-2xl">Enter Editor</a>
                                </div>
                            </div>
                        `,
                        cover_image: '/blog/ai-background-remover-pro-editor-background.webp',
                        created_at: new Date().toISOString()
                    });
                }
                else if (slug === 'free-ai-background-remover-without-watermark') {
                    setPost({
                        id: '2',
                        title: 'Free AI Background Remover Without Watermark (HD Quality) – RemovePro',
                        slug: 'free-ai-background-remover-without-watermark',
                        content: `
                            <script type="application/ld+json">
                            {
                              "@context": "https://schema.org",
                              "@type": "Product",
                              "name": "RemovePro AI Background Remover",
                              "description": "Free AI-powered background remover with 100% HD quality exports and no watermarks.",
                              "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "USD"
                              }
                            }
                            </script>

                            <div class="blog-content-wrapper">
                                <div class="mb-12 p-1 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[3rem] shadow-2xl">
                                    <div class="bg-white dark:bg-slate-950 rounded-[2.9rem] p-10">
                                        <p class="text-xl leading-relaxed text-slate-700 dark:text-slate-300 mb-0 font-medium font-serif italic text-center">"Privacy and quality are the cornerstones of honest software."</p>
                                    </div>
                                </div>

                                <p class="text-lg leading-relaxed mb-10 text-center max-w-3xl mx-auto">Stop paying $1.99 per credit just to get a high-quality background cutout. <strong>RemovePro</strong> is the first 100% on-device tool that delivers studio quality without watermarks or hidden fees.</p>

                                <div class="blog-image-container my-16 text-center">
                                    <div class="inline-block relative p-1 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[3.5rem] shadow-3xl">
                                        <div class="relative overflow-hidden rounded-[3.4rem]">
                                            <img src="/blog/free-ai-background-remover-before-after.webp" alt="High Quality HD Background Removal" loading="lazy" class="block m-0 hover:scale-105 transition-transform duration-700" />
                                            <div class="absolute inset-0 bg-blue-600/5"></div>
                                        </div>
                                    </div>
                                    <p class="mt-8 text-slate-500 font-bold italic text-sm">— 100% HD Result • 100% Free • 100% Privacy-First —</p>
                                </div>

                                <h2 class="text-4xl font-black text-slate-900 dark:text-white mt-24 mb-10 uppercase tracking-tighter">The End of the Bait-and-Switch</h2>
                                <p class="text-lg mb-10">Most "free" tools force you to pay for high-resolution downloads or slap a logo across your final PNG. We call this the 'Export Tax'. For professional designers, this is a deal-breaker. We believe in providing full-resolution HD exports from the very first click.</p>

                                <div class="my-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-slate-50 dark:bg-slate-900/50 rounded-[4rem] p-16 border border-slate-100 dark:border-slate-800 shadow-2xl">
                                    <div class="flex flex-col items-center">
                                        <div class="rounded-[2.5rem] overflow-hidden shadow-3xl hover:rotate-2 transition-transform duration-500 border border-slate-200 dark:border-slate-700">
                                            <img src="/blog/ai-background-remover-pro-editor-cutout.webp" alt="Portrait Precision" class="max-w-full" />
                                        </div>
                                        <p class="mt-10 text-slate-500 font-black text-xs uppercase tracking-[0.2em]">Zero Compression Exports</p>
                                    </div>
                                    <div class="flex flex-col justify-center">
                                        <h3 class="text-3xl font-black mb-6 uppercase tracking-tight">Lossless Standards</h3>
                                        <p class="text-slate-600 dark:text-slate-400 text-lg font-medium leading-relaxed mb-8">We don't compress your images. Our local AI processes the full resolution of your upload—up to 50MP—preserving every fine texture and hair strand for pro-grade publishing.</p>
                                        <ul class="space-y-4">
                                            <li class="flex items-center gap-3 text-slate-900 dark:text-white font-bold"><div class="w-2 h-2 rounded-full bg-blue-600"></div> No PNG Artifacts</li>
                                            <li class="flex items-center gap-3 text-slate-900 dark:text-white font-bold"><div class="w-2 h-2 rounded-full bg-indigo-600"></div> Sub-pixel Edge Smoothing</li>
                                            <li class="flex items-center gap-3 text-slate-900 dark:text-white font-bold"><div class="w-2 h-2 rounded-full bg-blue-900"></div> Transparency Preservation</li>
                                        </ul>
                                    </div>
                                </div>

                                <h2 class="text-4xl font-black text-slate-900 dark:text-white mt-24 mb-10 uppercase tracking-tighter">HD Quality on Any Device</h2>
                                <p class="text-lg mb-12">Whether you're on a high-end workstation or a 5-year-old smartphone, RemovePro scales its neural processing to give you <strong>high resolution background removal</strong> results. By utilizing the browser's own GPU/CPU power via WebGL and WASM, we perform the heavy lifting locally, eliminating the need for expensive server farms that would otherwise force us to charge you.</p>

                                <div class="my-24 p-12 bg-blue-50 dark:bg-indigo-900/10 rounded-[3.5rem] border border-blue-100 dark:border-indigo-900/30 text-center">
                                    <h3 class="text-3xl font-black mb-6 text-blue-600 uppercase">Built for Professionals</h3>
                                    <p class="text-slate-600 dark:text-slate-400 text-xl font-medium leading-relaxed max-w-3xl mx-auto italic">"RemovePro is my go-to for client work. The fact that it's free HD with zero watermark makes it the most honest tool in the market today."</p>
                                </div>

                                <div class="mt-32 p-20 bg-blue-600 rounded-[4.5rem] text-center text-white shadow-3xl relative overflow-hidden">
                                     <div class="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
                                    <h2 class="text-4xl md:text-8xl font-black text-white m-0 mb-8 leading-tight tracking-tighter uppercase relative z-10">Pure. HD. Free.</h2>
                                    <p class="text-blue-50 text-2xl mb-16 max-w-2xl mx-auto font-medium relative z-10 opacity-90">Experience the world's most honest background remover. No watermarks, ever.</p>
                                    <a href="/" class="relative z-10 inline-block bg-white text-blue-600 py-8 px-20 rounded-3xl font-black uppercase tracking-[0.3em] text-lg hover:scale-105 transition-all shadow-2xl">Start HD Processing</a>
                                </div>
                            </div>
                        `,
                        cover_image: '/blog/free-ai-background-remover-before-after.webp',
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
                                        </button >
                                    ))}
                                </div >
                            </div >
                        </div >
                    </div >

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
                                    cover_image: '/blog/ai-background-remover-pro-editor-background.webp'
                                },
                                {
                                    id: '2',
                                    title: 'Best Free Alternative to Remove.bg',
                                    slug: 'best-free-remove-bg-alternative',
                                    excerpt: 'Stop paying for background removals. Discover why RemovePro is the ultimate credit-free alternative.',
                                    cover_image: '/blog/best-removebg-alternative-before-after.webp'
                                },
                                {
                                    id: '3',
                                    title: 'Background Removal on Mobile',
                                    slug: 'how-to-remove-background-on-mobile',
                                    excerpt: 'Learn how to remove backgrounds instantly on your mobile phone without downloading any clunky apps.',
                                    cover_image: '/blog/remove-background-on-your-phone-free-ai-tool.webp'
                                },
                                {
                                    id: '4',
                                    title: 'Amazon Product Photography Guide',
                                    slug: 'how-to-remove-background-for-amazon-product-photos',
                                    excerpt: 'Master Amazon standards. Create pure white #FFFFFF backgrounds that skyrocket your conversion rates.',
                                    cover_image: '/blog/nike-shoe-background-removal.webp'
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
