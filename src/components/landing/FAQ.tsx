'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: 'Is StudyGenius free to use?',
        answer: 'Yes! You can create unlimited study plans and access all core features completely free. Premium features are optional.',
    },
    {
        question: 'How does the AI content generation work?',
        answer: 'Our AI analyzes your topic and difficulty level, then generates a structured study plan with introduction, modules, and summaries using advanced language models.',
    },
    {
        question: 'Can I share my study plans with others?',
        answer: 'Absolutely. You can make your plans public so other learners can discover and benefit from them, or keep them private.',
    },
    {
        question: 'What subjects are supported?',
        answer: 'Any subject you can think of! From Mathematics to Machine Learning, History to Biology – our AI can handle any topic.',
    },
    {
        question: 'How accurate are the AI recommendations?',
        answer: 'Recommendations improve over time as you interact with the platform. The more you use StudyGenius, the better the suggestions become.',
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-20 px-4 bg-slate-50" id="faq">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-slate-600">
                        Got questions? We’ve got answers.
                    </p>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex justify-between items-center p-6 text-left"
                            >
                                <span className="font-semibold text-slate-900">{faq.question}</span>
                                <ChevronDown
                                    className={`w-5 h-5 text-slate-500 transition-transform ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            {openIndex === index && (
                                <div className="px-6 pb-6 text-slate-600">{faq.answer}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}