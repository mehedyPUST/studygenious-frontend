'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, Smile, Users, Headphones } from 'lucide-react';

const stats = [
    { value: 10500, suffix: '+', label: 'Study Plans Created', icon: FileText },
    { value: 95, suffix: '%', label: 'User Satisfaction', icon: Smile },
    { value: 52000, suffix: '+', label: 'Active Learners', icon: Users },
    { value: 24, suffix: '/7', label: 'AI Support', icon: Headphones },
];

function AnimatedCounter({ target, isVisible }: { target: number; isVisible: boolean }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isVisible) return;

        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [target, isVisible]);

    return <span>{count.toLocaleString()}</span>;
}

export default function Statistics() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section
            ref={sectionRef}
            className="py-24 px-4 relative overflow-hidden"
            id="statistics"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 -z-10" />

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-300/5 rounded-full blur-3xl" />
            </div>

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] -z-10" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
                                className="text-center text-white group"
                            >
                                {/* Icon */}
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-5 border border-white/20 group-hover:bg-white/20 transition-all duration-300"
                                >
                                    <Icon className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.8} />
                                </motion.div>

                                {/* Value */}
                                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 tracking-tight">
                                    <AnimatedCounter target={stat.value} isVisible={isInView} />
                                    <span className="text-emerald-200">{stat.suffix}</span>
                                </div>

                                {/* Label */}
                                <div className="text-emerald-100 text-sm sm:text-base font-medium tracking-wide">
                                    {stat.label}
                                </div>

                                {/* Decorative underline */}
                                <div className="mt-3 w-8 h-0.5 bg-emerald-300/50 mx-auto rounded-full opacity-0 group-hover:opacity-100 group-hover:w-12 transition-all duration-500" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}