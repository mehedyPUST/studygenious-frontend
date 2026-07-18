'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/lib/api';
import { Sparkles, ThumbsUp, ThumbsDown, ExternalLink, Loader2, BookOpen, ArrowLeft, RefreshCw, Star } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Recommendation {
    title: string;
    url: string;
    type: string;
    reason: string;
    feedback?: boolean;
}

const TYPE_STYLES: Record<string, { bg: string; text: string; border: string; icon: string }> = {
    course: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: 'text-blue-500' },
    video: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', icon: 'text-rose-500' },
    book: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', icon: 'text-amber-500' },
    article: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', icon: 'text-purple-500' },
};

const fallbackRecommendations: Recommendation[] = [
    { title: 'Complete Programming Guide', url: 'https://www.coursera.org/', type: 'course', reason: 'Comprehensive course covering all key concepts from beginner to advanced.' },
    { title: 'Effective Learning Techniques', url: 'https://www.youtube.com/', type: 'video', reason: 'Hands‑on demonstrations and practical examples for faster learning.' },
    { title: 'Mastering Mathematics – Book', url: 'https://www.amazon.com/', type: 'book', reason: 'In‑depth reference with exercises and projects for self‑study.' },
    { title: 'Beginner Learning Path', url: 'https://www.khanacademy.org/', type: 'article', reason: 'Curated roadmap with free resources to kickstart your journey.' },
    { title: 'Community Forum & Q&A', url: 'https://stackoverflow.com/', type: 'article', reason: 'Get answers to your specific questions from a global community.' },
];

export default function RecommendationsPage() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { user, token, isLoading: authLoading } = useAuth();
    const [showFallback, setShowFallback] = useState(false);

    useEffect(() => {
        if (!authLoading && (!user || !token)) {
            router.push('/login');
        }
    }, [user, token, authLoading, router]);

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['recommendations'],
        queryFn: () => apiClient<{ success: boolean; data: Recommendation[] }>('/api/recommendations'),
        enabled: !!user && !!token,
        retry: 1,
    });

    const recommendations = data?.data || [];
    const displayRecommendations = recommendations.length > 0 ? recommendations : showFallback ? fallbackRecommendations : [];

    const feedbackMutation = useMutation({
        mutationFn: ({ title, liked }: { title: string; liked: boolean }) =>
            apiClient('/api/recommendations/feedback', { method: 'POST', body: JSON.stringify({ title, liked }) }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recommendations'] });
        },
    });

    const handleFeedback = (title: string, liked: boolean) => {
        feedbackMutation.mutate({ title, liked });
    };

    if (authLoading || !user || !token) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            {/* Header */}
            <section className="relative py-14 md:py-18 bg-white border-b border-emerald-100 overflow-hidden">
                <div className="absolute top-10 right-10 w-48 h-48 bg-emerald-100/30 rounded-full blur-3xl" />
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="max-w-7xl mx-auto px-4 relative z-10"
                >
                    <Link href="/" className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-semibold text-sm mb-4">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                    <div className="flex items-center gap-4">
                        <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-100 rounded-2xl flex items-center justify-center">
                            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />
                        </motion.div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">For You</h1>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">AI-powered recommendations based on your interests</p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Content */}
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    {isLoading && (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
                                    <div className="h-5 bg-gray-100 rounded w-1/4 mb-3" />
                                    <div className="h-6 bg-gray-100 rounded w-3/4 mb-2" />
                                    <div className="h-4 bg-gray-100 rounded w-full mb-4" />
                                    <div className="flex gap-2"><div className="h-8 w-16 bg-gray-100 rounded-lg" /><div className="h-8 w-16 bg-gray-100 rounded-lg" /></div>
                                </div>
                            ))}
                        </div>
                    )}

                    {isError && !isLoading && recommendations.length === 0 && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
                            <div className="w-20 h-20 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                                <Sparkles className="w-10 h-10 text-amber-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Couldn&apos;t Load Recommendations</h2>
                            <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
                                {showFallback ? 'Showing sample recommendations below.' : 'Explore plans to get personalized recommendations, or view samples.'}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link href="/explore" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-2xl font-semibold text-sm">Explore Plans</Link>
                                <button onClick={() => refetch()} className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-3 rounded-2xl font-semibold text-sm"><RefreshCw className="w-4 h-4" /> Try Again</button>
                                {!showFallback && <button onClick={() => setShowFallback(true)} className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-5 py-3 rounded-2xl font-semibold text-sm"><Star className="w-4 h-4" /> Show Samples</button>}
                            </div>
                        </motion.div>
                    )}

                    {!isLoading && !isError && recommendations.length === 0 && !showFallback && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
                            <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-5"><BookOpen className="w-10 h-10 text-emerald-600" /></div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">No Recommendations Yet</h2>
                            <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">Explore study plans to get personalized recommendations.</p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link href="/explore" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-2xl font-semibold text-sm">Explore Plans</Link>
                                <button onClick={() => setShowFallback(true)} className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-5 py-3 rounded-2xl font-semibold text-sm"><Star className="w-4 h-4" /> Show Samples</button>
                            </div>
                        </motion.div>
                    )}

                    <AnimatePresence>
                        {displayRecommendations.length > 0 && (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                                {displayRecommendations.map((rec, idx) => {
                                    const style = TYPE_STYLES[rec.type] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', icon: 'text-gray-500' };
                                    return (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
                                            whileHover={{ y: -4 }}
                                            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-emerald-100/30 hover:border-emerald-200 transition-all duration-300 p-5 sm:p-6 flex flex-col"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${style.bg} ${style.text} ${style.border}`}>
                                                    <Sparkles className={`w-3 h-3 ${style.icon}`} />
                                                    {rec.type.charAt(0).toUpperCase() + rec.type.slice(1)}
                                                </span>
                                                <a href={rec.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-600 transition-colors">
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors line-clamp-2">{rec.title}</h3>
                                            <p className="text-xs sm:text-sm text-gray-500 mb-4 flex-1 leading-relaxed">{rec.reason}</p>
                                            <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-50">
                                                <motion.button whileTap={{ scale: 0.9 }} onClick={() => handleFeedback(rec.title, true)} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${rec.feedback === true ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'}`}>
                                                    <ThumbsUp className="w-3.5 h-3.5" /> Helpful
                                                </motion.button>
                                                <motion.button whileTap={{ scale: 0.9 }} onClick={() => handleFeedback(rec.title, false)} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${rec.feedback === false ? 'bg-rose-100 text-rose-700' : 'bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-rose-600'}`}>
                                                    <ThumbsDown className="w-3.5 h-3.5" /> Not Helpful
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </main>
    );
}