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
                // Fallback for demo/initial content
                if (slug === 'free-ai-background-remover-without-watermark') {
                    setPost({
                        id: '2',
                        title: 'Free AI Background Remover Without Watermark (HD Quality) – RemovePro',
                        slug: 'free-ai-background-remover-without-watermark',
                        content: `
                            <p class="text-lg leading-relaxed mb-8">Removing backgrounds from images has never been easier. With <a href="/" class="text-blue-600 font-bold hover:underline">RemovePro</a>, you can remove image backgrounds instantly using advanced AI technology — completely free and without any watermark. Our professional-grade engine is built for creators who demand perfection without the price tag.</p>
                            
                            <div class="my-10 p-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                                <a href="/" class="bg-white dark:bg-slate-900 w-full text-center py-5 px-8 rounded-xl font-black text-blue-600 hover:bg-slate-50 transition-all uppercase tracking-widest text-sm shadow-inner group">
                                    Upload Your Image Now – Free <span class="group-hover:translate-x-1 inline-block transition-transform">→</span>
                                </a>
                            </div>

                            <p>Whether you are a content creator, e-commerce seller, designer, or student, RemovePro helps you create clean, professional images in seconds. In this guide, we'll explore why high-quality background removal is essential and how AI is revolutionizing the industry.</p>
                            
                            <h2>Why Choose RemovePro? (Comparison with Paid Tools)</h2>
                            <p>There are many background remover tools online, but most of them focus on profit over performance. In contrast, RemovePro is designed for professionals who need high-resolution results without the price tag.</p>
                            <p>Paid tools like Adobe Photoshop require expensive monthly subscriptions and hours of manual work. Even web-based "Pro" tools often lock HD downloads behind a paywall. RemovePro breaks this barrier by offering world-class AI subtraction technology for free.</p>
                            <ul>
                                <li><strong>100% Free:</strong> No hidden charges, no "credits" system. Just upload and download.</li>
                                <li><strong>No Watermark:</strong> Many tools promise "free" removal but slap a logo on your output. We don't.</li>
                                <li><strong>High-Quality HD Output:</strong> We maintain the original resolution, ensuring your product shots look sharp.</li>
                                <li><strong>Fast AI Processing:</strong> Our neural network processes images in 3-5 seconds locally.</li>
                                <li><strong>Privacy First:</strong> Your images are processed in the browser, never stored on our servers.</li>
                            </ul>

                            <h2>How AI Background Removal Works (The Science)</h2>
                            <p>Traditional background removal involved "Green Screens" or hours of manual masking in software like Photoshop. Modern AI, like the engine powering <a href="/" class="text-blue-600 font-bold hover:underline">RemovePro</a>, uses a process called <em>Semantic Segmentation</em>.</p>
                            <p>Our AI model has been trained on millions of images to understand the difference between a person, an object, and the background. It creates a pixel-perfect "Mask" around the subject, ensuring fine details like hair strands and fuzzy edges are preserved perfectly. This model uses deep convolutional neural networks (CNNs) to predict the transparency of every single pixel.</p>
                            <blockquote>"AI doesn't just cut an image; it understands it. This is how we achieve the clarity that was once only possible with human editors."</blockquote>
                            
                            <h2>The Evolution of Image Editing</h2>
                            <p>Ten years ago, a photographer would spend 30 minutes carefully tracing a subject with a "Pen Tool". Today, we have automated the most boring parts of the creative process. This allows designers to focus on what matters: the actual art and composition.</p>

                            <h2>How to Remove Background Online (Step-by-Step)</h2>
                            <h3>1. Visit the Homepage & Upload</h3>
                            <p>Start by heading over to the <a href="/" class="text-blue-600 font-bold hover:underline">RemovePro Home Page</a>. You'll see a clean, modern interface where you can immediately begin your project by clicking the prominent 'Upload Image' button.</p>
                            <img src="/blog/upload-button.jpg" alt="AI Remover PRO Homepage with Upload Image button" class="my-6 rounded-3xl shadow-lg border border-slate-100" loading="lazy" />

                            <h3>2. Select Your Image</h3>
                            <p>Simply select the image you wish to edit from your device. Whether it's a product shot like a leather handbag or a portrait, our AI handles any subject with ease.</p>
                            <img src="/blog/select-file.jpg" alt="Selecting an image to remove background" class="my-6 rounded-3xl shadow-lg border border-slate-100" loading="lazy" />

                            <h3>3. Instant AI Processing</h3>
                            <p>Once uploaded, the AI starts instantly. You'll see a 'Zoom' view where you can inspect the quality of the cutout. Our AI preserves even the most subtle reflections and edges.</p>
                            <img src="/blog/editor-view.jpg" alt="AI Remover PRO Editor Zoom View" class="my-6 rounded-3xl shadow-lg border border-slate-100" loading="lazy" />

                            <h3>4. Download in High Definition</h3>
                            <p>Finally, click the download button. You can choose from various quality levels: **High Definition** for printing, **Regular Quality** for web, or **Small File** for social sharing.</p>
                            <img src="/blog/download-options.jpg" alt="Download quality options in AI Remover PRO" class="my-6 rounded-3xl shadow-lg border border-slate-100" loading="lazy" />

                            <h2>Professional Use Cases & Strategic Value</h2>
                            <p>Background removal isn't just for fun; it's a critical part of modern business workflows that directly impacts conversion rates.</p>
                            
                            <h3>1. E-commerce & Product Photography</h3>
                            <p>If you sell on Amazon, eBay, or Shopify, you know that white-background images are mandatory for most categories. Studies show that clean, product-focused images increase conversion rates by up to 28%.</p>
                            
                            <h3>2. Personal Branding & Social Media</h3>
                            <p>Influencers and professionals use transparent backgrounds to create personal branding stickers, YouTube thumbnails, and LinkedIn headshots. A clean cutout makes your profile look 10x more authoritative and professional.</p>
                            
                            <h3>3. Creative Design & Ad Banners</h3>
                            <p>Graphic designers use our tool to isolate subjects and place them on custom backgrounds for digital ads, posters, and company website banners. Isolation is the first step in digital compositing.</p>

                            <h2>Why RemovePro is Better Than Paid Software</h2>
                            <p>While Adobe Photoshop is the industry standard, it takes years to master and costs hundreds of dollars annually. Canva is fantastic for quick layouts, but its high-end background remover is locked behind a $12.99/month subscription. RemovePro gives you <strong>Pro-level features for $0</strong>.</p>
                            
                            <div class="overflow-x-auto my-12">
                                <table class="w-full text-left border-collapse rounded-3xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800">
                                    <thead class="bg-slate-50 dark:bg-slate-900">
                                        <tr>
                                            <th class="p-6 font-black uppercase tracking-widest text-xs">Feature</th>
                                            <th class="p-6 font-black uppercase tracking-widest text-xs text-blue-600">RemovePro</th>
                                            <th class="p-6 font-black uppercase tracking-widest text-xs text-slate-400">Paid Tools</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                                        <tr>
                                            <td class="p-6 font-bold">HD Quality</td>
                                            <td class="p-6">✅ Free Forever</td>
                                            <td class="p-6">❌ Premium Only</td>
                                        </tr>
                                        <tr>
                                            <td class="p-6 font-bold">No Watermark</td>
                                            <td class="p-6">✅ Guarantee</td>
                                            <td class="p-6">❌ Requires Payment</td>
                                        </tr>
                                        <tr>
                                            <td class="p-6 font-bold">Registration</td>
                                            <td class="p-6">✅ Not Required</td>
                                            <td class="p-6">❌ Mandatory</td>
                                        </tr>
                                        <tr>
                                            <td class="p-6 font-bold">Processing</td>
                                            <td class="p-6">⚡ Browser AI (Safe)</td>
                                            <td class="p-6">🐢 Server Processing</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h2>Optimizing Your Images for SEO</h2>
                            <p>Once you remove the background, remember to optimize the PNG file size. Large files slow down your website, which can hurt your Google rankings. We recommend using WebP conversion after removal for the best balance of quality and performance.</p>

                            <h2>Frequently Asked Questions (FAQ)</h2>
                            <div class="space-y-6 bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800">
                                <div class="faq-item">
                                    <h3 class="text-xl font-black mb-2">Is it really free?</h3>
                                    <p class="text-slate-500">Yes, 100%. We believe professional tools should be accessible to everyone without hidden costs. We monetize through simple ads and sponsorships rather than charging our users.</p>
                                </div>
                                <div class="faq-item">
                                    <h3 class="text-xl font-black mb-2">What is the max resolution?</h3>
                                    <p class="text-slate-500">Currently, we support up to 4K resolution processing for free users. If your image is larger, it will be automatically scaled to fit our processing capacity while maintaining aspect ratio.</p>
                                </div>
                                <div class="faq-item">
                                    <h3 class="text-xl font-black mb-2">My image looks blurry, why?</h3>
                                    <p class="text-slate-500">Ensure your original upload is high-quality. Our AI preserves the original resolution but cannot 'upscale' low-quality source images.</p>
                                </div>
                            </div>

                            <div class="mt-20 text-center p-12 bg-blue-600 rounded-[3rem] text-white shadow-2xl shadow-blue-500/20">
                                <h2 class="text-4xl font-black text-white mt-0 mb-4">Start Removing Backgrounds Instantly</h2>
                                <p class="text-blue-100 mb-10 text-xl font-medium">Join 50k+ users who use RemovePro every month for their creative projects.</p>
                                <a href="/" class="inline-block bg-white text-blue-600 py-5 px-10 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-100 transition-all transform hover:scale-105">
                                    Remove Background Now – Free
                                </a>
                            </div>

                            <div class="mt-16 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-10">
                                <div class="flex gap-6">
                                    <a href="/privacy" class="hover:text-blue-600 transition-colors">Privacy</a>
                                    <a href="/terms" class="hover:text-blue-600 transition-colors">Terms</a>
                                    <a href="/contact" class="hover:text-blue-600 transition-colors">Contact</a>
                                </div>
                                <span>Last Updated: Feb 16, 2026</span>
                            </div>
                        `,
                        cover_image: '/blog/hero-before-after.jpg',
                        created_at: new Date().toISOString()
                    });
                } else if (slug === 'remove-background-like-pro') {
                    setPost({
                        id: '1',
                        title: 'How to Remove Background Like a Pro',
                        slug: 'remove-background-like-pro',
                        content: `
                            <p>Removing backgrounds from images used to be a tedious task that required professional software and hours of manual work. But with the advent of AI, that has all changed.</p>
                            <h2>The Rise of AI in Background Removal</h2>
                            <p>Modern machine learning models, like the ones used in <a href="/">RemovePro</a>, can now identify subjects with incredible precision.</p>
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
    }, [slug]);

    // Separate effect for scroll to top on slug change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    // Separate effect for SEO updates
    useEffect(() => {
        if (post) {
            document.title = post.title;
        }
    }, [post]);

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

            {/* SEO Structured Data (FAQ Schema) */}
            {post?.slug === 'free-ai-background-remover-without-watermark' && (
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "Is RemovePro completely free?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, you can remove backgrounds and download HD images without paying."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Does it add a watermark?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "No. RemovePro provides clean downloads."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "What file formats are supported?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "JPG, PNG, and most common image formats are supported."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Can I use it on mobile?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, it works perfectly on smartphones."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "How long does it take?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Usually 3–5 seconds depending on image size."
                                }
                            }
                        ]
                    })}
                </script>
            )}

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
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden lg:block [writing-mode:vertical-rl]">Share This</p>
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
                        <div className="space-y-2 flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                <h4 className="text-xl font-black text-slate-900 dark:text-white">Editorial Team @ RemovePro</h4>
                                <div className="flex gap-4 text-xs font-bold text-blue-600">
                                    <span className="cursor-pointer hover:underline">Portfolio</span>
                                    <span className="cursor-pointer hover:underline">LinkedIn</span>
                                </div>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                Our editorial team consists of expert photographers and AI researchers dedicated to making professional-grade image editing accessible to everyone. We research and test the latest machine learning models to ensure that <a href="/" className="font-bold hover:underline">RemovePro</a> remains the world's fastest and most accurate background remover.
                            </p>
                        </div>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
};
