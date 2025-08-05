import { useState, useEffect } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import { HeroSection } from '@/components/HeroSection';
import NavbarDemo from '@/components/Navbar';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative">
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          <NavbarDemo />
          <HeroSection />
        </>
      )}
    </div>
  );
};

export default Index;
