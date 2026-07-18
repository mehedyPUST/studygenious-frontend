'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { BookOpen, User, Mail, Lock, Eye, EyeOff, UserPlus } from 'lucide-react';
import { useState } from 'react';

const registerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    password: z.string()
        .min(8, 'At least 8 characters')
        .regex(/[A-Z]/, 'Must contain an uppercase letter')
        .regex(/[0-9]/, 'Must contain a number'),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const router = useRouter();
    const { register: registerUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState('');

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterForm) => {
        try {
            setServerError('');
            await registerUser(data.name, data.email, data.password);
            router.push('/');
        } catch (err: any) {
            setServerError(err.message || 'Registration failed.');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">
                {/* Left decorative panel */}
                <div className="hidden md:flex bg-gradient-to-br from-primary-600 to-secondary-600 p-10 flex-col justify-center items-center text-white">
                    <BookOpen className="w-20 h-20 mb-6" />
                    <h2 className="text-3xl font-bold mb-4">Join StudyGenius</h2>
                    <p className="text-center text-primary-100 text-lg leading-relaxed">
                        Create your account and start<br />learning smarter with AI.
                    </p>
                    <div className="mt-10 space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <span>Free forever – no credit card</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <span>AI-generated study plans</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <span>Community driven</span>
                        </div>
                    </div>
                </div>

                {/* Right form panel */}
                <div className="p-8 md:p-12">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
                        <p className="text-slate-600 mt-2">Start your learning journey</p>
                    </div>

                    {serverError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                            {serverError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    id="name"
                                    {...register('name')}
                                    className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                                    placeholder="John Doe"
                                />
                            </div>
                            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    id="email"
                                    type="email"
                                    {...register('email')}
                                    className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
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
                                    className="w-full pl-12 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                                    placeholder="At least 8 characters"
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

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    id="confirmPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('confirmPassword')}
                                    className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                                    placeholder="Re-enter your password"
                                />
                            </div>
                            {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-primary-600 text-white py-3.5 rounded-xl font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                'Creating account...'
                            ) : (
                                <>
                                    <UserPlus className="w-5 h-5" />
                                    Create Account
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-600">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary-600 font-semibold hover:text-primary-700">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}