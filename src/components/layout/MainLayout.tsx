'use client';

import React, { memo } from 'react';
import { Navbar } from './index';
import { ScrollContainer } from '../sections/index';

const MainLayout: React.FC = () => {
  return (
    <div className="relative w-full">
      <Navbar />
      <ScrollContainer />
    </div>
  );
};

export default memo(MainLayout);
