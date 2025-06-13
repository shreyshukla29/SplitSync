import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  PlusIcon,
  CreditCardIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  UserGroupIcon as UserGroupIconSolid,
  PlusIcon as PlusIconSolid,
  CreditCardIcon as CreditCardIconSolid,
  UserIcon as UserIconSolid,
} from '@heroicons/react/24/solid';

interface SidebarNavProps {
  onLogout: () => void;
}

function SidebarNav({ onLogout }: SidebarNavProps) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: HomeIcon, iconSolid: HomeIconSolid },
    { name: 'Groups', path: '/groups', icon: UserGroupIcon, iconSolid: UserGroupIconSolid },
    { name: 'Add', path: '/add', icon: PlusIcon, iconSolid: PlusIconSolid },
    { name: 'Transactions', path: '/transactions', icon: CreditCardIcon, iconSolid: CreditCardIconSolid },
    { name: 'Profile', path: '/profile', icon: UserIcon, iconSolid: UserIconSolid },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white/10 backdrop-blur-lg rounded-xl text-white hover:bg-white/20 transition-all duration-300"
      >
        {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-20 lg:w-64 bg-white/10 backdrop-blur-lg shadow-xl rounded-r-2xl border-r border-white/20 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="flex items-center justify-center lg:justify-start mb-8 pt-8 lg:pt-4">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="hidden lg:block ml-3 text-xl font-bold text-white">SplitSync</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = isActive(item.path) ? item.iconSolid : item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`flex items-center justify-center lg:justify-start px-4 py-3 rounded-xl transition-all duration-300 group ${
                        isActive(item.path)
                          ? 'bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 text-white border-l-4 border-emerald-400'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                      title={item.name}
                    >
                      <Icon className="h-6 w-6 flex-shrink-0" />
                      <span className="hidden lg:block ml-3 font-medium">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="flex items-center justify-center lg:justify-start px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300 group"
            title="Logout"
          >
            <ArrowRightOnRectangleIcon className="h-6 w-6 flex-shrink-0" />
            <span className="hidden lg:block ml-3 font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default SidebarNav;