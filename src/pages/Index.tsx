import { useState } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative">
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="min-h-screen bg-white"></div>
      )}
    </div>
  );
};

export default Index;
