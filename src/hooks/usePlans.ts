'use client';

import { useQuery } from '@tanstack/react-query';
import { publicApi } from '@/lib/api';
import type { Plan } from '@/types/plan';

interface PlansResponse {
    success: boolean;
    data: Plan[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

interface PlanFilters {
    search?: string;
    subject?: string;
    difficulty?: string;
    minRating?: string;
    sortBy?: string;
    page?: number;
    limit?: number;
}

export function usePlans(filters: PlanFilters) {
    return useQuery<PlansResponse>({
        queryKey: ['plans', filters],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (filters.search) params.set('search', filters.search);
            if (filters.subject) params.set('subject', filters.subject);
            if (filters.difficulty) params.set('difficulty', filters.difficulty);
            if (filters.minRating) params.set('minRating', filters.minRating);
            if (filters.sortBy) params.set('sortBy', filters.sortBy);
            params.set('page', String(filters.page || 1));
            params.set('limit', String(filters.limit || 12));

            return publicApi<PlansResponse>(`/api/plans?${params.toString()}`);
        },
    });
}