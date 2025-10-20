"use client";

import React from 'react';
import { motion } from 'motion/react';
import { MorphingPopover, MorphingPopoverContent, MorphingPopoverTrigger } from './morphing-popover';
import { AnimatedDownloadButton } from './animated-download-button';
import { resumeData } from '@/data/resume-data';

interface ResumePopoverProps {
  children: React.ReactNode;
}

export const ResumePopover: React.FC<ResumePopoverProps> = ({ children }) => {
  const handleDownload = async (resumeData: any) => {
    console.log('Download button clicked!', resumeData.fileName);

    try {
      // Method 1: Try fetch and blob download (most reliable)
      const response = await fetch(resumeData.downloadUrl);

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = resumeData.fileName;
        link.style.display = 'none';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the URL object
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 100);

        console.log('Download successful!');
      } else {
        console.log('Fetch failed, trying fallback...');
        // Fallback: try direct link download
        const link = document.createElement('a');
        link.href = resumeData.downloadUrl;
        link.download = resumeData.fileName;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Download failed:', error);
      // Final fallback: open in new tab
      window.open(resumeData.downloadUrl, '_blank');
    }
  };

  // Handle scroll events to prevent page scrolling when popover content is scrollable
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  // Handle wheel events to prevent page scrolling when popover content is scrollable
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <MorphingPopover>
      <MorphingPopoverTrigger asChild>
        {children}
      </MorphingPopoverTrigger>
      <MorphingPopoverContent className="w-80 mb-64 md:mb-0 md:w-[500px] max-h-[80vh] overflow-y-auto p-4 md:p-6 shadow-lg bg-white dark:bg-zinc-800">
        <div className="space-y-4" onScroll={handleScroll} onWheel={handleWheel}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center relative"
          >
            {/* Mobile Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Find and click the backdrop to close
                const backdrop = document.querySelector('.fixed.inset-0.bg-black\\/20');
                if (backdrop) {
                  backdrop.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                }
              }}
              className="md:hidden absolute top-0 right-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors z-10"
            >
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Choose Your Resume
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Select the resume that best fits your needs
            </p>
          </motion.div>

          <div className="space-y-3">
            {resumeData.map((resume, index) => (
              <motion.div
                key={resume.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors gap-3 pointer-events-auto"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {resume.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {resume.description}
                  </p>
                </div>
                <AnimatedDownloadButton
                  onClick={() => handleDownload(resume)}
                  className="w-full sm:w-auto cursor-pointer relative z-10"
                >
                  Download
                </AnimatedDownloadButton>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center pt-2"
          >
            <p className="text-xs text-gray-500 dark:text-gray-400">
              All resumes are in PDF format
            </p>
          </motion.div>
        </div>
      </MorphingPopoverContent>
    </MorphingPopover>
  );
};
