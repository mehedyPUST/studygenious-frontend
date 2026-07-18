'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTA() {
    return (
        <section className="py-20 px-4 bg-white" id="cta">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="max-w-4xl mx-auto text-center bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 rounded-3xl p-12 md:p-16 relative overflow-hidden shadow-2xl shadow-emerald-200"
            >
                {/* Decorative background blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-amber-300/5 rounded-full blur-2xl" />

                {/* Content */}
                <div className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20"
                    >
                        <Sparkles className="w-4 h-4" />
                        Get Started Today
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight"
                    >
                        Ready to Supercharge Your Learning?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed"
                    >
                        Join thousands of learners who are achieving their goals faster with AI‑powered study plans.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2 bg-white text-emerald-700 px-8 py-3.5 rounded-xl font-bold hover:bg-emerald-50 hover:shadow-lg transition-all duration-300 group"
                        >
                            Start Free Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}