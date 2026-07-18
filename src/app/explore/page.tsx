'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
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

    // Apply search on form submit (or you can use debounce)
    const [appliedSearch, setAppliedSearch] = useState('');

    const { data, isLoading, isError, error } = usePlans({
        search: appliedSearch,
        subject,
        difficulty,
        sortBy,
        page,
        limit: 12,
    });

    const plans = data?.data || [];
    const pagination = data?.pagination;

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setAppliedSearch(search);
        setPage(1); // reset to first page on new search
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Explore Study Plans</h1>
                <p className="text-slate-600">Discover plans created by the community</p>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <form onSubmit={handleSearchSubmit} className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search plans..."
                        className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                </form>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="inline-flex items-center gap-2 px-4 py-3 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
                >
                    <SlidersHorizontal className="w-5 h-5" />
                    Filters
                </button>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 border border-slate-300 rounded-xl bg-white outline-none focus:ring-2 focus:ring-primary-500"
                >
                    {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>

            {/* Expandable Filters */}
            {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-6 bg-white rounded-xl border border-slate-200">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                        <select
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value); setPage(1); }}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl bg-white outline-none"
                        >
                            <option value="">All Subjects</option>
                            {SUBJECTS.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Difficulty</label>
                        <select
                            value={difficulty}
                            onChange={(e) => { setDifficulty(e.target.value); setPage(1); }}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl bg-white outline-none"
                        >
                            <option value="">All Difficulties</option>
                            {DIFFICULTIES.map((d) => (
                                <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            {/* Results */}
            {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            )}

            {isError && (
                <div className="text-center py-20">
                    <p className="text-red-500">Failed to load plans. Please try again later.</p>
                </div>
            )}

            {!isLoading && !isError && plans.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-slate-500 text-lg">No plans found. Try adjusting your filters.</p>
                </div>
            )}

            {!isLoading && !isError && plans.length > 0 && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {plans.map((plan) => (
                            <PlanCard key={plan._id} plan={plan} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {pagination && pagination.totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-12">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="inline-flex items-center gap-1 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50"
                            >
                                <ChevronLeft className="w-5 h-5" />
                                Previous
                            </button>
                            <span className="text-sm text-slate-600">
                                Page {pagination.page} of {pagination.totalPages}
                            </span>
                            <button
                                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                                disabled={page === pagination.totalPages}
                                className="inline-flex items-center gap-1 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50"
                            >
                                Next
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}