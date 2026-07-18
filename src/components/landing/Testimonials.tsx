'use client';

import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'University Student',
        content:
            'StudyGenius completely transformed how I prepare for exams. The AI-generated notes are incredibly detailed and saved me hours of work.',
        rating: 5,
        avatar: 'SJ',
        color: 'bg-emerald-100 text-emerald-700',
    },
    {
        name: 'Michael Chen',
        role: 'Software Developer',
        content:
            'The smart recommendations introduced me to resources I never would have found on my own. Highly recommend for anyone learning new tech.',
        rating: 5,
        avatar: 'MC',
        color: 'bg-teal-100 text-teal-700',
    },
    {
        name: 'Emily Rodriguez',
        role: 'High School Teacher',
        content:
            'I use StudyGenius to create lesson plans for my students. The adjustable difficulty levels make it perfect for different age groups.',
        rating: 5,
        avatar: 'ER',
        color: 'bg-emerald-100 text-emerald-700',
    },
];

export default function Testimonials() {
    return (
        <section className="py-24 px-4 bg-white" id="testimonials">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-center mb-16"
                >
                    <span className="inline-block text-emerald-600 text-sm font-semibold uppercase tracking-[0.2em] bg-emerald-100/60 px-4 py-1.5 rounded-full mb-4">
                        Testimonials
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
                        What Our Users Say
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of satisfied learners who accelerated their progress.
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
                            whileHover={{ y: -6 }}
                            className="group relative bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-500"
                        >
                            {/* Quote icon */}
                            <div className="absolute top-6 right-6 text-emerald-100 group-hover:text-emerald-200 transition-colors duration-300">
                                <Quote className="w-8 h-8 sm:w-10 sm:h-10" />
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-5">
                                {[...Array(t.rating)].map((_, j) => (
                                    <motion.div
                                        key={j}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.3,
                                            delay: 0.3 + i * 0.15 + j * 0.1,
                                            type: 'spring',
                                            stiffness: 300,
                                        }}
                                    >
                                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-current" />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed italic relative z-10">
                                &ldquo;{t.content}&rdquo;
                            </p>

                            {/* Divider */}
                            <div className="w-12 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mb-5 opacity-50 group-hover:opacity-100 group-hover:w-16 transition-all duration-500" />

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div
                                    className={`w-10 h-10 sm:w-12 sm:h-12 ${t.color} rounded-2xl flex items-center justify-center font-bold text-sm sm:text-base group-hover:scale-110 transition-transform duration-300`}
                                >
                                    {t.avatar}
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-emerald-700 transition-colors duration-300">
                                        {t.name}
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-500 font-medium">
                                        {t.role}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}