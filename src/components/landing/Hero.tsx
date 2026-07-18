'use client';

import { ArrowRight, Sparkles, Star, Users, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const statsData = [
    { icon: BookOpen, value: '10K+', label: 'Study Plans' },
    { icon: Star, value: '95%', label: 'Satisfaction' },
    { icon: Users, value: '50K+', label: 'Learners' },
];

export default function Hero() {
    return (
        <section className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 pt-24 md:pt-32 pb-36 md:pb-44 px-4 overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-100/10 rounded-full blur-3xl -z-10" />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(5,150,105,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(5,150,105,0.03)_1px,transparent_1px)] bg-[size:64px_64px] -z-10" />

            <div className="max-w-7xl mx-auto text-center relative z-10">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-5 py-2 rounded-full text-sm font-semibold mb-8 border border-emerald-200 shadow-sm shadow-emerald-100"
                >
                    <Sparkles className="w-4 h-4" />
                    <span className="tracking-wide">AI-Powered Learning</span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight"
                >
                    Generate Your Perfect
                    <br />
                    <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
                        Study Plan
                    </span>{' '}
                    With AI
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                    className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
                >
                    StudyGenius creates personalized study schedules, generates high‑quality
                    notes, and recommends the best resources – all tailored to your goals.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                    className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                >
                    <Link
                        href="/register"
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-base sm:text-lg font-semibold px-8 sm:px-10 py-4 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg shadow-emerald-200 group"
                    >
                        Get Started Free
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                    <Link
                        href="/explore"
                        className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 text-base sm:text-lg font-semibold px-8 sm:px-10 py-4 rounded-xl border-2 border-gray-200 hover:border-emerald-300 hover:text-emerald-700 transition-all duration-300 group"
                    >
                        Explore Plans
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </motion.div>

                {/* Stats Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
                    className="relative max-w-3xl mx-auto"
                >
                    <div className="bg-white rounded-2xl shadow-xl shadow-emerald-100/50 border border-gray-100 p-6 sm:p-8">
                        <div className="grid grid-cols-3 gap-4 sm:gap-8">
                            {statsData.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                        className="text-center group"
                                    >
                                        <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-emerald-50 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300">
                                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                                        </div>
                                        <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-1 tracking-tight">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-500 font-medium">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}