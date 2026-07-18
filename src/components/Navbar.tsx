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
                    <div className="hidden md:flex items-center gap-4">
                        {!isLoggedIn ? (
                            <>
                                <Link href="/explore" className="text-slate-600 hover:text-primary-600 transition-colors">
                                    Explore
                                </Link>
                                <Link
                                    href="/login"
                                    className="px-4 py-2 border border-primary-500 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/explore" className="text-slate-600 hover:text-primary-600 transition-colors">
                                    Explore
                                </Link>
                                <Link href="/items/add" className="text-slate-600 hover:text-primary-600 transition-colors">
                                    Add Plan
                                </Link>
                                <Link href="/items/manage" className="text-slate-600 hover:text-primary-600 transition-colors">
                                    Manage
                                </Link>
                                <Link href="/recommendations" className="text-slate-600 hover:text-primary-600 transition-colors">
                                    For You
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="ml-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                                >
                                    Logout
                                </button>
                            </>
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
                        {!isLoggedIn ? (
                            <>
                                <Link href="/explore" className="block text-slate-600 hover:text-primary-600 py-2" onClick={() => setIsOpen(false)}>
                                    Explore
                                </Link>
                                <Link href="/login" className="block text-primary-600 font-medium py-2" onClick={() => setIsOpen(false)}>
                                    Login
                                </Link>
                                <Link href="/register" className="block w-full text-center bg-primary-600 text-white py-2 rounded-lg font-medium" onClick={() => setIsOpen(false)}>
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/explore" className="block text-slate-600 hover:text-primary-600 py-2" onClick={() => setIsOpen(false)}>Explore</Link>
                                <Link href="/items/add" className="block text-slate-600 hover:text-primary-600 py-2" onClick={() => setIsOpen(false)}>Add Plan</Link>
                                <Link href="/items/manage" className="block text-slate-600 hover:text-primary-600 py-2" onClick={() => setIsOpen(false)}>Manage</Link>
                                <Link href="/recommendations" className="block text-slate-600 hover:text-primary-600 py-2" onClick={() => setIsOpen(false)}>For You</Link>
                                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block w-full text-left text-red-500 py-2">
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;