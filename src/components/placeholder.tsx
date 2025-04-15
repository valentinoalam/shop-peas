import React from 'react';

const LoadingPlaceholder = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="animate-pulse space-y-4 w-full max-w-md">
        <div className="h-10 bg-gray-300 rounded"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-6 bg-gray-300 rounded col-span-2"></div>
            <div className="h-6 bg-gray-300 rounded col-span-1"></div>
          </div>
          <div className="h-6 bg-gray-300 rounded"></div>
        </div>
        <div className="h-32 bg-gray-300 rounded"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-12 bg-gray-300 rounded"></div>
          <div className="h-12 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPlaceholder;