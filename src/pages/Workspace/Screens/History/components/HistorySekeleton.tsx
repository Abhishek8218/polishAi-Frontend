// components/HistorySkeleton.tsx
export function HistorySkeleton() {
  return (
    <div className="divide-y divide-[#2a2a2e]">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="p-6 animate-pulse">
          <div className="flex gap-6">
            <div className="w-28">
              <div className="h-6 w-20 rounded-full bg-[#2a2a2e]" />
            </div>
            
            <div className="flex-1 space-y-6">
              <div className="flex justify-between">
                <div className="h-3 w-32 bg-[#2a2a2e] rounded" />
                <div className="h-3 w-20 bg-[#2a2a2e] rounded" />
              </div>
              
              <div className="space-y-2">
                <div className="h-4 bg-[#2a2a2e] rounded w-3/4" />
                <div className="h-4 bg-[#2a2a2e] rounded w-5/6" />
              </div>
              
              <div className="h-4 w-6 bg-[#2a2a2e] rounded" />
              
              <div className="space-y-2">
                <div className="h-4 bg-[#2a2a2e] rounded w-4/5" />
                <div className="h-4 bg-[#2a2a2e] rounded w-full" />
              </div>
            </div>
            
            <div className="w-24 pt-1">
              <div className="h-10 w-full bg-[#2a2a2e] rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}