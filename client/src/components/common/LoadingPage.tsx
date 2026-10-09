import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const LoadingPage: React.FC = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size={48} />
        <p className="text-lg font-medium text-muted-foreground animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export { LoadingPage };
export default LoadingPage;
