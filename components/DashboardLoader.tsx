'use client';

export default function DashboardLoader() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="max-w-7xl mx-auto">
        <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-lg w-64 mb-8"></div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
            >
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4"></div>
              <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4"></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4"></div>
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}