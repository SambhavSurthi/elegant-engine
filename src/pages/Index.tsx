import { useState } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import { MainLayout } from '@/components/layout';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative">
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <MainLayout />
      )}
    </div>
  );
};

export default Index;
