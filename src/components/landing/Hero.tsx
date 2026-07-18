'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20 pb-32 px-4">
            <div className="max-w-7xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                    <Sparkles className="w-4 h-4" />
                    AI-Powered Learning
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                    Generate Your Perfect<br />
                    <span className="text-primary-600">Study Plan</span> With AI
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
                    StudyGenius creates personalized study schedules, generates high‑quality notes, and recommends the best resources – all tailored to your goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/register"
                        className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                    >
                        Get Started Free
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                        href="/explore"
                        className="inline-flex items-center gap-2 bg-white text-slate-700 px-8 py-3.5 rounded-xl font-semibold border border-slate-200 hover:border-primary-300 transition-colors"
                    >
                        Explore Plans
                    </Link>
                </div>
                <div className="mt-16 relative">
                    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
                        <div className="grid grid-cols-3 gap-6 text-center">
                            <div>
                                <div className="text-3xl font-bold text-primary-600">10K+</div>
                                <div className="text-sm text-slate-500">Study Plans</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary-600">95%</div>
                                <div className="text-sm text-slate-500">Satisfaction</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary-600">50K+</div>
                                <div className="text-sm text-slate-500">Learners</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}