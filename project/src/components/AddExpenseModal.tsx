import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  groups: Array<{
    id: string;
    name: string;
    members: string[];
  }>;
}

function AddExpenseModal({ isOpen, onClose, groups }: AddExpenseModalProps) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [splitType, setSplitType] = useState('equal');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const selectedGroupData = groups.find(g => g.id === selectedGroup);
  const memberCount = selectedMembers.length || 1;
  const sharePerPerson = amount ? (parseFloat(amount) / memberCount).toFixed(2) : '0.00';

  const handleMemberToggle = (member: string) => {
    setSelectedMembers(prev => 
      prev.includes(member) 
        ? prev.filter(m => m !== member)
        : [...prev, member]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle expense submission
    console.log({ title, amount, selectedGroup, paidBy, splitType, selectedMembers });
    onClose();
    // Reset form
    setTitle('');
    setAmount('');
    setSelectedGroup('');
    setPaidBy('');
    setSelectedMembers([]);
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
              <Dialog.Panel className="w-full max-w-xl bg-slate-800/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title className="text-2xl font-bold text-white">
                    Add New Expense
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Expense Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter expense description"
                      required
                    />
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Amount
                    </label>
                    <div className="relative">
                      <CurrencyRupeeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>

                  {/* Group Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Select Group
                    </label>
                    <select
                      value={selectedGroup}
                      onChange={(e) => setSelectedGroup(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    >
                      <option value="">Choose a group</option>
                      {groups.map((group) => (
                        <option key={group.id} value={group.id} className="bg-slate-800">
                          {group.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Paid By */}
                  {selectedGroupData && (
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Paid By
                      </label>
                      <select
                        value={paidBy}
                        onChange={(e) => setPaidBy(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      >
                        <option value="">Select who paid</option>
                        <option value="You" className="bg-slate-800">You</option>
                        {selectedGroupData.members.map((member) => (
                          <option key={member} value={member} className="bg-slate-800">
                            {member}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Split Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Split Type
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="equal"
                          checked={splitType === 'equal'}
                          onChange={(e) => setSplitType(e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-white">Equal Split</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="custom"
                          checked={splitType === 'custom'}
                          onChange={(e) => setSplitType(e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-white">Custom Split</span>
                      </label>
                    </div>
                  </div>

                  {/* Split With */}
                  {selectedGroupData && (
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Split With
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <label className="flex items-center p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors duration-200">
                          <input
                            type="checkbox"
                            checked={selectedMembers.includes('You')}
                            onChange={() => handleMemberToggle('You')}
                            className="mr-2"
                          />
                          <span className="text-white">You</span>
                        </label>
                        {selectedGroupData.members.map((member) => (
                          <label
                            key={member}
                            className="flex items-center p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors duration-200"
                          >
                            <input
                              type="checkbox"
                              checked={selectedMembers.includes(member)}
                              onChange={() => handleMemberToggle(member)}
                              className="mr-2"
                            />
                            <span className="text-white">{member}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Live Preview */}
                  {amount && selectedMembers.length > 0 && (
                    <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                      <h4 className="text-white font-medium mb-2">Preview</h4>
                      <p className="text-gray-300 text-sm">
                        Each person will pay: <span className="text-emerald-400 font-bold">₹{sharePerPerson}</span>
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-400 to-cyan-500 text-white font-medium py-3 px-4 rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300"
                  >
                    Add Expense
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default AddExpenseModal;