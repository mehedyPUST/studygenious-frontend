'use client';

import { useEffect, useState } from 'react';

const stats = [
    { value: 10500, suffix: '+', label: 'Study Plans Created' },
    { value: 95, suffix: '%', label: 'User Satisfaction' },
    { value: 52000, suffix: '+', label: 'Active Learners' },
    { value: 24, suffix: '/7', label: 'AI Support' },
];

function AnimatedCounter({ target }: { target: number }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
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
    }, [target]);

    return <span>{count.toLocaleString()}</span>;
}

export default function Statistics() {
    return (
        <section className="py-20 px-4 bg-primary-600" id="statistics">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                    {stats.map((stat, index) => (
                        <div key={index}>
                            <div className="text-4xl md:text-5xl font-bold mb-2">
                                <AnimatedCounter target={stat.value} />
                                {stat.suffix}
                            </div>
                            <div className="text-primary-100 text-sm font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}