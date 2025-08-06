import { useState } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import NavbarDemo from '@/components/ui/resizable-navbar-demo';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative">
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <NavbarDemo />
      )}
    </div>
  );
};

export default Index;
