'use client';

import { Clock, Star, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Plan } from '@/types/plan';

interface PlanCardProps {
    plan: Plan;
    index?: number;
}

const difficultyConfig = {
    easy: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        dot: 'bg-emerald-400',
        label: 'Easy',
    },
    medium: {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        dot: 'bg-amber-400',
        label: 'Medium',
    },
    hard: {
        bg: 'bg-rose-50',
        text: 'text-rose-700',
        border: 'border-rose-200',
        dot: 'bg-rose-400',
        label: 'Hard',
    },
};

export default function PlanCard({ plan, index = 0 }: PlanCardProps) {
    const difficulty = difficultyConfig[plan.difficulty] || difficultyConfig.easy;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: 'easeOut',
            }}
            whileHover={{ y: -6 }}
            className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-emerald-200 transition-all duration-500 flex flex-col h-full shadow-sm hover:shadow-xl hover:shadow-emerald-100/50"
        >
            {/* Image Area */}
            <div className="relative h-44 sm:h-48 bg-gradient-to-br from-emerald-100 via-teal-50 to-emerald-50 flex items-center justify-center overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-emerald-200/30 rounded-full blur-xl" />
                <div className="absolute bottom-2 left-4 w-12 h-12 bg-teal-200/30 rounded-full blur-xl" />

                {plan.imageUrl ? (
                    <img
                        src={plan.imageUrl}
                        alt={plan.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                ) : (
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <BookOpen className="w-14 h-14 sm:w-16 sm:h-16 text-emerald-400/60" strokeWidth={1.5} />
                    </motion.div>
                )}

                {/* Top gradient line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5 flex flex-col flex-1">
                {/* Badges */}
                <div className="flex items-center gap-2 mb-3">
                    <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${difficulty.bg} ${difficulty.text} ${difficulty.border}`}
                    >
                        <span className={`w-1.5 h-1.5 rounded-full ${difficulty.dot}`} />
                        {difficulty.label}
                    </span>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                        {plan.subject}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-700 transition-colors duration-300 leading-snug">
                    {plan.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-500 mb-4 line-clamp-2 flex-1 leading-relaxed">
                    {plan.shortDescription}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                        <span className="font-medium">{plan.estimatedHours}h</span>
                    </div>

                    {plan.avgRating !== undefined && plan.avgRating > 0 ? (
                        <div className="flex items-center gap-1 text-xs sm:text-sm">
                            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-current" />
                            <span className="font-bold text-gray-700">{plan.avgRating.toFixed(1)}</span>
                            <span className="text-gray-400">({plan.reviewCount})</span>
                        </div>
                    ) : (
                        <span className="text-xs text-gray-400">No ratings</span>
                    )}
                </div>

                {/* View Details Button */}
                <Link
                    href={`/plans/${plan._id}`}
                    className="mt-4 group/btn w-full inline-flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-100 transition-all duration-300 border border-emerald-100 hover:border-emerald-200"
                >
                    View Details
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Link>
            </div>
        </motion.div>
    );
}