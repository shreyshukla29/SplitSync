import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface SettleModalProps {
  isOpen: boolean;
  onClose: () => void;
  person: string;
  amount: number;
}

function SettleModal({ isOpen, onClose, person, amount }: SettleModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 2000);
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md bg-slate-800/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20 ring-1 ring-emerald-500/20">
                {!isSuccess ? (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <Dialog.Title className="text-2xl font-bold text-white">
                        Settle with {person}
                      </Dialog.Title>
                      <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>

                    <div className="text-center mb-8">
                      <div className="w-24 h-24 mx-auto bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mb-4">
                        <span className="text-white text-3xl font-bold">
                          {person.charAt(0)}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-emerald-400 mb-2">
                        ₹{amount.toLocaleString()}
                      </h3>
                      <p className="text-gray-300">
                        You are settling your debt with {person}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                        <div className="flex justify-between items-center text-sm text-gray-300 mb-2">
                          <span>Payment Method</span>
                          <span className="text-emerald-400">UPI</span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-300">
                          <span>Processing Fee</span>
                          <span>₹0</span>
                        </div>
                      </div>

                      <button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className={`w-full py-4 px-6 rounded-xl font-medium text-white transition-all duration-300 ${
                          isProcessing
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:scale-105 hover:shadow-lg'
                        }`}
                      >
                        {isProcessing ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Processing Payment...</span>
                          </div>
                        ) : (
                          'Pay with Razorpay'
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 mx-auto bg-emerald-500 rounded-full flex items-center justify-center mb-6">
                      <CheckCircleIcon className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Payment Successful!
                    </h3>
                    <p className="text-gray-300 mb-4">
                      You have successfully settled ₹{amount} with {person}
                    </p>
                    <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-xl p-4">
                      <p className="text-emerald-400 text-sm font-medium">
                        Transaction completed and balances updated
                      </p>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default SettleModal;