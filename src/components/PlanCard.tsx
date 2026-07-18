import { Clock, Star, BookOpen } from 'lucide-react';
import Link from 'next/link';
import type { Plan } from '@/types/plan';

interface PlanCardProps {
    plan: Plan;
}

export default function PlanCard({ plan }: PlanCardProps) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
            <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                {plan.imageUrl ? (
                    <img src={plan.imageUrl} alt={plan.title} className="w-full h-full object-cover" />
                ) : (
                    <BookOpen className="w-16 h-16 text-primary-400" />
                )}
            </div>
            <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${plan.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                            plan.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                        }`}>
                        {plan.difficulty}
                    </span>
                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {plan.subject}
                    </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
                    {plan.title}
                </h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2 flex-1">
                    {plan.shortDescription}
                </p>
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                        <Clock className="w-4 h-4" />
                        <span>{plan.estimatedHours}h</span>
                    </div>
                    {plan.avgRating !== undefined && plan.avgRating > 0 && (
                        <div className="flex items-center gap-1 text-sm text-accent-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span>{plan.avgRating.toFixed(1)}</span>
                            <span className="text-slate-400">({plan.reviewCount})</span>
                        </div>
                    )}
                </div>
                <Link
                    href={`/plans/${plan._id}`}
                    className="mt-4 block w-full text-center bg-primary-50 text-primary-600 py-2 rounded-lg font-medium hover:bg-primary-100 transition-colors"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}