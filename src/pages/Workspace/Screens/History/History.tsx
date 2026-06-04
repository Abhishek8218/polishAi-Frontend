// components/PolishHistory.tsx
'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Virtuoso } from 'react-virtuoso';
import { ArrowRight, Eye } from 'lucide-react';
import { getAllHistory } from './services/history.services';
import { HistorySkeleton } from './components/HistorySekeleton';
import { HistoryItem } from './components/HistoryItem';
import toast from 'react-hot-toast';


interface HistoryItemType {
  id: string;
  originalText: string;
  polishedText: string;
  creditsUsed: number;
  createdAt: string;
  framework: {
    id: string;
    name: string;
  };
}



export default function PolishHistory() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ['polish-history'],
    queryFn: getAllHistory,
    getNextPageParam: (lastPage) => {
        console.log("lastPage", lastPage);
      const { page, limit, total } = lastPage;
      const nextPage = page + 1;
      return nextPage * limit < total ? nextPage : undefined;
    },
    initialPageParam: 1,
  });

  const allItems = data?.pages.flatMap((page) => page.items) ?? [];

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (error) {
    toast.error('Failed to load history. Please try again.');
    return (
      <div className="flex h-[400px] items-center justify-center text-red-400">
        Failed to load history. Please try again.
      </div>
    );
  }

  return (
    <div className="  p-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-medium text-white">Polish History</h1>
            <p className="text-on-surface-variant mt-1">View your text refinement history</p>
          </div>
          
          <div className="flex items-center gap-4">
       
            <div className="relative w-80">
              <input
                type="text"
                placeholder="Search history..."
                className="w-full rounded-xl border border-[#2a2a2e] bg-[#161618] py-3 pl-11 text-sm text-white placeholder:text-on-surface-variant focus:outline-none focus:border-[#3a3a4a]"
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="absolute left-4 top-3.5 h-5 w-5 text-on-surface-variant" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 01-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* List */}
        <div className=" overflow-hidden">
          {isLoading ? (
            <HistorySkeleton />
          ) : allItems.length === 0 ? (
            <div className="flex h-fit flex-col items-center justify-center text-on-surface-variant">

              <p>No history yet</p>
            </div>
          ) : (
            <div style={{ height: 'calc(100vh - 220px)' }} className="flex flex-col gap-y-4 space-y-4">
              <Virtuoso   
                data={allItems}
                endReached={loadMore}
                overscan={200}
                itemContent={(_, item) => (
                  <HistoryItem key={item.id} item={item} />
                )}
                components={{
                  Footer: () => 
                    isFetchingNextPage ? (
                      <div className="p-6 text-center">
                        <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      </div>
                    ) : null,
                }}
              />
            </div>
          )}
        </div>

        {/* Footer info */}
        {allItems.length > 0 && (
          <div className="mt-4 text-center text-xs text-on-surface-variant">
            Showing {allItems.length} of {data?.pages[0]?.total || 0} results
          </div>
        )}
      </div>
    </div>
  );
}