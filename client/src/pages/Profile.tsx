import React, { useState } from 'react';
import { CameraIcon, PencilIcon } from '@heroicons/react/24/outline';
import ProfileForm from '../components/ProfileForm';

interface ProfileProps {
  user: { name: string; email: string };
  onLogout: () => void;
}

function Profile({ user, onLogout }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    upiId: 'shrey@paytm'
  });

  const handleSave = (data: typeof profileData) => {
    setProfileData(data);
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
        <p className="text-gray-300">Manage your account settings</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <div className="w-32 h-32 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center border-4 border-white/20 group-hover:border-white/40 transition-all duration-300">
              <span className="text-white font-bold text-4xl">
                {profileData.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <button className="absolute bottom-2 right-2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm">
              <CameraIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="text-center mt-4">
            <h2 className="text-2xl font-bold text-white">{profileData.name}</h2>
            <p className="text-gray-300">{profileData.email}</p>
          </div>
        </div>

        {/* Profile Form */}
        <ProfileForm
          data={profileData}
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />

        {/* Logout Button */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <button
            onClick={onLogout}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-medium py-3 px-4 rounded-xl hover:from-red-600 hover:to-red-700 hover:animate-pulse transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Additional Settings */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4">Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
            <div>
              <h4 className="text-white font-medium">Email Notifications</h4>
              <p className="text-gray-300 text-sm">Receive notifications about expenses and settlements</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
            <div>
              <h4 className="text-white font-medium">Push Notifications</h4>
              <p className="text-gray-300 text-sm">Get notified about new expenses and payments</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;