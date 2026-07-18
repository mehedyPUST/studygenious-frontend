import Link from 'next/link';
import { BookOpen } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-slate-300 mt-20">
            <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
                        <BookOpen className="w-5 h-5" />
                        StudyGenius
                    </div>
                    <p className="text-sm">AI-powered study plans to boost your learning.</p>
                </div>
                <div>
                    <h3 className="text-white font-semibold mb-3">Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="hover:text-white">Home</Link></li>
                        <li><Link href="/explore" className="hover:text-white">Explore</Link></li>
                        <li><Link href="/about" className="hover:text-white">About</Link></li>
                        <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-semibold mb-3">Legal</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-semibold mb-3">Connect</h3>
                    <div className="flex gap-3 text-sm">
                        <span>GitHub</span>
                        <span>Twitter</span>
                        <span>LinkedIn</span>
                    </div>
                </div>
            </div>
            <div className="border-t border-slate-700 text-center py-4 text-sm">
                © {currentYear} StudyGenius. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;