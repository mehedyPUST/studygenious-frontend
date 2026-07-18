'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, ArrowRight, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const contactInfo = [
    {
        icon: Mail,
        title: 'Email',
        value: 'support@studygenius.com',
        href: 'mailto:support@studygenius.com',
        gradient: 'from-emerald-500 to-teal-500',
        bgLight: 'bg-emerald-50',
        iconColor: 'text-emerald-600',
    },
    {
        icon: Phone,
        title: 'Phone',
        value: '+1 (555) 123-4567',
        href: 'tel:+15551234567',
        gradient: 'from-teal-500 to-cyan-500',
        bgLight: 'bg-teal-50',
        iconColor: 'text-teal-600',
    },
    {
        icon: MapPin,
        title: 'Location',
        value: 'San Francisco, CA',
        href: null,
        gradient: 'from-emerald-600 to-emerald-400',
        bgLight: 'bg-emerald-50',
        iconColor: 'text-emerald-600',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
};

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSuccess(false);

        if (!name || !email || !message) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            setIsSubmitting(true);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setIsSuccess(true);
            setName('');
            setEmail('');
            setMessage('');
        } catch (err: any) {
            setError('Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            {/* Header */}
            <section className="relative py-20 md:py-24 bg-white border-b border-emerald-100 overflow-hidden">
                <div className="absolute top-10 right-10 w-64 h-64 bg-emerald-100/30 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-48 h-48 bg-teal-100/30 rounded-full blur-3xl" />

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-[0.2em] mb-6 border border-emerald-200"
                    >
                        Contact
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-4"
                    >
                        Get in{' '}
                        <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            Touch
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
                    >
                        Have questions or feedback? We&apos;d love to hear from you.
                    </motion.p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 md:py-20 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-16">
                    {/* Contact Info */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        className="space-y-6"
                    >
                        {contactInfo.map((item, index) => {
                            const Icon = item.icon;
                            const Content = item.href ? 'a' : 'div';
                            const contentProps = item.href
                                ? { href: item.href, target: item.href.startsWith('mailto') ? undefined : '_blank', rel: item.href.startsWith('mailto') ? undefined : 'noopener noreferrer' }
                                : {};

                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ x: 6 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <Content
                                        {...(contentProps as any)}
                                        className="group flex items-start gap-5 bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-emerald-100/50 hover:border-emerald-200 transition-all duration-300 cursor-pointer"
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                            className={`w-12 h-12 sm:w-14 sm:h-14 ${item.bgLight} ${item.iconColor} rounded-2xl flex items-center justify-center flex-shrink-0`}
                                        >
                                            <Icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.8} />
                                        </motion.div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm sm:text-base text-gray-600 truncate">{item.value}</p>
                                            {item.href && (
                                                <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    Click to connect
                                                    <ArrowRight className="w-3 h-3" />
                                                </span>
                                            )}
                                        </div>
                                    </Content>
                                </motion.div>
                            );
                        })}

                        {/* Response time badge */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl p-4"
                        >
                            <Clock className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                            <p className="text-xs sm:text-sm text-emerald-700 font-medium">
                                We typically respond within 24 hours.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="bg-white rounded-3xl border border-emerald-100 shadow-sm shadow-emerald-100/30 p-6 sm:p-8"
                    >
                        <AnimatePresence mode="wait">
                            {isSuccess ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                    className="text-center py-12"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                                        className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-5"
                                    >
                                        <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
                                    </motion.div>
                                    <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2">Message Sent!</h3>
                                    <p className="text-sm sm:text-base text-gray-600 mb-6">
                                        We&apos;ll get back to you as soon as possible.
                                    </p>
                                    <button
                                        onClick={() => setIsSuccess(false)}
                                        className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors text-sm"
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                        Send another message
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-5"
                                >
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm font-medium"
                                        >
                                            {error}
                                        </motion.div>
                                    )}

                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                                            Name <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full px-4 sm:px-5 py-3 sm:py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm sm:text-base placeholder-gray-400"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                                            Email <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 sm:px-5 py-3 sm:py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm sm:text-base placeholder-gray-400"
                                            placeholder="you@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                                            Message <span className="text-rose-500">*</span>
                                        </label>
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            rows={4}
                                            className="w-full px-4 sm:px-5 py-3 sm:py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none text-sm sm:text-base placeholder-gray-400"
                                            placeholder="Your message..."
                                        />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-md shadow-emerald-200"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                                                Send Message
                                            </>
                                        )}
                                    </motion.button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}