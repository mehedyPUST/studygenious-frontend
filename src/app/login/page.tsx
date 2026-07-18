'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { BookOpen, Mail, Lock, Eye, EyeOff, LogIn, Sparkles, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const { login, demoLogin, googleLogin } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState('');
    const [isDemoLoading, setIsDemoLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginForm) => {
        try {
            setServerError('');
            await login(data.email, data.password);
            router.push('/');
        } catch (err: any) {
            setServerError(err.message || 'Login failed. Please try again.');
        }
    };

    const handleDemoLogin = async () => {
        try {
            setIsDemoLoading(true);
            setServerError('');
            await demoLogin();
            router.push('/');
        } catch (err: any) {
            setServerError(err.message || 'Demo login failed.');
        } finally {
            setIsDemoLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse: any) => {
        try {
            await googleLogin(credentialResponse.credential);
            router.push('/');
        } catch (err: any) {
            setServerError(err.message || 'Google login failed');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-10 sm:py-12">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-full max-w-5xl bg-white rounded-3xl shadow-xl shadow-emerald-100/50 overflow-hidden grid md:grid-cols-2 border border-emerald-100"
            >
                {/* Left decorative panel */}
                <div className="hidden md:flex bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 p-10 flex-col justify-center items-center text-white relative overflow-hidden">
                    {/* Decorative blobs */}
                    <div className="absolute top-10 right-10 w-40 h-40 bg-emerald-400/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 left-10 w-48 h-48 bg-teal-400/20 rounded-full blur-3xl" />

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                        className="relative z-10 bg-white/10 backdrop-blur-sm p-5 rounded-3xl mb-8"
                    >
                        <BookOpen className="w-16 h-16 sm:w-20 sm:h-20" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-2xl sm:text-3xl font-extrabold mb-4 tracking-tight"
                    >
                        Welcome Back!
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-center text-emerald-100 text-sm sm:text-base leading-relaxed mb-8"
                    >
                        Sign in to continue your AI‑powered learning journey.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="space-y-3"
                    >
                        {[
                            'Personalized study plans',
                            'Smart recommendations',
                            'Track your progress',
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                                className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-2.5 backdrop-blur-sm"
                            >
                                <div className="w-2 h-2 bg-emerald-300 rounded-full flex-shrink-0" />
                                <span className="text-sm">{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Right form panel */}
                <div className="p-8 sm:p-10 md:p-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-8"
                    >
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Sign In</h1>
                        <p className="text-sm sm:text-base text-gray-500 mt-2">Access your study plans</p>
                    </motion.div>

                    {serverError && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs sm:text-sm font-medium"
                        >
                            {serverError}
                        </motion.div>
                    )}

                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <div>
                            <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                <input
                                    id="email"
                                    type="email"
                                    {...register('email')}
                                    className="w-full pl-11 sm:pl-12 pr-4 py-3 sm:py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm sm:text-base placeholder-gray-400"
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email && <p className="mt-1.5 text-xs text-rose-500 font-medium">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password')}
                                    className="w-full pl-11 sm:pl-12 pr-12 py-3 sm:py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm sm:text-base placeholder-gray-400"
                                    placeholder="Your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                                </button>
                            </div>
                            {errors.password && <p className="mt-1.5 text-xs text-rose-500 font-medium">{errors.password.message}</p>}
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-md shadow-emerald-200"
                        >
                            {isSubmitting ? (
                                'Signing in...'
                            ) : (
                                <>
                                    <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                                    Sign In
                                </>
                            )}
                        </motion.button>
                    </motion.form>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-6 space-y-3"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-xs sm:text-sm">
                                <span className="bg-white px-4 text-gray-400 font-medium">or continue with</span>
                            </div>
                        </div>

                        <motion.button
                            onClick={handleDemoLogin}
                            disabled={isDemoLoading}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-amber-500 text-white py-3 sm:py-3.5 rounded-2xl font-bold text-sm sm:text-base hover:bg-amber-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
                        >
                            {isDemoLoading ? (
                                'Loading demo...'
                            ) : (
                                <>
                                    <Sparkles className="w-4 h-4" />
                                    Demo Login
                                </>
                            )}
                        </motion.button>

                        {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID && (
                            <div className="w-full flex justify-center">
                                <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    onError={() => setServerError('Google login failed')}
                                    theme="outline"
                                    size="large"
                                    text="signin_with"
                                    shape="rectangular"
                                />
                            </div>
                        )}
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-8 text-center text-xs sm:text-sm text-gray-500"
                    >
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors">
                            Create one
                            <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
                        </Link>
                    </motion.p>
                </div>
            </motion.div>
        </div>
    );
}