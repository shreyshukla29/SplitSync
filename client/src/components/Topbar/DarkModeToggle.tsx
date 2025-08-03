import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

interface DarkModeToggleProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ darkMode, onToggleDarkMode }) => {
  return (
    <button
      onClick={onToggleDarkMode}
      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 text-gray-300 hover:text-white"
    >
      {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
    </button>
  );
};

export default DarkModeToggle;
