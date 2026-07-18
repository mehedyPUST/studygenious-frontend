import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CTA() {
    return (
        <section className="py-20 px-4 bg-white" id="cta">
            <div className="max-w-4xl mx-auto text-center bg-primary-600 rounded-3xl p-12 md:p-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Ready to Supercharge Your Learning?
                </h2>
                <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
                    Join thousands of learners who are achieving their goals faster with AI‑powered study plans.
                </p>
                <Link
                    href="/register"
                    className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-3.5 rounded-xl font-semibold hover:bg-primary-50 transition-colors"
                >
                    Start Free Now
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </section>
    );
}