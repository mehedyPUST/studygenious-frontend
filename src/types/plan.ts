export interface Plan {
    _id: string;
    userId: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    subject: string;
    difficulty: 'easy' | 'medium' | 'hard';
    estimatedHours: number;
    imageUrl?: string;
    avgRating?: number;
    reviewCount?: number;
    aiGenerated?: boolean;
    createdAt: string;
    updatedAt: string;
}