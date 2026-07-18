'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { BookOpen, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const loginSchema = z.object({
    email: z.string().email('Invalid email'),
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
            setServerError(err.message || 'Login failed');
        }
    };

    const handleDemoLogin = async () => {
        try {
            setIsDemoLoading(true);
            setServerError('');
            await demoLogin();
            router.push('/');
        } catch (err: any) {
            setServerError(err.message || 'Demo login failed');
        } finally {
            setIsDemoLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <BookOpen className="w-12 h-12 text-primary-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
                    <p className="text-slate-600 mt-2">Sign in to your StudyGenius account</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                    {serverError && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                            {serverError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register('email')}
                                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                                placeholder="you@example.com"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password')}
                                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors pr-12"
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
                            className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
                        >
                            {isSubmitting ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-6 space-y-3">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-3 text-slate-500">or</span>
                            </div>
                        </div>

                        <button
                            onClick={handleDemoLogin}
                            disabled={isDemoLoading}
                            className="w-full bg-secondary-500 text-white py-3 rounded-xl font-semibold hover:bg-secondary-600 transition-colors disabled:opacity-50"
                        >
                            {isDemoLoading ? 'Loading...' : 'Demo Login'}
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