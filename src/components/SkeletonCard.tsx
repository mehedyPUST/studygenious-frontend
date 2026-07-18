export default function SkeletonCard() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col h-full shadow-sm">
            {/* Image skeleton */}
            <div className="relative h-44 sm:h-48 bg-gradient-to-br from-emerald-100/50 via-teal-50/50 to-emerald-50/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                <div className="absolute top-4 right-4 w-16 h-16 bg-emerald-200/20 rounded-full blur-xl" />
                <div className="absolute bottom-2 left-4 w-12 h-12 bg-teal-200/20 rounded-full blur-xl" />
            </div>

            {/* Content skeleton */}
            <div className="p-4 sm:p-5 flex flex-col flex-1">
                {/* Badges skeleton */}
                <div className="flex gap-2 mb-3">
                    <div className="h-5 w-16 bg-gray-100 rounded-full animate-pulse" />
                    <div className="h-5 w-20 bg-gray-100 rounded-full animate-pulse" />
                </div>

                {/* Title skeleton */}
                <div className="h-5 sm:h-6 bg-gray-100 rounded-lg mb-2 w-3/4 animate-pulse" />

                {/* Description skeleton */}
                <div className="h-3.5 sm:h-4 bg-gray-100 rounded-lg mb-1.5 w-full animate-pulse" />
                <div className="h-3.5 sm:h-4 bg-gray-100 rounded-lg mb-4 w-2/3 animate-pulse" />

                {/* Meta skeleton */}
                <div className="flex justify-between mt-auto pt-3 border-t border-gray-50">
                    <div className="h-4 w-12 bg-gray-100 rounded-lg animate-pulse" />
                    <div className="h-4 w-16 bg-gray-100 rounded-lg animate-pulse" />
                </div>

                {/* Button skeleton */}
                <div className="mt-4 h-10 bg-gray-100 rounded-xl animate-pulse" />
            </div>
        </div>
    );
}