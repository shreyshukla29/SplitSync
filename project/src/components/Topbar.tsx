import React from 'react';
import { Menu } from '@headlessui/react';
import { SunIcon, MoonIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface TopbarProps {
  user: { name: string; email: string };
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
}

function Topbar({ user, darkMode, onToggleDarkMode, onLogout }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/10 backdrop-blur-sm border-b border-white/20 p-4">
      <div className="flex justify-between items-center ml-20 lg:ml-0">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-100">
            Hey, {user.name}! 👋
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Dark mode toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 text-gray-300 hover:text-white"
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>

          {/* User dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 rounded-xl px-4 py-2 transition-all duration-300">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-gray-300">{user.email}</p>
              </div>
              <ChevronDownIcon className="h-4 w-4 text-gray-400" />
            </Menu.Button>

            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 focus:outline-none">
              <div className="p-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/profile"
                      className={`${
                        active ? 'bg-white/10' : ''
                      } block px-4 py-2 text-sm text-gray-300 hover:text-white rounded-lg transition-colors duration-200`}
                    >
                      Profile
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={onLogout}
                      className={`${
                        active ? 'bg-red-500/10' : ''
                      } block w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 rounded-lg transition-colors duration-200`}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Topbar;