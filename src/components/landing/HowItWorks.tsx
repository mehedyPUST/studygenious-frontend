'use client';

import { ClipboardList, Cpu, Target, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
    {
        icon: ClipboardList,
        step: '01',
        title: 'Input Your Topic',
        description: 'Tell us what you want to learn and your preferred difficulty level.',
        gradient: 'from-emerald-500 to-teal-500',
        bgLight: 'bg-emerald-50',
        textColor: 'text-emerald-600',
    },
    {
        icon: Cpu,
        step: '02',
        title: 'AI Generates Plan',
        description: 'Our AI creates a complete study plan with modules, notes, and summaries.',
        gradient: 'from-teal-500 to-cyan-500',
        bgLight: 'bg-teal-50',
        textColor: 'text-teal-600',
    },
    {
        icon: Target,
        step: '03',
        title: 'Track & Achieve',
        description: 'Follow the plan, mark progress, and get recommendations to go further.',
        gradient: 'from-emerald-600 to-emerald-400',
        bgLight: 'bg-emerald-50',
        textColor: 'text-emerald-600',
    },
];

export default function HowItWorks() {
    return (
        <section className="py-24 px-4 bg-gray-50" id="how-it-works">
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
                        How It Works
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
                        Three Simple Steps
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Get your personalized study plan in minutes.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
                    {/* Connecting line (desktop only) */}
                    <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-emerald-200 via-teal-200 to-emerald-200 -z-0" />

                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isLast = index === steps.length - 1;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2, ease: 'easeOut' }}
                                className="relative z-10 text-center group"
                            >
                                {/* Step number badge */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: 'spring', stiffness: 200, delay: 0.3 + index * 0.2 }}
                                    className="absolute -top-3 right-1/4 w-8 h-8 bg-white rounded-full border-2 border-emerald-200 flex items-center justify-center shadow-sm"
                                >
                                    <span className="text-xs font-bold text-emerald-600">{step.step}</span>
                                </motion.div>

                                {/* Icon circle */}
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto ${step.bgLight} ${step.textColor} rounded-full flex items-center justify-center mb-6 shadow-lg shadow-emerald-100 group-hover:shadow-xl group-hover:shadow-emerald-200 transition-shadow duration-300 relative`}
                                >
                                    <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-emerald-300 scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                    <Icon className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={1.8} />
                                </motion.div>

                                {/* Step label */}
                                <div className="text-emerald-600 font-bold text-sm mb-2 tracking-wide uppercase">
                                    Step {step.step}
                                </div>

                                {/* Title */}
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors duration-300">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xs mx-auto">
                                    {step.description}
                                </p>

                                {/* Arrow (except last) */}
                                {!isLast && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 1 + index * 0.3 }}
                                        className="hidden md:flex justify-center mt-6 text-emerald-300"
                                    >
                                        <ArrowRight className="w-6 h-6" />
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}