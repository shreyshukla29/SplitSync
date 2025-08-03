import React from 'react';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useAppDispatch } from './../../hooks/useAppDispatch';
import { logoutThunk } from './../../store/auth/authThunk';
import { useNavigate } from 'react-router-dom';

interface UserMenuProps {
  user: {
    name: string;
    email: string;
  };
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = async() => {
   const response = await dispatch(logoutThunk());
   if (logoutThunk.fulfilled.match(response)) {
      navigate('/');
    }
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 rounded-xl px-4 py-2 transition-all duration-300">
        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center">
          <span className="text-white font-medium text-sm">{user.name.charAt(0).toUpperCase()}</span>
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
                onClick={handleLogout}
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
  );
};

export default UserMenu;
