import { ClipboardList, Cpu, Target } from 'lucide-react';

const steps = [
    {
        icon: ClipboardList,
        step: '1',
        title: 'Input Your Topic',
        description: 'Tell us what you want to learn and your preferred difficulty level.',
    },
    {
        icon: Cpu,
        step: '2',
        title: 'AI Generates Plan',
        description: 'Our AI creates a complete study plan with modules, notes, and summaries.',
    },
    {
        icon: Target,
        step: '3',
        title: 'Track & Achieve',
        description: 'Follow the plan, mark progress, and get recommendations to go further.',
    },
];

export default function HowItWorks() {
    return (
        <section className="py-20 px-4 bg-slate-50" id="how-it-works">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        How It Works
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Get your personalized study plan in three simple steps.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center">
                            <div className="w-20 h-20 mx-auto bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-6">
                                <step.icon className="w-10 h-10" />
                            </div>
                            <div className="text-primary-600 font-bold text-sm mb-2">Step {step.step}</div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">{step.title}</h3>
                            <p className="text-slate-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}