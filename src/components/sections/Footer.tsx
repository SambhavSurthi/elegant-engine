'use client';

import React, { memo } from 'react';

const Footer: React.FC = () => {
  return (
    <footer className='group bg-[#06060e]'>
      <h1 className='text-[16vw] translate-y-20 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-gray-400 to-gray-800 bg-clip-text text-transparent transition-all ease-linear'>
        ui-layout
      </h1>
      <div className='bg-black text-white h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full'>
        {/* Footer content can be added here */}
      </div>
    </footer>
  );
};

export default memo(Footer);
