'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, BookOpen } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const router = useRouter();
    const isLoggedIn = !!user;

    const loggedOutLinks = [
        { href: '/', label: 'Home' },
        { href: '/explore', label: 'Explore' },
        { href: '/login', label: 'Login' },
    ];

    const loggedInLinks = [
        { href: '/', label: 'Home' },
        { href: '/explore', label: 'Explore' },
        { href: '/items/add', label: 'Add Plan' },
        { href: '/items/manage', label: 'Manage' },
        { href: '/recommendations', label: 'For You' },
    ];

    const links = isLoggedIn ? loggedInLinks : loggedOutLinks;

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 text-primary-600 font-bold text-xl">
                        <BookOpen className="w-6 h-6" />
                        StudyGenius
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-6">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-slate-600 hover:text-primary-600 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                        {isLoggedIn && (
                            <button
                                onClick={handleLogout}
                                className="ml-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                            >
                                Logout
                            </button>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2 rounded-md text-slate-600 hover:text-primary-600"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-4 py-3 space-y-2">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block text-slate-600 hover:text-primary-600 py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {isLoggedIn && (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsOpen(false);
                                }}
                                className="block w-full text-left text-red-500 py-2"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;