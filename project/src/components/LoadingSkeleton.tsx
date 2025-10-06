import React from 'react';

interface LoadingSkeletonProps {
  type: 'dashboard' | 'groups' | 'transactions' | 'profile' | 'group-details';
}

function LoadingSkeleton({ type }: LoadingSkeletonProps) {
  const SkeletonCard = ({ className = "" }: { className?: string }) => (
    <div className={`bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 animate-pulse ${className}`}>
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-white/20 rounded w-3/4"></div>
            <div className="h-3 bg-white/20 rounded w-1/2"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-white/20 rounded"></div>
          <div className="h-3 bg-white/20 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );

  const SkeletonButton = ({ className = "" }: { className?: string }) => (
    <div className={`h-12 bg-white/20 rounded-xl animate-pulse ${className}`}></div>
  );

  const SkeletonText = ({ width = "w-full" }: { width?: string }) => (
    <div className={`h-4 bg-white/20 rounded animate-pulse ${width}`}></div>
  );

  switch (type) {
    case 'dashboard':
      return (
        <div className="space-y-8 animate-fade-in">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between">
            <div className="h-8 bg-white/20 rounded w-48 animate-pulse"></div>
            <SkeletonButton className="w-40" />
          </div>

          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 bg-white/20 rounded w-24"></div>
                    <div className="h-8 bg-white/20 rounded w-32"></div>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Groups Section Skeleton */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="h-7 bg-white/20 rounded w-32 animate-pulse"></div>
              <div className="h-5 bg-white/20 rounded w-20 animate-pulse"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        </div>
      );

    case 'groups':
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="h-8 bg-white/20 rounded w-48 animate-pulse mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      );

    case 'transactions':
      return (
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="h-8 bg-white/20 rounded w-40 animate-pulse"></div>
            <div className="flex items-center space-x-2">
              <div className="h-5 bg-white/20 rounded w-16 animate-pulse"></div>
              <div className="h-5 bg-white/20 rounded w-20 animate-pulse"></div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 bg-white/20 rounded-xl w-24 animate-pulse"></div>
            ))}
          </div>

          {/* Transactions List */}
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl"></div>
                    <div className="space-y-2">
                      <div className="h-5 bg-white/20 rounded w-48"></div>
                      <div className="h-4 bg-white/20 rounded w-32"></div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="h-6 bg-white/20 rounded w-20"></div>
                    <div className="h-5 bg-white/20 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'profile':
      return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="h-8 bg-white/20 rounded w-32 mx-auto animate-pulse"></div>
            <div className="h-5 bg-white/20 rounded w-48 mx-auto animate-pulse"></div>
          </div>

          {/* Profile Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            {/* Avatar Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-32 h-32 bg-white/20 rounded-full animate-pulse mb-4"></div>
              <div className="space-y-2 text-center">
                <div className="h-7 bg-white/20 rounded w-32 mx-auto animate-pulse"></div>
                <div className="h-5 bg-white/20 rounded w-48 mx-auto animate-pulse"></div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div className="h-6 bg-white/20 rounded w-40 animate-pulse"></div>
                <div className="h-10 bg-white/20 rounded w-20 animate-pulse"></div>
              </div>

              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 bg-white/10 rounded-xl">
                  <div className="h-4 bg-white/20 rounded w-24 mb-2 animate-pulse"></div>
                  <div className="h-6 bg-white/20 rounded w-full animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'group-details':
      return (
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-4">
              <div className="h-8 bg-white/20 rounded w-48 animate-pulse"></div>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 bg-white/20 rounded-full animate-pulse"></div>
                ))}
              </div>
            </div>
            <SkeletonButton className="w-40" />
          </div>

          {/* Balance Summary */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="h-6 bg-white/20 rounded w-32 mb-4 animate-pulse"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
                    <div className="h-5 bg-white/20 rounded w-32 animate-pulse"></div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-6 bg-white/20 rounded w-16 animate-pulse"></div>
                    <div className="h-8 bg-white/20 rounded w-16 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expenses List */}
          <div>
            <div className="h-7 bg-white/20 rounded w-40 mb-6 animate-pulse"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="space-y-4 animate-fade-in">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      );
  }
}

export default LoadingSkeleton;