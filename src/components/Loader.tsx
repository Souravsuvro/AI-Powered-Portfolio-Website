import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Loader: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center
      ${theme === 'dark' ? 'bg-[#1E1E1E]' : 'bg-white'}`}
    >
      <div
        className={`w-16 h-16 border-4 rounded-full animate-spin
        ${theme === 'dark' ? 'border-[#FFB800] border-t-transparent' : 'border-[#113768] border-t-transparent'}`}
      />
    </div>
  );
};

export default Loader;
