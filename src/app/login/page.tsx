'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { BookOpen, Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useState } from 'react';

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

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
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

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">
                {/* Left decorative panel */}
                <div className="hidden md:flex bg-gradient-to-br from-primary-600 to-secondary-600 p-10 flex-col justify-center items-center text-white">
                    <BookOpen className="w-20 h-20 mb-6" />
                    <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                    <p className="text-center text-primary-100 text-lg leading-relaxed">
                        Sign in to continue your<br />AI‑powered learning journey.
                    </p>
                    <div className="mt-10 space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <span>Personalized study plans</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <span>Smart recommendations</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <span>Track your progress</span>
                        </div>
                    </div>
                </div>

                {/* Right form panel */}
                <div className="p-8 md:p-12">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-900">Sign In</h1>
                        <p className="text-slate-600 mt-2">Access your study plans</p>
                    </div>

                    {serverError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                            {serverError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    id="email"
                                    type="email"
                                    {...register('email')}
                                    className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password')}
                                    className="w-full pl-12 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                                    placeholder="Your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-primary-600 text-white py-3.5 rounded-xl font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                'Signing in...'
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 space-y-3">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-3 text-slate-500">or continue with</span>
                            </div>
                        </div>

                        <button
                            onClick={handleDemoLogin}
                            disabled={isDemoLoading}
                            className="w-full bg-amber-500 text-white py-3 rounded-xl font-semibold hover:bg-amber-600 transition-colors disabled:opacity-50"
                        >
                            {isDemoLoading ? 'Loading demo...' : 'Demo Login'}
                        </button>

                        <div className="flex justify-center">
                            <GoogleLogin
                                onSuccess={async (credentialResponse) => {
                                    try {
                                        await googleLogin(credentialResponse.credential!);
                                        router.push('/');
                                    } catch (err: any) {
                                        setServerError(err.message || 'Google login failed');
                                    }
                                }}
                                onError={() => setServerError('Google login failed')}
                                theme="outline"
                                size="large"
                                width="100%"
                            />
                        </div>
                    </div>

                    <p className="mt-8 text-center text-sm text-slate-600">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="text-primary-600 font-semibold hover:text-primary-700">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}