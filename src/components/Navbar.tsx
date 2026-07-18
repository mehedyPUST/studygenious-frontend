'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, BookOpen, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const isLoggedIn = !!user;

    // Detect scroll for shadow effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        router.push('/');
        setIsOpen(false);
    };

    const isActive = (path: string) => pathname === path;

    return (
        <motion.nav
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-emerald-100/30'
                    : 'bg-white shadow-sm'
                } border-b border-emerald-100`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 md:h-18 items-center">
                    {/* Logo */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link
                            href="/"
                            className="flex items-center gap-2.5 text-emerald-600 font-extrabold text-xl md:text-2xl hover:text-emerald-700 transition-colors group"
                        >
                            <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md shadow-emerald-200 group-hover:shadow-lg group-hover:shadow-emerald-300 transition-all duration-300">
                                <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-white" />
                            </div>
                            <span className="tracking-tight">
                                Study<span className="text-teal-600">Genius</span>
                            </span>
                        </Link>
                    </motion.div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {!isLoggedIn ? (
                            <>
                                <Link
                                    href="/explore"
                                    className={`relative px-4 py-2 text-sm font-semibold transition-colors rounded-lg ${isActive('/explore')
                                            ? 'text-emerald-700 bg-emerald-50'
                                            : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50/50'
                                        }`}
                                >
                                    Explore
                                    {isActive('/explore') && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-emerald-500 rounded-full"
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </Link>
                                <div className="w-px h-6 bg-gray-200 mx-2" />
                                <Link
                                    href="/login"
                                    className="px-5 py-2.5 text-sm font-semibold border-2 border-emerald-500 text-emerald-600 rounded-xl hover:bg-emerald-50 transition-all duration-300"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-md shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-300"
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                {[
                                    { href: '/explore', label: 'Explore' },
                                    { href: '/items/add', label: 'Add Plan' },
                                    { href: '/items/manage', label: 'Manage' },
                                    { href: '/recommendations', label: 'For You' },
                                    { href: '/profile', label: 'Profile' },
                                ].map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`relative px-3 py-2 text-sm font-semibold transition-colors rounded-lg ${isActive(link.href)
                                                ? 'text-emerald-700 bg-emerald-50'
                                                : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50/50'
                                            }`}
                                    >
                                        {link.label}
                                        {link.href === '/recommendations' && (
                                            <Sparkles className="w-3.5 h-3.5 inline ml-1 text-amber-400" />
                                        )}
                                        {isActive(link.href) && (
                                            <motion.div
                                                layoutId="navbar-indicator"
                                                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-emerald-500 rounded-full"
                                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                ))}
                                <div className="w-px h-6 bg-gray-200 mx-2" />
                                <button
                                    onClick={handleLogout}
                                    className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-md shadow-emerald-200"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="md:hidden p-2 rounded-xl text-emerald-600 hover:bg-emerald-50 transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="md:hidden bg-white border-t border-emerald-100 overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-1">
                            {!isLoggedIn ? (
                                <>
                                    <Link
                                        href="/explore"
                                        className={`block py-3 px-4 rounded-xl text-sm font-semibold transition-all ${isActive('/explore')
                                                ? 'bg-emerald-50 text-emerald-700'
                                                : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
                                            }`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Explore
                                    </Link>
                                    <div className="border-t border-gray-100 my-2" />
                                    <Link
                                        href="/login"
                                        className="block py-3 px-4 rounded-xl text-sm font-semibold text-emerald-600 border border-emerald-200 hover:bg-emerald-50 transition-all text-center"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="block py-3 px-4 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md shadow-emerald-200"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Register
                                    </Link>
                                </>
                            ) : (
                                <>
                                    {[
                                        { href: '/explore', label: 'Explore' },
                                        { href: '/items/add', label: 'Add Plan' },
                                        { href: '/items/manage', label: 'Manage' },
                                        { href: '/recommendations', label: 'For You' },
                                        { href: '/profile', label: 'Profile' },
                                    ].map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={`block py-3 px-4 rounded-xl text-sm font-semibold transition-all ${isActive(link.href)
                                                    ? 'bg-emerald-50 text-emerald-700'
                                                    : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
                                                }`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.label}
                                            {link.href === '/recommendations' && (
                                                <Sparkles className="w-3.5 h-3.5 inline ml-1 text-amber-400" />
                                            )}
                                        </Link>
                                    ))}
                                    <div className="border-t border-gray-100 my-2" />
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full py-3 px-4 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-all text-left"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;