'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { publicApi, apiClient } from '@/lib/api';
import { Star, Clock, BookOpen, User, Send, Loader2, ArrowLeft, AlertCircle, Calendar } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Plan {
    _id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    subject: string;
    difficulty: 'easy' | 'medium' | 'hard';
    estimatedHours: number;
    imageUrl?: string;
    avgRating?: number;
    reviewCount?: number;
    createdAt: string;
}

interface Review {
    _id: string;
    userId: string;
    rating: number;
    comment: string;
    createdAt: string;
}

const DIFFICULTY_STYLES: Record<string, { bg: string; text: string; border: string; dot: string }> = {
    easy: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-400' },
    medium: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-400' },
    hard: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', dot: 'bg-rose-400' },
};

export default function PlanDetailsPage() {
    const params = useParams();
    const planId = params.id as string;
    const queryClient = useQueryClient();
    const { user, token } = useAuth();
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewComment, setReviewComment] = useState('');
    const [reviewError, setReviewError] = useState('');
    const [reviewSuccess, setReviewSuccess] = useState('');

    const { data: planData, isLoading: planLoading, isError: planError } = useQuery({
        queryKey: ['plan', planId],
        queryFn: () => publicApi<{ success: boolean; data: { plan: Plan; related: Plan[] } }>(`/api/plans/${planId}`),
    });

    const { data: reviewsData, isLoading: reviewsLoading } = useQuery({
        queryKey: ['reviews', planId],
        queryFn: () => publicApi<{ success: boolean; data: Review[] }>(`/api/plans/${planId}/reviews`),
    });

    const plan = planData?.data?.plan;
    const relatedPlans = planData?.data?.related || [];
    const reviews = reviewsData?.data || [];

    const reviewMutation = useMutation({
        mutationFn: () =>
            apiClient(`/api/plans/${planId}/reviews`, {
                method: 'POST',
                body: JSON.stringify({ rating: reviewRating, comment: reviewComment }),
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews', planId] });
            queryClient.invalidateQueries({ queryKey: ['plan', planId] });
            setReviewComment('');
            setReviewRating(5);
            setReviewSuccess('Review submitted successfully!');
            setReviewError('');
        },
        onError: (err: any) => {
            setReviewError(err.message || 'Failed to submit review.');
            setReviewSuccess('');
        },
    });

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !token) { setReviewError('Please login to submit a review.'); return; }
        if (!reviewComment.trim()) { setReviewError('Please enter a comment.'); return; }
        reviewMutation.mutate();
    };

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    if (planLoading) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
            </main>
        );
    }

    if (planError || !plan) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                    <div className="w-20 h-20 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                        <AlertCircle className="w-10 h-10 text-rose-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Plan Not Found</h2>
                    <p className="text-sm text-gray-500 mb-6">This plan doesn&apos;t exist or has been removed.</p>
                    <Link href="/explore" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-2xl font-semibold text-sm">
                        <ArrowLeft className="w-4 h-4" /> Back to Explore
                    </Link>
                </motion.div>
            </main>
        );
    }

    const diff = DIFFICULTY_STYLES[plan.difficulty] || DIFFICULTY_STYLES.easy;

    return (
        <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            {/* Header */}
            <section className="relative py-14 md:py-18 bg-white border-b border-emerald-100 overflow-hidden">
                <div className="absolute top-10 right-10 w-48 h-48 bg-emerald-100/30 rounded-full blur-3xl" />
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
                        <Link href="/explore" className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-semibold text-sm mb-4">
                            <ArrowLeft className="w-4 h-4" /> Back to Explore
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="flex flex-col md:flex-row md:items-start md:justify-between gap-6"
                    >
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${diff.bg} ${diff.text} ${diff.border}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />
                                    {plan.difficulty.charAt(0).toUpperCase() + plan.difficulty.slice(1)}
                                </span>
                                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
                                    <BookOpen className="w-4 h-4 text-gray-400" /> {plan.subject}
                                </span>
                                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
                                    <Clock className="w-4 h-4 text-gray-400" /> {plan.estimatedHours}h
                                </span>
                                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
                                    <Calendar className="w-4 h-4 text-gray-400" /> {formatDate(plan.createdAt)}
                                </span>
                            </div>

                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-tight tracking-tight">
                                {plan.title}
                            </h1>
                            <p className="text-sm sm:text-base text-gray-600">{plan.shortDescription}</p>

                            {plan.avgRating !== undefined && plan.avgRating > 0 && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center gap-2 mt-4">
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} className={`w-4 h-4 sm:w-5 sm:h-5 ${star <= Math.round(plan.avgRating || 0) ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                                        ))}
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">{plan.avgRating.toFixed(1)}</span>
                                    <span className="text-xs sm:text-sm text-gray-500">({plan.reviewCount} {plan.reviewCount === 1 ? 'review' : 'reviews'})</span>
                                </motion.div>
                            )}
                        </div>

                        {plan.imageUrl && (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="w-full md:w-64 h-48 rounded-2xl overflow-hidden shadow-lg shadow-emerald-100/50">
                                <img src={plan.imageUrl} alt={plan.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
                    {/* Main */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-6 sm:p-8"
                        >
                            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4">About This Plan</h2>
                            <div className="text-sm sm:text-base text-gray-600 leading-relaxed whitespace-pre-line">{plan.fullDescription}</div>
                        </motion.div>

                        {/* Reviews */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-6 sm:p-8"
                        >
                            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-6">Reviews ({reviews.length})</h2>

                            {user && token ? (
                                <form onSubmit={handleSubmitReview} className="mb-8 p-5 sm:p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                                    <h3 className="font-bold text-gray-900 mb-4 text-sm sm:text-base">Write a Review</h3>
                                    <AnimatePresence>
                                        {reviewError && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium">{reviewError}</motion.div>}
                                        {reviewSuccess && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-4 p-3 bg-emerald-100 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-medium">{reviewSuccess}</motion.div>}
                                    </AnimatePresence>

                                    <div className="mb-4">
                                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Rating</label>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <motion.button key={star} type="button" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={() => setReviewRating(star)}>
                                                    <Star className={`w-6 h-6 sm:w-7 sm:h-7 transition-colors ${star <= reviewRating ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Comment</label>
                                        <textarea value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none text-sm" placeholder="Share your thoughts..." />
                                    </div>

                                    <motion.button type="submit" disabled={reviewMutation.isPending} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 sm:px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-emerald-700 transition-all disabled:opacity-50">
                                        {reviewMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                        Submit Review
                                    </motion.button>
                                </form>
                            ) : (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-200 text-center">
                                    <p className="text-sm text-gray-600 mb-3">Please login to leave a review.</p>
                                    <Link href="/login" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm">Login to Review</Link>
                                </motion.div>
                            )}

                            {reviewsLoading ? (
                                <div className="space-y-4">{[...Array(2)].map((_, i) => (<div key={i} className="animate-pulse space-y-2"><div className="h-4 bg-gray-100 rounded w-1/4" /><div className="h-4 bg-gray-100 rounded w-3/4" /></div>))}</div>
                            ) : reviews.length === 0 ? (
                                <p className="text-sm text-gray-500 text-center py-8">No reviews yet. Be the first!</p>
                            ) : (
                                <div className="space-y-4">
                                    {reviews.map((review) => (
                                        <motion.div
                                            key={review._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, ease: 'easeOut' }}
                                            className="p-4 sm:p-5 bg-gray-50 rounded-2xl border border-gray-100"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center"><User className="w-4 h-4 text-emerald-600" /></div>
                                                    <span className="text-xs sm:text-sm font-semibold text-gray-700">User</span>
                                                </div>
                                                <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map((star) => (<Star key={star} className={`w-3.5 h-3.5 ${star <= review.rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />))}</div>
                                            </div>
                                            <p className="text-sm text-gray-600">{review.comment}</p>
                                            <p className="text-xs text-gray-400 mt-2">{formatDate(review.createdAt)}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-6 sm:p-8 sticky top-24">
                            <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-5">Related Plans</h3>
                            {relatedPlans.length === 0 ? (
                                <p className="text-sm text-gray-500">No related plans found.</p>
                            ) : (
                                <div className="space-y-3">
                                    {relatedPlans.map((related) => {
                                        const rd = DIFFICULTY_STYLES[related.difficulty] || DIFFICULTY_STYLES.easy;
                                        return (
                                            <motion.div key={related._id} whileHover={{ x: 4 }}>
                                                <Link href={`/plans/${related._id}`} className="block p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all group">
                                                    <h4 className="font-bold text-sm text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2">{related.title}</h4>
                                                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                                        <span className="inline-flex items-center gap-1"><BookOpen className="w-3 h-3" />{related.subject}</span>
                                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${rd.bg} ${rd.text} ${rd.border}`}>
                                                            <span className={`w-1 h-1 rounded-full ${rd.dot}`} />{related.difficulty}
                                                        </span>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}