import { Brain, BookOpen, BarChart3, Wand2, Globe, Shield } from 'lucide-react';

const features = [
    {
        icon: Brain,
        title: 'AI Content Generation',
        description: 'Generate detailed study notes, summaries, and flashcards from any topic using advanced AI.',
    },
    {
        icon: BookOpen,
        title: 'Smart Recommendations',
        description: 'Get personalized resource suggestions based on your learning style and progress.',
    },
    {
        icon: BarChart3,
        title: 'Progress Tracking',
        description: 'Visualize your study hours, completed modules, and achievements over time.',
    },
    {
        icon: Wand2,
        title: 'Customizable Plans',
        description: 'Adjust difficulty, duration, and modules to fit your exact needs and schedule.',
    },
    {
        icon: Globe,
        title: 'Multi‑Subject Support',
        description: 'From Math to Machine Learning – any subject, any level, all in one place.',
    },
    {
        icon: Shield,
        title: 'Secure & Private',
        description: 'Your data and study materials are encrypted and never shared without permission.',
    },
];

export default function Features() {
    return (
        <section className="py-20 px-4 bg-white" id="features">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Why Choose StudyGenius?
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Everything you need to accelerate your learning journey with the power of AI.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-shadow border border-slate-100"
                        >
                            <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-5">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}