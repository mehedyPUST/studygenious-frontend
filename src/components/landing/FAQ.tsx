'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTA() {
    return (
        <section className="py-24 px-4 bg-white" id="cta">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="max-w-4xl mx-auto text-center bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 rounded-3xl p-12 md:p-16 relative overflow-hidden shadow-2xl shadow-emerald-200/50"
            >
                {/* Decorative background blobs */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-56 h-56 bg-teal-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-amber-300/5 rounded-full blur-2xl" />

                {/* Content */}
                <div className="relative z-10">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-5 py-2 rounded-full mb-8 border border-white/20 tracking-wide"
                    >
                        <Sparkles className="w-4 h-4" />
                        Get Started Today
                    </motion.div>

                    {/* Heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight"
                    >
                        Ready to Supercharge
                        <br />
                        Your Learning?
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-emerald-100 text-base sm:text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed font-normal"
                    >
                        Join thousands of learners who are achieving their goals faster
                        with AI‑powered study plans.
                    </motion.p>

                    {/* Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2.5 bg-white text-emerald-700 text-base sm:text-lg font-semibold px-8 sm:px-10 py-4 rounded-xl hover:bg-emerald-50 hover:shadow-xl transition-all duration-300 group"
                        >
                            Start Free Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </motion.div>

                    {/* Trust text */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="text-emerald-200/70 text-xs sm:text-sm mt-6 font-normal"
                    >
                        No credit card required · Free forever
                    </motion.p>
                </div>
            </motion.div>
        </section>
    );
}