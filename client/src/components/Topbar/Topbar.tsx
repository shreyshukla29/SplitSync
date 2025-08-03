import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import DarkModeToggle from './DarkModeToggle';
import UserMenu from './UserMenu';

interface TopbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ darkMode, onToggleDarkMode }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <header className="sticky top-0 z-30 bg-white/10 backdrop-blur-sm border-b border-white/20 p-4">
      <div className="flex justify-between items-center ml-20 lg:ml-0">
        <h1 className="text-xl font-semibold text-gray-100">
          Hey, {user?.name}! 👋
        </h1>
        <div className="flex items-center space-x-4">
          <DarkModeToggle darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
          <UserMenu user={user} />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
