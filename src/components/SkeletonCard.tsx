export default function SkeletonCard() {
    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden animate-pulse flex flex-col h-full">
            <div className="h-48 bg-slate-200" />
            <div className="p-5 flex flex-col flex-1">
                <div className="flex gap-2 mb-3">
                    <div className="h-5 w-16 bg-slate-200 rounded-full" />
                    <div className="h-5 w-20 bg-slate-200 rounded-full" />
                </div>
                <div className="h-6 bg-slate-200 rounded mb-2 w-3/4" />
                <div className="h-4 bg-slate-200 rounded mb-2 w-full" />
                <div className="h-4 bg-slate-200 rounded mb-4 w-2/3" />
                <div className="flex justify-between mt-auto">
                    <div className="h-4 w-12 bg-slate-200 rounded" />
                    <div className="h-4 w-16 bg-slate-200 rounded" />
                </div>
                <div className="mt-4 h-10 bg-slate-200 rounded-lg" />
            </div>
        </div>
    );
}