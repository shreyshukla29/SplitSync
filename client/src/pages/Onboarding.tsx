import React, { useState, useRef } from 'react';
import { 
  ArrowRightIcon, 
  ArrowLeftIcon, 
  CheckIcon,
  CameraIcon,
  QrCodeIcon,
  CloudArrowUpIcon,
  UserIcon,
  CurrencyRupeeIcon,
  UserGroupIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface OnboardingProps {
  onComplete: () => void;
  userName: string;
}

function Onboarding({ onComplete, userName }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: userName || '',
    displayName: '',
    profilePicture: null as File | null,
    upiId: '',
    qrCode: null as File | null,
    currency: 'INR',
    defaultSplit: 'equal',
    inviteContacts: false
  });
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const qrInputRef = useRef<HTMLInputElement>(null);

  const totalSteps = 5;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = (file: File, type: 'profile' | 'qr') => {
    if (type === 'profile') {
      setFormData({ ...formData, profilePicture: file });
    } else {
      setFormData({ ...formData, qrCode: file });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0], 'qr');
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName.trim().length > 0;
      case 2:
        return formData.upiId.trim().length > 0 || formData.qrCode;
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-8 animate-fade-in">
            <div className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <SparklesIcon className="h-12 w-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">
                Welcome to SplitSync, {userName}! 🎉
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Let's set up your profile in just a few steps so you can start splitting expenses with friends.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-md mx-auto">
              <div className="flex items-center space-x-4">
                <CheckCircleIcon className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                <span className="text-white">Quick 2-minute setup</span>
              </div>
              <div className="flex items-center space-x-4 mt-3">
                <CheckCircleIcon className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                <span className="text-white">Secure & private</span>
              </div>
              <div className="flex items-center space-x-4 mt-3">
                <CheckCircleIcon className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                <span className="text-white">Skip any step if needed</span>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <UserIcon className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Personal Information</h2>
              <p className="text-gray-300">Tell us a bit about yourself</p>
            </div>

            <div className="max-w-md mx-auto space-y-6">
              {/* Profile Picture Upload */}
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center border-4 border-white/20 group cursor-pointer hover:border-white/40 transition-all duration-300">
                    {formData.profilePicture ? (
                      <img 
                        src={URL.createObjectURL(formData.profilePicture)} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold text-2xl">
                        {formData.fullName.charAt(0).toUpperCase() || 'U'}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                  >
                    <CameraIcon className="h-4 w-4" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'profile')}
                    className="hidden"
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">Click to upload profile picture</p>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Display Name */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Display Name (Optional)
                </label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  placeholder="Nickname or preferred name"
                />
                <p className="text-xs text-gray-400 mt-1">This is how friends will see you in groups</p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CurrencyRupeeIcon className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Payment Details</h2>
              <p className="text-gray-300">Set up your UPI for easy settlements</p>
            </div>

            <div className="max-w-md mx-auto space-y-6">
              {/* UPI ID Input */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  UPI ID
                </label>
                <input
                  type="text"
                  value={formData.upiId}
                  onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  placeholder="yourname@paytm"
                />
                <p className="text-xs text-gray-400 mt-1">
                  💡 Used for settling balances with friends
                </p>
              </div>

              <div className="text-center text-gray-400">
                <span>OR</span>
              </div>

              {/* QR Code Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Upload UPI QR Code
                </label>
                <div
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer ${
                    dragActive 
                      ? 'border-emerald-400 bg-emerald-400/10' 
                      : 'border-white/30 hover:border-white/50 bg-white/5'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => qrInputRef.current?.click()}
                >
                  {formData.qrCode ? (
                    <div className="space-y-2">
                      <CheckCircleIcon className="h-12 w-12 text-emerald-400 mx-auto" />
                      <p className="text-emerald-400 font-medium">QR Code uploaded!</p>
                      <p className="text-sm text-gray-400">{formData.qrCode.name}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <CloudArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto" />
                      <p className="text-white">Drop your QR code here</p>
                      <p className="text-sm text-gray-400">or click to browse</p>
                    </div>
                  )}
                  <input
                    ref={qrInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'qr')}
                    className="hidden"
                  />
                </div>
              </div>

              {(formData.upiId || formData.qrCode) && (
                <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-xl p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Payment method configured!</span>
                  </div>
                  <p className="text-emerald-300 text-sm mt-1">
                    Friends can now send you money directly through the app
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <UserGroupIcon className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Default Settings</h2>
              <p className="text-gray-300">Customize your preferences</p>
            </div>

            <div className="max-w-md mx-auto space-y-6">
              {/* Currency Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Default Currency
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="INR" className="bg-slate-800">₹ Indian Rupee (INR)</option>
                  <option value="USD" className="bg-slate-800">$ US Dollar (USD)</option>
                  <option value="EUR" className="bg-slate-800">€ Euro (EUR)</option>
                  <option value="GBP" className="bg-slate-800">£ British Pound (GBP)</option>
                </select>
              </div>

              {/* Default Split Type */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Default Split Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setFormData({ ...formData, defaultSplit: 'equal' })}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      formData.defaultSplit === 'equal'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                        : 'bg-white/10 border-white/20 text-gray-300 hover:border-white/40'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">⚖️</div>
                      <div className="font-medium">Equal Split</div>
                      <div className="text-xs opacity-75">Split evenly among all</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setFormData({ ...formData, defaultSplit: 'custom' })}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      formData.defaultSplit === 'custom'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                        : 'bg-white/10 border-white/20 text-gray-300 hover:border-white/40'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">🎯</div>
                      <div className="font-medium">Custom Split</div>
                      <div className="text-xs opacity-75">Set custom amounts</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Invite Contacts Toggle */}
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Invite Contacts</h4>
                    <p className="text-gray-300 text-sm">Find friends already using SplitSync</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.inviteContacts}
                      onChange={(e) => setFormData({ ...formData, inviteContacts: e.target.checked })}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckIcon className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">You're all set! 🎉</h2>
              <p className="text-gray-300">Your SplitSync profile is ready to go</p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 space-y-4">
                <h3 className="text-white font-semibold text-lg mb-4">Profile Summary</h3>
                
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center">
                    {formData.profilePicture ? (
                      <img 
                        src={URL.createObjectURL(formData.profilePicture)} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold text-xl">
                        {formData.fullName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="text-white font-medium">{formData.fullName}</div>
                    {formData.displayName && (
                      <div className="text-gray-300 text-sm">"{formData.displayName}"</div>
                    )}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/20">
                  <div className="flex justify-between">
                    <span className="text-gray-300">UPI ID:</span>
                    <span className="text-white">{formData.upiId || 'QR Code uploaded'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Currency:</span>
                    <span className="text-white">{formData.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Default Split:</span>
                    <span className="text-white capitalize">{formData.defaultSplit}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-emerald-500/20 border border-emerald-500/40 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircleIcon className="h-5 w-5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Ready to start splitting!</span>
                </div>
                <p className="text-emerald-300 text-sm">
                  You can now create groups, add expenses, and settle balances with friends.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Step {currentStep + 1} of {totalSteps}</span>
            <span className="text-sm text-gray-400">{Math.round(progress)}% complete</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-emerald-400 to-cyan-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/20">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                currentStep === 0
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span>Back</span>
            </button>

            {currentStep === totalSteps - 1 ? (
              <button
                onClick={onComplete}
                className="bg-gradient-to-r from-emerald-400 to-cyan-500 text-white px-8 py-3 rounded-xl font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <span>Go to Dashboard</span>
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isStepValid()
                    ? 'bg-gradient-to-r from-emerald-400 to-cyan-500 text-white hover:scale-105 hover:shadow-lg'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>{currentStep === 0 ? 'Start Setup' : 'Continue'}</span>
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Skip Option */}
          {currentStep > 0 && currentStep < totalSteps - 1 && (
            <div className="text-center mt-4">
              <button
                onClick={handleNext}
                className="text-gray-400 hover:text-gray-300 text-sm transition-colors duration-200"
              >
                Skip this step
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Onboarding;