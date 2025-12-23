import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-6">
      <div className="text-center max-w-md">
        {/* 404 Illustration */}
        <h1 className="text-8xl font-bold text-gray-300 dark:text-gray-700 mb-4">
          404
        </h1>

        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Page Not Found
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Go Home
          </Link>

          <Link
            href="/dashboard"
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}