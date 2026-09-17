import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Page Not Found</p>
      <Link
        to="/"
        className="px-6 py-3 bg-[#FFB800] text-black rounded-full hover:bg-[#ffc93c] transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
