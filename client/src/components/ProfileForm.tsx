import React, { useState } from 'react';
import { PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ProfileFormProps {
  data: {
    name: string;
    email: string;
    upiId: string;
  };
  isEditing: boolean;
  onEdit: () => void;
  onSave: (data: { name: string; email: string; upiId: string }) => void;
  onCancel: () => void;
}

function ProfileForm({ data, isEditing, onEdit, onSave, onCancel }: ProfileFormProps) {
  const [formData, setFormData] = useState(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleCancel = () => {
    setFormData(data);
    onCancel();
  };

  if (!isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Personal Information</h3>
          <button
            onClick={onEdit}
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white px-4 py-2 rounded-xl transition-all duration-300"
          >
            <PencilIcon className="h-4 w-4" />
            <span>Edit</span>
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-white/10 rounded-xl">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Full Name
            </label>
            <p className="text-white font-medium">{data.name}</p>
          </div>

          <div className="p-4 bg-white/10 rounded-xl">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <p className="text-white font-medium">{data.email}</p>
          </div>

          <div className="p-4 bg-white/10 rounded-xl">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              UPI ID
            </label>
            <p className="text-white font-medium">{data.upiId || 'Not set'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Edit Profile</h3>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={handleCancel}
            className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl transition-all duration-300"
          >
            <XMarkIcon className="h-4 w-4" />
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-2 rounded-xl hover:scale-105 transition-all duration-300"
          >
            <CheckIcon className="h-4 w-4" />
            <span>Save</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-xl text-gray-400 cursor-not-allowed"
            readOnly
            disabled
          />
          <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            UPI ID (Optional)
          </label>
          <input
            type="text"
            value={formData.upiId}
            onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
            placeholder="your-upi@bank"
          />
          <p className="text-xs text-gray-400 mt-1">Used for settlements and payments</p>
        </div>
      </div>
    </form>
  );
}

export default ProfileForm;