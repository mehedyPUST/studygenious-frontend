'use client';

import { Brain, BookOpen, BarChart3, Wand2, Globe, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: Brain,
        title: 'AI Content Generation',
        description: 'Generate detailed study notes, summaries, and flashcards from any topic using advanced AI.',
        gradient: 'from-emerald-500 to-teal-500',
        bgLight: 'bg-emerald-50',
        textColor: 'text-emerald-600',
    },
    {
        icon: BookOpen,
        title: 'Smart Recommendations',
        description: 'Get personalized resource suggestions based on your learning style and progress.',
        gradient: 'from-teal-500 to-cyan-500',
        bgLight: 'bg-teal-50',
        textColor: 'text-teal-600',
    },
    {
        icon: BarChart3,
        title: 'Progress Tracking',
        description: 'Visualize your study hours, completed modules, and achievements over time.',
        gradient: 'from-emerald-600 to-emerald-400',
        bgLight: 'bg-emerald-50',
        textColor: 'text-emerald-600',
    },
    {
        icon: Wand2,
        title: 'Customizable Plans',
        description: 'Adjust difficulty, duration, and modules to fit your exact needs and schedule.',
        gradient: 'from-teal-600 to-teal-400',
        bgLight: 'bg-teal-50',
        textColor: 'text-teal-600',
    },
    {
        icon: Globe,
        title: 'Multi‑Subject Support',
        description: 'From Math to Machine Learning – any subject, any level, all in one place.',
        gradient: 'from-emerald-500 to-emerald-300',
        bgLight: 'bg-emerald-50',
        textColor: 'text-emerald-600',
    },
    {
        icon: Shield,
        title: 'Secure & Private',
        description: 'Your data and study materials are encrypted and never shared without permission.',
        gradient: 'from-teal-500 to-teal-300',
        bgLight: 'bg-teal-50',
        textColor: 'text-teal-600',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
};

export default function Features() {
    return (
        <section className="py-24 px-4 bg-white" id="features">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-center mb-16"
                >
                    <span className="inline-block text-emerald-600 text-sm font-semibold uppercase tracking-[0.2em] bg-emerald-100/60 px-4 py-1.5 rounded-full mb-4">
                        Features
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
                        Why Choose StudyGenius?
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Everything you need to accelerate your learning journey with the power of AI.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-30px' }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                >
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className={`group relative bg-white rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-emerald-200 hover:-translate-y-1 overflow-hidden`}
                            >
                                {/* Top gradient line */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Icon */}
                                <div
                                    className={`w-12 h-12 sm:w-14 sm:h-14 ${feature.bgLight} ${feature.textColor} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                                >
                                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.8} />
                                </div>

                                {/* Title */}
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors duration-300">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Decorative corner glow */}
                                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-emerald-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}