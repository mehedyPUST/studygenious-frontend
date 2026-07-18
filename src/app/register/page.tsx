'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { BookOpen, User, Mail, Lock, Eye, EyeOff, UserPlus, Sparkles, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const registerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    password: z
        .string()
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

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterForm>({
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
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-10 sm:py-12 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-300/10 rounded-full blur-2xl" />

                    <div className="relative z-10">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                            className="bg-white/10 backdrop-blur-sm p-5 rounded-3xl mb-8 inline-block"
                        >
                            <BookOpen className="w-16 h-16 sm:w-20 sm:h-20" />
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-2xl sm:text-3xl font-extrabold mb-4 tracking-tight"
                        >
                            Join StudyGenius
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="text-center text-emerald-100 text-sm sm:text-base leading-relaxed mb-8"
                        >
                            Create your account and start learning smarter with AI.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="space-y-3"
                        >
                            {[
                                { icon: Sparkles, text: 'AI-generated study plans' },
                                { icon: Sparkles, text: 'Smart recommendations' },
                                { icon: Sparkles, text: 'Free forever — no credit card' },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                                    className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 backdrop-blur-sm"
                                >
                                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300 flex-shrink-0" />
                                    <span className="text-sm">{item.text}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Right form panel */}
                <div className="p-8 sm:p-10 md:p-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-8"
                    >
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Create Account</h1>
                        <p className="text-sm sm:text-base text-gray-500 mt-2">Start your AI-powered learning journey</p>
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
                        {/* Full Name */}
                        <div>
                            <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                <input
                                    id="name"
                                    {...register('name')}
                                    className="w-full pl-11 sm:pl-12 pr-4 py-3 sm:py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm sm:text-base placeholder-gray-400"
                                    placeholder="John Doe"
                                />
                            </div>
                            {errors.name && <p className="mt-1.5 text-xs text-rose-500 font-medium">{errors.name.message}</p>}
                        </div>

                        {/* Email */}
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

                        {/* Password */}
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
                                    placeholder="At least 8 characters"
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

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                <input
                                    id="confirmPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('confirmPassword')}
                                    className="w-full pl-11 sm:pl-12 pr-4 py-3 sm:py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm sm:text-base placeholder-gray-400"
                                    placeholder="Re-enter your password"
                                />
                            </div>
                            {errors.confirmPassword && <p className="mt-1.5 text-xs text-rose-500 font-medium">{errors.confirmPassword.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-md shadow-emerald-200"
                        >
                            {isSubmitting ? (
                                'Creating account...'
                            ) : (
                                <>
                                    <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                                    Create Account
                                </>
                            )}
                        </motion.button>
                    </motion.form>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-8 text-center text-xs sm:text-sm text-gray-500"
                    >
                        Already have an account?{' '}
                        <Link href="/login" className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors">
                            Sign in
                            <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
                        </Link>
                    </motion.p>
                </div>
            </motion.div>
        </div>
    );
}