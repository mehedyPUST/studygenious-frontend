import { Star } from 'lucide-react';

const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'University Student',
        content: 'StudyGenius completely transformed how I prepare for exams. The AI-generated notes are incredibly detailed and saved me hours of work.',
        rating: 5,
    },
    {
        name: 'Michael Chen',
        role: 'Software Developer',
        content: 'The smart recommendations introduced me to resources I never would have found on my own. Highly recommend for anyone learning new tech.',
        rating: 5,
    },
    {
        name: 'Emily Rodriguez',
        role: 'High School Teacher',
        content: 'I use StudyGenius to create lesson plans for my students. The adjustable difficulty levels make it perfect for different age groups.',
        rating: 5,
    },
];

export default function Testimonials() {
    return (
        <section className="py-20 px-4 bg-white" id="testimonials">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        What Our Users Say
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Join thousands of satisfied learners who accelerated their progress.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                            <div className="flex gap-1 mb-4">
                                {[...Array(t.rating)].map((_, j) => (
                                    <Star key={j} className="w-5 h-5 text-accent-500 fill-current" />
                                ))}
                            </div>
                            <p className="text-slate-600 mb-6 italic">{t.content}</p>
                            <div>
                                <div className="font-semibold text-slate-900">{t.name}</div>
                                <div className="text-sm text-slate-500">{t.role}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}