'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/lib/api';
import { Sparkles, RefreshCw, Plus, ArrowLeft, Loader2, BookOpen, Clock, Image, Wand2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const planSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200),
    shortDescription: z.string().min(1, 'Short description is required').max(500),
    fullDescription: z.string().min(1, 'Full description is required'),
    subject: z.string().min(1, 'Subject is required'),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    estimatedHours: z.number().min(0.5, 'Minimum 0.5 hours'),
    imageUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

type PlanForm = z.infer<typeof planSchema>;

const SUBJECTS = ['Math', 'Physics', 'Computer Science', 'History', 'Biology', 'Chemistry', 'Literature', 'Art', 'Other'];

const DIFFICULTY_COLORS: Record<string, { bg: string; text: string; border: string; dot: string }> = {
    easy: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-300', dot: 'bg-emerald-400' },
    medium: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-300', dot: 'bg-amber-400' },
    hard: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-300', dot: 'bg-rose-400' },
};

export default function AddPlanPage() {
    const router = useRouter();
    const { user, token, isLoading: authLoading } = useAuth();
    const [serverError, setServerError] = useState('');
    const [serverSuccess, setServerSuccess] = useState('');
    const [aiLoading, setAiLoading] = useState(false);
    const [outputLength, setOutputLength] = useState<'short' | 'medium' | 'long'>('medium');
    const [previousAiOutput, setPreviousAiOutput] = useState<any>(null);
    const [refinementInstruction, setRefinementInstruction] = useState('');

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<PlanForm>({
        resolver: zodResolver(planSchema),
        defaultValues: { difficulty: 'medium', estimatedHours: 5 },
    });

    const selectedDifficulty = watch('difficulty');
    const diffStyle = DIFFICULTY_COLORS[selectedDifficulty] || DIFFICULTY_COLORS.easy;

    // Redirect if not logged in
    useEffect(() => {
        if (!authLoading && (!user || !token)) {
            router.push('/login');
        }
    }, [user, token, authLoading, router]);

    if (authLoading || !user || !token) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
            </main>
        );
    }

    const handleAIGenerate = async () => {
        const title = (document.getElementById('title') as HTMLInputElement)?.value;
        const difficulty = (document.getElementById('difficulty') as HTMLSelectElement)?.value;

        if (!title) {
            setServerError('Please enter a title first before using AI generation.');
            return;
        }

        try {
            setAiLoading(true);
            setServerError('');

            const response = await apiClient<{
                success: boolean;
                data: { introduction: string; modules: { title: string; topics: string[] }[]; summary: string };
            }>('/api/ai/generate-plan-content', {
                method: 'POST',
                body: JSON.stringify({
                    topic: title,
                    difficulty: difficulty || 'medium',
                    outputLength,
                    previousOutput: previousAiOutput,
                    refinementInstruction: refinementInstruction || undefined,
                }),
            });

            const data = response.data;
            setValue('fullDescription', `${data.introduction}\n\n${data.summary}`);
            setValue('shortDescription', data.introduction.substring(0, 197) + '...');
            setPreviousAiOutput(data);
            setRefinementInstruction('');
            setServerSuccess('AI content generated successfully! You can edit or regenerate.');
        } catch (err: any) {
            setServerError(err.message || 'AI generation failed. Please try again.');
        } finally {
            setAiLoading(false);
        }
    };

    const onSubmit = async (data: PlanForm) => {
        try {
            setServerError('');
            setServerSuccess('');
            await apiClient('/api/plans', {
                method: 'POST',
                body: JSON.stringify({ ...data, imageUrl: data.imageUrl || undefined }),
            });
            router.push('/items/manage');
        } catch (err: any) {
            setServerError(err.message || 'Failed to create plan.');
        }
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            {/* Page Header */}
            <section className="relative py-14 md:py-18 bg-white border-b border-emerald-100 overflow-hidden">
                <div className="absolute top-10 right-10 w-48 h-48 bg-emerald-100/30 rounded-full blur-3xl" />
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto px-4 text-center relative z-10"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-[0.2em] mb-4 border border-emerald-200">
                        Create New Plan
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
                        Design Your Study Plan
                    </h1>
                    <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                        Fill in the details below or let AI generate content for you
                    </p>
                    <Link
                        href="/items/manage"
                        className="inline-flex items-center gap-2 mt-4 text-emerald-600 hover:text-emerald-700 font-semibold text-sm transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Manage Plans
                    </Link>
                </motion.div>
            </section>

            {/* Form & AI Sidebar */}
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Messages */}
                    {serverError && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-sm font-medium max-w-4xl mx-auto">
                            {serverError}
                        </motion.div>
                    )}
                    {serverSuccess && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-sm font-medium max-w-4xl mx-auto">
                            {serverSuccess}
                        </motion.div>
                    )}

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Form */}
                        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="lg:col-span-2">
                            <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm shadow-emerald-100/30 p-6 sm:p-8 md:p-10">
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    {/* Title */}
                                    <div>
                                        <label htmlFor="title" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                                            Plan Title <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            id="title"
                                            {...register('title')}
                                            className="w-full px-4 sm:px-5 py-3 sm:py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm sm:text-base placeholder-gray-400"
                                            placeholder="e.g., Introduction to Calculus"
                                        />
                                        {errors.title && <p className="mt-1.5 text-xs text-rose-500 font-medium">{errors.title.message}</p>}
                                    </div>

                                    {/* Short Description */}
                                    <div>
                                        <label htmlFor="shortDescription" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                                            Short Description <span className="text-rose-500">*</span>
                                        </label>
                                        <textarea
                                            id="shortDescription"
                                            rows={2}
                                            {...register('shortDescription')}
                                            className="w-full px-4 sm:px-5 py-3 sm:py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none text-sm sm:text-base placeholder-gray-400"
                                            placeholder="A brief overview of your study plan"
                                        />
                                        {errors.shortDescription && <p className="mt-1.5 text-xs text-rose-500 font-medium">{errors.shortDescription.message}</p>}
                                    </div>

                                    {/* Full Description */}
                                    <div>
                                        <label htmlFor="fullDescription" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                                            Full Description <span className="text-rose-500">*</span>
                                        </label>
                                        <textarea
                                            id="fullDescription"
                                            rows={8}
                                            {...register('fullDescription')}
                                            className="w-full px-4 sm:px-5 py-3 sm:py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none text-sm sm:text-base placeholder-gray-400"
                                            placeholder="Detailed description, learning objectives, and modules"
                                        />
                                        {errors.fullDescription && <p className="mt-1.5 text-xs text-rose-500 font-medium">{errors.fullDescription.message}</p>}
                                    </div>

                                    {/* Subject & Difficulty */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                                        <div>
                                            <label htmlFor="subject" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                                                Subject <span className="text-rose-500">*</span>
                                            </label>
                                            <select
                                                id="subject"
                                                {...register('subject')}
                                                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white text-sm sm:text-base font-medium text-gray-800 cursor-pointer"
                                            >
                                                <option value="">Select a subject</option>
                                                {SUBJECTS.map((s) => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                            {errors.subject && <p className="mt-1.5 text-xs text-rose-500 font-medium">{errors.subject.message}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="difficulty" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                                                Difficulty <span className="text-rose-500">*</span>
                                            </label>
                                            <select
                                                id="difficulty"
                                                {...register('difficulty')}
                                                className={`w-full px-4 sm:px-5 py-3 sm:py-3.5 border rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none bg-white text-sm sm:text-base font-medium text-gray-800 cursor-pointer transition-colors ${diffStyle.border} ${diffStyle.bg}`}
                                            >
                                                <option value="easy">Easy</option>
                                                <option value="medium">Medium</option>
                                                <option value="hard">Hard</option>
                                            </select>
                                            {errors.difficulty && <p className="mt-1.5 text-xs text-rose-500 font-medium">{errors.difficulty.message}</p>}
                                        </div>
                                    </div>

                                    {/* Estimated Hours & Image URL */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                                        <div>
                                            <label htmlFor="estimatedHours" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                                                <Clock className="w-4 h-4 inline mr-1.5 text-gray-400" />
                                                Estimated Hours <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                id="estimatedHours"
                                                type="number"
                                                step="0.5"
                                                {...register('estimatedHours', { valueAsNumber: true })}
                                                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm sm:text-base placeholder-gray-400"
                                                placeholder="e.g., 10"
                                            />
                                            {errors.estimatedHours && <p className="mt-1.5 text-xs text-rose-500 font-medium">{errors.estimatedHours.message}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="imageUrl" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                                                <Image className="w-4 h-4 inline mr-1.5 text-gray-400" />
                                                Image URL <span className="text-gray-400 text-xs font-normal">(optional)</span>
                                            </label>
                                            <input
                                                id="imageUrl"
                                                {...register('imageUrl')}
                                                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm sm:text-base placeholder-gray-400"
                                                placeholder="https://example.com/image.jpg"
                                            />
                                            {errors.imageUrl && <p className="mt-1.5 text-xs text-rose-500 font-medium">{errors.imageUrl.message}</p>}
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
                                    >
                                        {isSubmitting ? (
                                            <><Loader2 className="w-5 h-5 animate-spin" /> Creating Plan...</>
                                        ) : (
                                            <><Plus className="w-4 h-4 sm:w-5 sm:h-5" /> Create Study Plan</>
                                        )}
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>

                        {/* AI Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:col-span-1"
                        >
                            <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm shadow-emerald-100/30 p-6 sm:p-8 sticky top-24">
                                <div className="flex items-center gap-3 mb-5">
                                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="p-2.5 bg-emerald-100 rounded-2xl">
                                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                                    </motion.div>
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">AI Generator</h3>
                                </div>
                                <p className="text-gray-500 text-xs sm:text-sm mb-6 leading-relaxed">
                                    Let AI generate a complete study plan description based on your title and difficulty.
                                </p>

                                {/* Output Length */}
                                <div className="mb-5">
                                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-3">Output Length</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {(['short', 'medium', 'long'] as const).map((len) => (
                                            <motion.button
                                                key={len}
                                                type="button"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setOutputLength(len)}
                                                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${outputLength === len
                                                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                                                        : 'bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
                                                    }`}
                                            >
                                                {len.charAt(0).toUpperCase() + len.slice(1)}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Refinement */}
                                {previousAiOutput && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-5">
                                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-3">Refinement Instruction</label>
                                        <input
                                            type="text"
                                            value={refinementInstruction}
                                            onChange={(e) => setRefinementInstruction(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder-gray-400"
                                            placeholder="e.g., Make it more practical"
                                        />
                                    </motion.div>
                                )}

                                {/* Generate Button */}
                                <motion.button
                                    type="button"
                                    onClick={handleAIGenerate}
                                    disabled={aiLoading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3.5 rounded-xl font-semibold text-sm hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-md shadow-emerald-200"
                                >
                                    {aiLoading ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
                                    ) : previousAiOutput ? (
                                        <><RefreshCw className="w-4 h-4" /> Regenerate</>
                                    ) : (
                                        <><Wand2 className="w-4 h-4" /> Generate with AI</>
                                    )}
                                </motion.button>

                                {previousAiOutput && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                        <p className="text-xs text-emerald-700 font-medium">✓ Content generated! You can edit or regenerate.</p>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}