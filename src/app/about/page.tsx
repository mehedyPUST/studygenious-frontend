'use client';

import { BookOpen, Target, Eye, Sparkles, Users, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            {/* Header */}
            <section className="relative py-20 md:py-24 bg-white border-b border-emerald-100 overflow-hidden">
                <div className="absolute top-10 right-10 w-64 h-64 bg-emerald-100/30 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-48 h-48 bg-teal-100/30 rounded-full blur-3xl" />

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-[0.2em] mb-6 border border-emerald-200"
                    >
                        About Us
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-4"
                    >
                        Study
                        <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            Genius
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                        className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
                    >
                        AI-powered study planning platform that helps learners achieve their goals faster
                    </motion.p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16 md:py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Mission */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            whileHover={{ y: -6 }}
                            className="group relative bg-white rounded-3xl p-8 sm:p-10 border border-emerald-100 shadow-sm hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-500 overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="flex items-center gap-4 mb-5">
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    className="p-3.5 bg-emerald-100 rounded-2xl"
                                >
                                    <Target className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-700" strokeWidth={1.8} />
                                </motion.div>
                                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">Our Mission</h2>
                            </div>
                            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                                To democratize quality education by providing every learner with personalized,
                                AI-generated study plans that adapt to their unique needs and learning style.
                            </p>
                            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-emerald-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                        </motion.div>

                        {/* Vision */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            whileHover={{ y: -6 }}
                            className="group relative bg-white rounded-3xl p-8 sm:p-10 border border-teal-100 shadow-sm hover:shadow-xl hover:shadow-teal-100/50 transition-all duration-500 overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="flex items-center gap-4 mb-5">
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    className="p-3.5 bg-teal-100 rounded-2xl"
                                >
                                    <Eye className="w-6 h-6 sm:w-7 sm:h-7 text-teal-700" strokeWidth={1.8} />
                                </motion.div>
                                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">Our Vision</h2>
                            </div>
                            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                                To become the world&apos;s most trusted AI learning companion, empowering millions
                                of students and professionals to master any subject efficiently.
                            </p>
                            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-teal-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-16 md:py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="text-center mb-14"
                    >
                        <span className="inline-block text-emerald-600 text-sm font-semibold uppercase tracking-[0.2em] bg-emerald-100/60 px-4 py-1.5 rounded-full mb-4">
                            Why Us
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
                            Why StudyGenius?
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
                        {[
                            {
                                icon: Sparkles,
                                title: 'AI-Powered',
                                desc: 'Advanced language models generate comprehensive study plans tailored to your topic and difficulty level.',
                                gradient: 'from-emerald-500 to-teal-500',
                                bgLight: 'bg-emerald-50',
                                textColor: 'text-emerald-600',
                            },
                            {
                                icon: Users,
                                title: 'Community Driven',
                                desc: 'Discover plans created by other learners, share yours, and learn together as a community.',
                                gradient: 'from-teal-500 to-cyan-500',
                                bgLight: 'bg-teal-50',
                                textColor: 'text-teal-600',
                            },
                            {
                                icon: Shield,
                                title: 'Privacy First',
                                desc: 'Your data is encrypted and never shared. We believe in transparent, secure learning.',
                                gradient: 'from-emerald-600 to-emerald-400',
                                bgLight: 'bg-emerald-50',
                                textColor: 'text-emerald-600',
                            },
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                                    whileHover={{ y: -6 }}
                                    className={`group relative bg-gray-50 rounded-3xl p-6 sm:p-8 border border-gray-100 hover:shadow-xl hover:border-emerald-200 transition-all duration-500 overflow-hidden`}
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                        className={`w-12 h-12 sm:w-14 sm:h-14 ${item.bgLight} ${item.textColor} rounded-2xl flex items-center justify-center mb-5`}
                                    >
                                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.8} />
                                    </motion.div>
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                        {item.desc}
                                    </p>
                                    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-emerald-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-20 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="max-w-4xl mx-auto text-center bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 rounded-3xl p-10 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl shadow-emerald-200/50"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight tracking-tight">
                            Ready to Start Learning?
                        </h2>
                        <p className="text-emerald-100 text-sm sm:text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                            Join thousands of learners who are achieving their goals faster with AI-powered study plans.
                        </p>
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2.5 bg-white text-emerald-700 text-sm sm:text-base font-bold px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl hover:bg-emerald-50 hover:shadow-lg transition-all duration-300 group"
                        >
                            <BookOpen className="w-5 h-5" />
                            Get Started Free
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}