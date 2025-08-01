import { useState, useEffect } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import { CustomCursor } from '@/components/CustomCursor';
import { HeroSection } from '@/components/HeroSection';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative">
      <CustomCursor />
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <HeroSection />
      )}
    </div>
  );
};

export default Index;
