'use client';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log(error)
  return (
    <div className="text-center p-8 bg-red-50 border border-red-200 rounded-lg">
      <h2 className="text-xl font-semibold text-red-600 mb-4">
        Failed to load category
      </h2>
      <button
        onClick={reset}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Try Again
      </button>
    </div>
  );
}