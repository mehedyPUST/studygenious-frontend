'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/lib/api';
import { Plus, Eye, Trash2, Loader2, BookOpen, Clock, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Plan {
    _id: string;
    title: string;
    shortDescription: string;
    subject: string;
    difficulty: 'easy' | 'medium' | 'hard';
    estimatedHours: number;
    createdAt: string;
}

const DIFFICULTY_STYLES: Record<string, { bg: string; text: string; border: string; dot: string }> = {
    easy: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-400' },
    medium: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-400' },
    hard: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', dot: 'bg-rose-400' },
};

export default function ManagePlansPage() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { user, token, isLoading: authLoading } = useAuth();
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [deleteError, setDeleteError] = useState('');

    useEffect(() => {
        if (!authLoading && (!user || !token)) {
            router.push('/login');
        }
    }, [user, token, authLoading, router]);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['my-plans'],
        queryFn: () => apiClient<{ success: boolean; data: Plan[] }>('/api/plans/manage'),
        enabled: !!user && !!token,
    });

    const plans = data?.data || [];

    const deleteMutation = useMutation({
        mutationFn: (planId: string) => apiClient(`/api/plans/${planId}`, { method: 'DELETE' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-plans'] });
            setDeleteConfirm(null);
            setDeleteError('');
        },
        onError: (err: any) => {
            setDeleteError(err.message || 'Failed to delete plan.');
        },
    });

    const handleDelete = (planId: string) => deleteMutation.mutate(planId);

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    if (authLoading || !user || !token) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            {/* Page Header */}
            <section className="relative py-14 md:py-18 bg-white border-b border-emerald-100 overflow-hidden">
                <div className="absolute top-10 right-10 w-48 h-48 bg-emerald-100/30 rounded-full blur-3xl" />
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="max-w-7xl mx-auto px-4 relative z-10"
                >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-[0.2em] mb-3 border border-emerald-200">
                                My Plans
                            </span>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
                                Manage Your Study Plans
                            </h1>
                            <p className="mt-2 text-sm sm:text-base text-gray-600">View or delete your created study plans</p>
                        </div>
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                            <Link
                                href="/items/add"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl font-semibold text-sm hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-200 group"
                            >
                                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                                Create New Plan
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Plans List */}
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Delete Error */}
                    <AnimatePresence>
                        {deleteError && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-sm font-medium flex items-center gap-2"
                            >
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                {deleteError}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Loading */}
                    {isLoading && (
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
                                    <div className="h-6 bg-gray-100 rounded-lg w-3/4 mb-3" />
                                    <div className="h-4 bg-gray-100 rounded-lg w-1/2 mb-4" />
                                    <div className="flex gap-3">
                                        <div className="h-9 w-20 bg-gray-100 rounded-xl" />
                                        <div className="h-9 w-20 bg-gray-100 rounded-xl" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Error */}
                    {isError && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
                            <div className="w-20 h-20 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                                <AlertCircle className="w-10 h-10 text-rose-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Failed to load</h3>
                            <p className="text-sm text-gray-500">Please try again later.</p>
                        </motion.div>
                    )}

                    {/* Empty */}
                    {!isLoading && !isError && plans.length === 0 && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                className="w-24 h-24 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6"
                            >
                                <BookOpen className="w-12 h-12 text-emerald-600" />
                            </motion.div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Plans Yet</h3>
                            <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
                                Start by creating your first AI-powered study plan!
                            </p>
                            <Link
                                href="/items/add"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-2xl font-semibold text-sm hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-200"
                            >
                                <Sparkles className="w-4 h-4" />
                                Create Your First Plan
                            </Link>
                        </motion.div>
                    )}

                    {/* Plans List */}
                    {!isLoading && !isError && plans.length > 0 && (
                        <>
                            {/* Desktop Header */}
                            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-[0.15em]">
                                <div className="col-span-4">Plan</div>
                                <div className="col-span-2">Subject</div>
                                <div className="col-span-2">Difficulty</div>
                                <div className="col-span-1">Hours</div>
                                <div className="col-span-1">Date</div>
                                <div className="col-span-2">Actions</div>
                            </div>

                            <div className="space-y-3">
                                <AnimatePresence>
                                    {plans.map((plan) => {
                                        const diff = DIFFICULTY_STYLES[plan.difficulty] || DIFFICULTY_STYLES.easy;
                                        return (
                                            <motion.div
                                                key={plan._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: -50 }}
                                                transition={{ duration: 0.4, ease: 'easeOut' }}
                                                layout
                                                whileHover={{ y: -2 }}
                                                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-emerald-100/30 hover:border-emerald-200 transition-all duration-300 overflow-hidden"
                                            >
                                                <div className="p-4 sm:p-6">
                                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-center">
                                                        <div className="md:col-span-4">
                                                            <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                                                                {plan.title}
                                                            </h3>
                                                            <p className="text-xs sm:text-sm text-gray-500 line-clamp-1 mt-0.5">
                                                                {plan.shortDescription}
                                                            </p>
                                                        </div>
                                                        <div className="md:col-span-2">
                                                            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-600">
                                                                <BookOpen className="w-3.5 h-3.5 text-gray-400" />
                                                                {plan.subject}
                                                            </span>
                                                        </div>
                                                        <div className="md:col-span-2">
                                                            <span
                                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${diff.bg} ${diff.text} ${diff.border}`}
                                                            >
                                                                <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />
                                                                {plan.difficulty.charAt(0).toUpperCase() + plan.difficulty.slice(1)}
                                                            </span>
                                                        </div>
                                                        <div className="md:col-span-1">
                                                            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-600">
                                                                <Clock className="w-3.5 h-3.5 text-gray-400" />
                                                                {plan.estimatedHours}h
                                                            </span>
                                                        </div>
                                                        <div className="md:col-span-1 text-xs sm:text-sm text-gray-500">
                                                            {formatDate(plan.createdAt)}
                                                        </div>
                                                        <div className="md:col-span-2 flex items-center gap-2">
                                                            <Link
                                                                href={`/plans/${plan._id}`}
                                                                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-xs sm:text-sm font-semibold hover:bg-emerald-100 transition-colors"
                                                            >
                                                                <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                                View
                                                            </Link>

                                                            {deleteConfirm === plan._id ? (
                                                                <div className="flex items-center gap-2">
                                                                    <motion.button
                                                                        whileTap={{ scale: 0.9 }}
                                                                        onClick={() => handleDelete(plan._id)}
                                                                        disabled={deleteMutation.isPending}
                                                                        className="px-3 py-2 bg-rose-600 text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-rose-700 transition-colors disabled:opacity-50 flex items-center gap-1"
                                                                    >
                                                                        {deleteMutation.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Confirm'}
                                                                    </motion.button>
                                                                    <button
                                                                        onClick={() => setDeleteConfirm(null)}
                                                                        className="px-3 py-2 bg-gray-100 text-gray-600 rounded-xl text-xs sm:text-sm font-semibold hover:bg-gray-200 transition-colors"
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <motion.button
                                                                    whileTap={{ scale: 0.9 }}
                                                                    onClick={() => setDeleteConfirm(plan._id)}
                                                                    className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-xs sm:text-sm font-semibold hover:bg-rose-100 transition-colors"
                                                                >
                                                                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                                    Delete
                                                                </motion.button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="md:hidden border-t border-gray-50 px-4 sm:px-6 py-3 flex items-center justify-between text-xs text-gray-400">
                                                    <span>{formatDate(plan.createdAt)}</span>
                                                    <span>{plan.estimatedHours}h</span>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}