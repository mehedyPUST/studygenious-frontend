'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/lib/api';
import { User, Mail, Lock, Eye, EyeOff, Save, Loader2, ArrowLeft, Shield, Edit3, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const profileSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    avatar: z.string().url('Invalid URL').optional().or(z.literal('')),
});

const passwordSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'At least 8 characters')
        .regex(/[A-Z]/, 'Uppercase letter required')
        .regex(/[0-9]/, 'Number required'),
    confirmPassword: z.string(),
}).refine(d => d.newPassword === d.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

type ProfileForm = z.infer<typeof profileSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;

export default function ProfilePage() {
    const router = useRouter();
    const { user, token, isLoading: authLoading } = useAuth();
    const [editProfile, setEditProfile] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [showCurrentPw, setShowCurrentPw] = useState(false);
    const [showNewPw, setShowNewPw] = useState(false);
    const [profileError, setProfileError] = useState('');
    const [profileSuccess, setProfileSuccess] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');

    useEffect(() => {
        if (!authLoading && (!user || !token)) router.push('/login');
    }, [user, token, authLoading, router]);

    const profileForm = useForm<ProfileForm>({
        resolver: zodResolver(profileSchema),
        values: { name: user?.name || '', email: user?.email || '', avatar: user?.avatar || '' },
    });

    const passwordForm = useForm<PasswordForm>({
        resolver: zodResolver(passwordSchema),
    });

    const onProfileSubmit = async (data: ProfileForm) => {
        try {
            setProfileError('');
            setProfileSuccess('');
            await apiClient('/api/profile', { method: 'PUT', body: JSON.stringify(data) });
            setEditProfile(false);
            setProfileSuccess('Profile updated successfully!');
            setTimeout(() => setProfileSuccess(''), 3000);
        } catch (err: any) {
            setProfileError(err.message || 'Failed to update profile.');
        }
    };

    const onPasswordSubmit = async (data: PasswordForm) => {
        try {
            setPasswordError('');
            setPasswordSuccess('');
            await apiClient('/api/profile/password', {
                method: 'PUT',
                body: JSON.stringify({ currentPassword: data.currentPassword, newPassword: data.newPassword }),
            });
            passwordForm.reset();
            setEditPassword(false);
            setPasswordSuccess('Password changed successfully!');
            setTimeout(() => setPasswordSuccess(''), 3000);
        } catch (err: any) {
            setPasswordError(err.message || 'Failed to change password.');
        }
    };

    if (authLoading || !user || !token) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            {/* Header */}
            <section className="py-14 md:py-18 bg-white border-b border-emerald-100">
                <div className="max-w-4xl mx-auto px-4">
                    <Link href="/" className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-semibold text-sm mb-6">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-5">
                        <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center text-3xl font-extrabold text-emerald-700 shadow-sm overflow-hidden">
                            {user.avatar ? (
                                <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                            ) : (
                                user.name?.charAt(0)?.toUpperCase() || 'U'
                            )}
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{user.name}</h1>
                            <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
                                <Mail className="w-3.5 h-3.5" /> {user.email}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : '...'}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                    {/* Profile Card */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-6 sm:p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <User className="w-5 h-5 text-emerald-600" /> Profile Info
                                </h2>
                                {!editProfile && (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setEditProfile(true)}
                                        className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors"
                                    >
                                        <Edit3 className="w-3.5 h-3.5" /> Edit
                                    </motion.button>
                                )}
                            </div>

                            <AnimatePresence>
                                {profileError && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-4 p-3 bg-rose-50 text-rose-700 rounded-xl text-xs font-medium">
                                        {profileError}
                                    </motion.div>
                                )}
                                {profileSuccess && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-4 p-3 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-medium">
                                        {profileSuccess}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {editProfile ? (
                                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Name</label>
                                        <input {...profileForm.register('name')} className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                                        <input {...profileForm.register('email')} className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Avatar URL</label>
                                        <input {...profileForm.register('avatar')} placeholder="https://..." className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                                    </div>
                                    <div className="flex gap-2">
                                        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} type="submit" disabled={profileForm.formState.isSubmitting} className="flex-1 bg-emerald-600 text-white py-3 rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                                            {profileForm.formState.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save
                                        </motion.button>
                                        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} type="button" onClick={() => { setEditProfile(false); profileForm.reset(); }} className="px-4 py-3 bg-gray-100 text-gray-600 rounded-2xl font-semibold text-sm hover:bg-gray-200 transition-all flex items-center justify-center">
                                            <X className="w-4 h-4" />
                                        </motion.button>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-50 rounded-2xl">
                                        <p className="text-xs text-gray-500 mb-0.5">Name</p>
                                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-2xl">
                                        <p className="text-xs text-gray-500 mb-0.5">Email</p>
                                        <p className="text-sm font-semibold text-gray-900">{user.email}</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-2xl">
                                        <p className="text-xs text-gray-500 mb-0.5">Avatar</p>
                                        <p className="text-sm font-semibold text-gray-900 truncate">{user.avatar || 'No avatar set'}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Password Card */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-6 sm:p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <Lock className="w-5 h-5 text-emerald-600" /> Password
                                </h2>
                                {!editPassword && (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setEditPassword(true)}
                                        className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors"
                                    >
                                        <Edit3 className="w-3.5 h-3.5" /> Change
                                    </motion.button>
                                )}
                            </div>

                            <AnimatePresence>
                                {passwordError && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-4 p-3 bg-rose-50 text-rose-700 rounded-xl text-xs font-medium">
                                        {passwordError}
                                    </motion.div>
                                )}
                                {passwordSuccess && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-4 p-3 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-medium">
                                        {passwordSuccess}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {editPassword ? (
                                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                                    <div className="relative">
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Current Password</label>
                                        <input type={showCurrentPw ? 'text' : 'password'} {...passwordForm.register('currentPassword')} className="w-full px-4 pr-12 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                                        <button type="button" onClick={() => setShowCurrentPw(!showCurrentPw)} className="absolute right-3 bottom-3 text-gray-400 hover:text-emerald-600">
                                            {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">New Password</label>
                                        <input type={showNewPw ? 'text' : 'password'} {...passwordForm.register('newPassword')} className="w-full px-4 pr-12 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                                        <button type="button" onClick={() => setShowNewPw(!showNewPw)} className="absolute right-3 bottom-3 text-gray-400 hover:text-emerald-600">
                                            {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Confirm New Password</label>
                                        <input type={showNewPw ? 'text' : 'password'} {...passwordForm.register('confirmPassword')} className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                                    </div>
                                    <div className="flex gap-2">
                                        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} type="submit" disabled={passwordForm.formState.isSubmitting} className="flex-1 bg-emerald-600 text-white py-3 rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                                            {passwordForm.formState.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />} Update
                                        </motion.button>
                                        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} type="button" onClick={() => { setEditPassword(false); passwordForm.reset(); }} className="px-4 py-3 bg-gray-100 text-gray-600 rounded-2xl font-semibold text-sm hover:bg-gray-200 transition-all flex items-center justify-center">
                                            <X className="w-4 h-4" />
                                        </motion.button>
                                    </div>
                                </form>
                            ) : (
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <p className="text-xs text-gray-500 mb-0.5">Password</p>
                                    <p className="text-sm font-semibold text-gray-900">••••••••••••</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}