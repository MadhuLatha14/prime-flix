
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const LoadingSkeleton = () => {
  const { theme } = useTheme();

  return (
    <div className="space-y-12">
      {[1, 2, 3].map((section) => (
        <div key={section} className="space-y-4">
          <div className={`h-8 ${theme.surface} rounded-lg w-48 animate-pulse`}></div>
          <div className="flex space-x-4 overflow-hidden">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className={`min-w-[280px] h-[400px] ${theme.surface} rounded-lg animate-pulse`}
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
