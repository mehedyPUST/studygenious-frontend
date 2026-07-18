'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, FilterX, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PlanCard from '@/components/PlanCard';
import SkeletonCard from '@/components/SkeletonCard';
import { usePlans } from '@/hooks/usePlans';

const SUBJECTS = ['Math', 'Physics', 'Computer Science', 'History', 'Biology', 'Chemistry', 'Literature', 'Art'];
const DIFFICULTIES = ['easy', 'medium', 'hard'];
const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'hours', label: 'Duration' },
];

export default function ExplorePage() {
    const [search, setSearch] = useState('');
    const [subject, setSubject] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [page, setPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [appliedSearch, setAppliedSearch] = useState('');

    const { data, isLoading, isError } = usePlans({
        search: appliedSearch,
        subject,
        difficulty,
        sortBy,
        page,
        limit: 12,
    });

    const plans = data?.data || [];
    const pagination = data?.pagination;

    const hasActiveFilters = subject || difficulty || appliedSearch;

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setAppliedSearch(search);
        setPage(1);
    };

    const clearFilters = () => {
        setSubject('');
        setDifficulty('');
        setSearch('');
        setAppliedSearch('');
        setPage(1);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            <div className="max-w-7xl mx-auto px-4 py-10 md:py-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="mb-8 md:mb-10"
                >
                    <span className="inline-block text-emerald-600 text-xs font-semibold uppercase tracking-[0.2em] bg-emerald-100/60 px-3 py-1 rounded-full mb-3">
                        Discover
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 leading-tight tracking-tight">
                        Explore Study Plans
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl">
                        Discover plans created by the community and find the perfect one for you.
                    </p>
                </motion.div>

                {/* Search and Filter Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-col md:flex-row gap-3 mb-6"
                >
                    <form onSubmit={handleSearchSubmit} className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search plans..."
                            className="w-full pl-12 pr-4 py-3 md:py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm sm:text-base bg-white shadow-sm placeholder-gray-400"
                        />
                    </form>
                    <div className="flex gap-3">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowFilters(!showFilters)}
                            className={`inline-flex items-center gap-2 px-4 py-3 md:py-3.5 rounded-2xl text-sm font-semibold transition-all border ${showFilters
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-600'
                                } shadow-sm`}
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Filters
                        </motion.button>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-3 md:py-3.5 border border-gray-200 rounded-2xl bg-white outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium text-gray-700 shadow-sm cursor-pointer"
                        >
                            {SORT_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                </motion.div>

                {/* Active filters indicator */}
                {hasActiveFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="flex items-center gap-2 mb-4"
                    >
                        <Sparkles className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs text-emerald-700 font-medium">Active filters applied</span>
                        <button
                            onClick={clearFilters}
                            className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-medium ml-2"
                        >
                            <FilterX className="w-3.5 h-3.5" />
                            Clear all
                        </button>
                    </motion.div>
                )}

                {/* Expandable Filters */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden mb-8"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 sm:p-6 bg-white rounded-2xl border border-emerald-100 shadow-sm">
                                <div>
                                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <select
                                        value={subject}
                                        onChange={(e) => { setSubject(e.target.value); setPage(1); }}
                                        className="w-full px-4 py-2.5 sm:py-3 border border-gray-200 rounded-2xl bg-white outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium text-gray-700 cursor-pointer"
                                    >
                                        <option value="">All Subjects</option>
                                        {SUBJECTS.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                                        Difficulty
                                    </label>
                                    <select
                                        value={difficulty}
                                        onChange={(e) => { setDifficulty(e.target.value); setPage(1); }}
                                        className="w-full px-4 py-2.5 sm:py-3 border border-gray-200 rounded-2xl bg-white outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium text-gray-700 cursor-pointer"
                                    >
                                        <option value="">All Difficulties</option>
                                        {DIFFICULTIES.map((d) => (
                                            <option key={d} value={d}>
                                                {d.charAt(0).toUpperCase() + d.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Results count */}
                {!isLoading && plans.length > 0 && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs sm:text-sm text-gray-500 mb-4"
                    >
                        Showing <span className="font-semibold text-gray-700">{plans.length}</span> of{' '}
                        <span className="font-semibold text-gray-700">{pagination?.total || 0}</span> plans
                    </motion.p>
                )}

                {/* Loading */}
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
                    >
                        {[...Array(8)].map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </motion.div>
                )}

                {/* Error */}
                {isError && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FilterX className="w-8 h-8 text-rose-500" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Failed to Load</h3>
                        <p className="text-sm text-gray-500 mb-4">Please try again later.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="text-emerald-600 font-semibold text-sm hover:text-emerald-700"
                        >
                            Refresh page
                        </button>
                    </motion.div>
                )}

                {/* Empty */}
                {!isLoading && !isError && plans.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-emerald-500" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">No Plans Found</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Try adjusting your filters or search terms.
                        </p>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="text-emerald-600 font-semibold text-sm hover:text-emerald-700"
                            >
                                Clear all filters
                            </button>
                        )}
                    </motion.div>
                )}

                {/* Results Grid */}
                {!isLoading && !isError && plans.length > 0 && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
                        >
                            {plans.map((plan, index) => (
                                <PlanCard key={plan._id} plan={plan} index={index} />
                            ))}
                        </motion.div>

                        {/* Pagination */}
                        {pagination && pagination.totalPages > 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex justify-center items-center gap-3 mt-12"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 hover:border-emerald-300 hover:text-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Previous
                                </motion.button>

                                <div className="flex items-center gap-1.5">
                                    {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                                        const pageNum = i + 1;
                                        const isActive = pageNum === pagination.page;
                                        return (
                                            <motion.button
                                                key={pageNum}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => setPage(pageNum)}
                                                className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${isActive
                                                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                                                        : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 border border-gray-200'
                                                    }`}
                                            >
                                                {pageNum}
                                            </motion.button>
                                        );
                                    })}
                                    {pagination.totalPages > 5 && (
                                        <span className="text-gray-400 text-sm font-medium">...</span>
                                    )}
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                                    disabled={page === pagination.totalPages}
                                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 hover:border-emerald-300 hover:text-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4" />
                                </motion.button>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </main>
    );
}