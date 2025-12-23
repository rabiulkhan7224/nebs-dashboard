
import Link from 'next/link';

export default function DashboardNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto text-center py-20">
        <h1 className="text-7xl font-bold text-gray-300 dark:text-gray-700 mb-6">
          404
        </h1>

        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Dashboard Page Not Found
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-lg mx-auto">
          The dashboard page you&apos;re trying to access doesn&apos;t exist. Check the URL or navigate back.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition"
          >
            Back to Dashboard
          </Link>

          <Link
            href="/"
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}