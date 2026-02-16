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
                        title: 'Free AI Background Remover Without Watermark',
                        slug: 'free-ai-background-remover-without-watermark',
                        content: `
                            <div class="mb-12 text-center">
                                <p class="text-blue-600 font-black uppercase tracking-[0.2em] text-xs mb-4">Ultimate Guide 2026</p>
                                <p class="text-slate-400 font-bold text-sm">No Signup • No Watermark • 100% Free • HD Quality</p>
                            </div>

                            <p class="text-lg leading-relaxed mb-8">Removing backgrounds from images has never been easier. With <a href="/" class="text-blue-600 font-bold hover:underline">RemovePro AI Tool</a>, you can remove image backgrounds instantly using advanced AI technology — completely free and without any watermark. Our professional-grade engine is the <strong>best free alternative to Remove.bg</strong>, built for creators who demand perfection without the price tag.</p>
                            
                            <div class="my-10 p-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                                <a href="/" class="bg-white dark:bg-slate-900 w-full text-center py-5 px-8 rounded-xl font-black text-blue-600 hover:bg-slate-50 transition-all uppercase tracking-widest text-sm shadow-inner group">
                                    Upload Your Image Now – Free <span class="group-hover:translate-x-1 inline-block transition-transform">→</span>
                                </a>
                            </div>

                            <p>Whether you are a content creator, e-commerce seller, or social media manager, our <strong>AI background remover online</strong> helps you create clean, professional images in seconds. In this guide, we'll show you how to use this <strong>HD transparent PNG generator</strong> to level up your branding.</p>
                            
                            <h2>Why Choose RemovePro? (Best Free Alternative to Remove.bg)</h2>
                            <p>There are many tools to <strong>remove background without watermark</strong>, but most of them focus on profit over performance. In contrast, RemovePro is designed for professionals who need high-resolution results without the price tag.</p>
                            <p>Paid tools like Adobe Photoshop require expensive monthly subscriptions. Even web-based "Pro" tools often lock HD downloads behind a paywall. RemovePro breaks this barrier by offering world-class AI subtraction technology for free.</p>
                            <ul>
                                <li><strong>100% Free:</strong> No hidden charges, no "credits" system. Just upload and download.</li>
                                <li><strong>No Watermark:</strong> We provide clean, high-definition outputs without any branding.</li>
                                <li><strong>High-Quality HD Output:</strong> We maintain the original resolution, ensuring your product shots look sharp.</li>
                                <li><strong>Fast AI Processing:</strong> Our neural network processes images in 3-5 seconds locally.</li>
                                <li><strong>Privacy First:</strong> Your images are processed in the browser, never stored on our servers.</li>
                            </ul>

                            <h2>How AI Background Removal Works (The Science)</h2>
                            <p>Modern AI, like the engine powering RemovePro, uses a process called <em>Semantic Segmentation</em>. It's the most effective way to <strong>remove background online</strong> with professional accuracy.</p>
                            <p>Our AI model has been trained on millions of images to understand the difference between a person, an object, and the background. It creates a pixel-perfect "Mask" around the subject, ensuring fine details like hair strands and fuzzy edges are preserved perfectly.</p>
                            <blockquote>"AI doesn't just cut an image; it understands it. This is how we achieve the clarity that was once only possible with human editors."</blockquote>
                            
                            <h2>How to Remove Background from Images for Free</h2>
                            <p>Getting a transparent background is simple. Follow these steps to use our tool like a pro.</p>

                            <h3>1. Visit the Homepage & Upload</h3>
                            <p>Start by heading over to the <a href="/" class="text-blue-600 font-bold hover:underline">RemovePro AI Tool</a>. You'll see our clean, high-performance interface designed for speed.</p>
                            <img src="/blog/ai-background-remover-homepage-hero.webp" width="800" height="450" alt="RemovePro AI background remover homepage hero interface" class="my-6 rounded-3xl shadow-lg border border-slate-100" loading="lazy" />

                            <h3>2. Select Single or Multiple Files</h3>
                            <p>Click 'Upload Image' to open your file dialog. One of our most powerful features is <strong>Bulk Background Removal</strong> — you can select up to 20 images at once to process them in a single batch.</p>
                            <img src="/blog/ai-background-remover-file-upload-dialog.webp" width="800" height="450" alt="Selecting multiple images for bulk background removal" class="my-6 rounded-3xl shadow-lg border border-slate-100" loading="lazy" />

                            <h2>The Pro Editor Suite: Advanced Control</h2>
                            <p>Unlike basic tools, RemovePro gives you a full suite of editing powers to ensure your final image is flawless. After the AI does its magic, you can use these professional-grade tools to perfect your design.</p>

                            <h3>Precision Zoom View</h3>
                            <p>When working with complex subjects like hair or jewelry, detail is everything. Our <strong>Zoom Tool</strong> allows you to inspect the edges at high magnification, ensuring that every pixel is perfectly clipped.</p>
                            <img src="/blog/ai-background-remover-pro-editor-zoom.webp" width="800" height="450" alt="Using the Zoom tool for precision background removal inspection" class="my-6 rounded-3xl shadow-lg border border-slate-100" loading="lazy" />

                            <h3>Smart Manual Cutout</h3>
                            <p>If the AI misses a tiny detail, you are in control. Use the <strong>Manual Cutout</strong> feature to erase or restore specific parts of the image with a customizable brush size. It's like having Photoshop in your browser.</p>
                            <img src="/blog/ai-background-remover-pro-editor-cutout.webp" width="800" height="450" alt="Manual cutout tool to erase and restore image parts" class="my-6 rounded-3xl shadow-lg border border-slate-100" loading="lazy" />

                            <h3>Custom Background Colors & Styles</h3>
                            <p>Go to the <strong>Background Tab</strong> to instantly swap your old background for a clean solid color or a high-quality photo. Whether you need a crisp red for a product shot or a subtle gray for a headshot, our library has you covered.</p>
                            <img src="/blog/ai-background-remover-change-background-color.webp" width="800" height="450" alt="Changing background colors with the pro editor" class="my-6 rounded-3xl shadow-lg border border-slate-100" loading="lazy" />

                            <h3>Creative Effects (Mirror Reflection)</h3>
                            <p>Want to make your product images look premium? The <strong>Effects Tab</strong> includes creative tools like <strong>Mirror Reflection</strong> and shadows. Add a professional floor reflection in one click to give your images depth and realism.</p>
                            <img src="/blog/ai-background-remover-mirror-reflection-effects.webp" width="800" height="450" alt="Adding mirror reflection effects to product images" class="my-6 rounded-3xl shadow-lg border border-slate-100" loading="lazy" />

                            <h3>Fine-Tune Quality: Brightness & Contrast</h3>
                            <p>Lighting isn't always perfect. Use the <strong>Adjust Tab</strong> to quickly tune the brightness and contrast of your isolated subject. This ensures your subject blends perfectly with any new background you choose.</p>
                            <img src="/blog/ai-background-remover-brightness-contrast-adjustment.webp" width="800" height="450" alt="Adjusting brightness and contrast for isolated subjects" class="my-6 rounded-3xl shadow-lg border border-slate-100" loading="lazy" />

                            <h3>Instant Resizing for Social Media</h3>
                            <p>No more guessing dimensions. Our <strong>Resize Tool</strong> includes presets for Instagram Stories (9:16), Square posts (1:1), and YouTube thumbnails (16:9). The AI automatically centers your subject while you crop.</p>
                            <img src="/blog/ai-background-remover-social-media-resize-options.webp" width="800" height="450" alt="Instant social media resize presets in the pro editor" class="my-6 rounded-3xl shadow-lg border border-slate-100" loading="lazy" />

                            <h2>Efficiency at Scale: Bulk Background Removal</h2>
                            <p>If you sell on Amazon or Shopify, you know the struggle of editing hundreds of photos. RemovePro allows you to <strong>process 20+ images in one click</strong>.</p>
                            <p>Once processed, the <strong>Download All</strong> button in the sidebar lets you export every single image in HD as a ZIP file. This feature alone saves professional creators hours of manual labor every week.</p>
                            <img src="/blog/ai-background-remover-bulk-download-sidebar.webp" width="800" height="450" alt="Bulk download background removal results in one click" class="my-6 rounded-3xl shadow-lg border border-slate-100" loading="lazy" />

                            <h3>3. Download in High Definition</h3>
                            <p>Finally, click the download button. You can choose from various quality levels. For the best results, select the 'High Definition' option.</p>
                            <img src="/blog/ai-background-remover-hd-download-options.webp" width="800" height="450" alt="HD download options for AI background remover without watermark" class="my-6 rounded-3xl shadow-lg border border-slate-100" loading="lazy" />

                            <h2>Professional Use Cases</h2>
                            <p>Background should never distract from the subject. Here is why users love our <strong>HD transparent PNG generator</strong>:</p>
                            
                            <h3>1. E-commerce & Product Photography</h3>
                            <p>White-background images are mandatory for major marketplaces. Studies show that clean, product-focused images increase conversion rates by up to 28%.</p>
                            
                            <h3>2. Personal Branding</h3>
                            <p>Influencers use transparent backgrounds to create personal branding stickers, YouTube thumbnails, and LinkedIn headshots. Check our <a href="/pricing" class="font-bold text-blue-600 hover:underline">pricing page</a> for professional API access.</p>
                            
                            <h3>3. Creative Design</h3>
                            <p>Graphic designers use our tool to isolate subjects for digital ads and posters. If you are a developer, check our <a href="/resources" class="font-bold text-blue-600 hover:underline">developer resources</a> for integration guides.</p>

                            <h2>Optimizing Your Images for SEO</h2>
                            <p>Once you remove the background, remember to optimize the PNG file size. Large files slow down your website. We recommend using WebP conversion for the best balance of quality and performance.</p>

                            <h2>Frequently Asked Questions (FAQ)</h2>
                            <div class="space-y-6 bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800">
                                <div class="faq-item">
                                    <h3 class="text-xl font-black mb-2">Is it really free?</h3>
                                    <p class="text-slate-500 font-medium">Yes, 100%. We believe professional tools should be accessible to everyone without hidden costs. You can <strong>remove background without watermark</strong> completely free.</p>
                                </div>
                                <div class="faq-item">
                                    <h3 class="text-xl font-black mb-2">What is the maximum resolution?</h3>
                                    <p class="text-slate-500 font-medium">Currently, we support up to 4K resolution processing. This ensures your HD output remains sharp for printing and large displays.</p>
                                </div>
                                <div class="faq-item">
                                    <h3 class="text-xl font-black mb-2">Does it add a watermark?</h3>
                                    <p class="text-slate-500 font-medium">No. Unlike other tools, RemovePro does not add any watermarks to your images, even on the free version.</p>
                                </div>
                                <div class="faq-item">
                                    <h3 class="text-xl font-black mb-2">Is signup required?</h3>
                                    <p class="text-slate-500 font-medium">No signup or registration is required to use the basic tool. You can just upload, process, and download instantly.</p>
                                </div>
                            </div>

                            <div class="mt-20 text-center p-12 bg-blue-600 rounded-[3rem] text-white shadow-2xl shadow-blue-500/20">
                                <h2 class="text-4xl font-black text-white mt-0 mb-4 tracking-tight">Start Removing Backgrounds Instantly</h2>
                                <p class="text-blue-100 mb-10 text-xl font-medium">Join 50k+ users who use RemovePro every month for their creative projects.</p>
                                <a href="/" class="inline-block bg-white text-blue-600 py-5 px-10 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-100 transition-all transform hover:scale-105 shadow-xl">
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
                        cover_image: '/blog/free-ai-background-remover-before-after.webp',
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
                                "name": "Is RemovePro really free?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, RemovePro is 100% free. You can remove backgrounds without watermark and download HD images without any hidden costs or registration."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "What is the maximum resolution supported?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "We support up to 4K resolution processing, ensuring your transparent PNGs remain high-definition for professional use."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Does it add a watermark to the output?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "No, RemovePro provides clean, watermark-free downloads even for free users."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Is signup or registration required?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "No signup is required. You can use the tool instantly in your browser without creating an account."
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

                        {post.slug === 'free-ai-background-remover-without-watermark' && (
                            <p className="text-slate-500 dark:text-slate-400 font-bold text-lg md:text-xl border-t border-slate-100 dark:border-slate-800 pt-6">
                                No Signup • No Watermark • 100% Free • HD Quality
                            </p>
                        )}
                    </div>

                    {/* Cover Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-[3rem] overflow-hidden mb-16 shadow-2xl shadow-blue-900/10"
                    >
                        <img
                            src={post.cover_image}
                            alt={post.slug === 'free-ai-background-remover-without-watermark' ? "Free AI background remover before and after comparison without watermark" : post.title}
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
