// app/orders/[orderId]/error.tsx
'use client';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log(error)
  return (
    <div className="container mx-auto p-4 bg-red-50 border border-red-200 rounded">
      <h2 className="text-red-600 font-bold mb-2">
        Failed to load order details
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