import React, { useState } from 'react';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';

function Transactions() {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDate, setSelectedDate] = useState('All Time');
  const [selectedGroup, setSelectedGroup] = useState('All Groups');

  const transactions = [
    {
      id: '1',
      type: 'payment',
      description: 'Paid Ravi',
      amount: 400,
      date: '2024-01-15',
      status: 'settled',
      group: 'College Friends',
      icon: '💸'
    },
    {
      id: '2',
      type: 'expense',
      description: 'Added "Dinner at Pizza Hut"',
      amount: 1200,
      date: '2024-01-15',
      status: 'created',
      group: 'College Friends',
      icon: '🍕'
    },
    {
      id: '3',
      type: 'payment',
      description: 'Received from Priya',
      amount: 150,
      date: '2024-01-14',
      status: 'settled',
      group: 'Office Team',
      icon: '💰'
    },
    {
      id: '4',
      type: 'expense',
      description: 'Added "Movie Tickets"',
      amount: 800,
      date: '2024-01-14',
      status: 'owed',
      group: 'College Friends',
      icon: '🎬'
    },
    {
      id: '5',
      type: 'expense',
      description: 'Added "Uber Ride"',
      amount: 320,
      date: '2024-01-13',
      status: 'owed',
      group: 'Roommates',
      icon: '🚗'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'settled':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'created':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
      case 'owed':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/40';
    }
  };

  const getAmountColor = (type: string) => {
    return type === 'payment' ? 'text-red-400' : 'text-emerald-400';
  };

  const dropdownOptions = {
    type: ['All', 'Expenses', 'Payments'],
    date: ['All Time', 'This Week', 'This Month', 'Last Month'],
    group: ['All Groups', 'College Friends', 'Office Team', 'Roommates']
  };

  const DropdownFilter = ({ 
    label, 
    value, 
    options, 
    onChange 
  }: { 
    label: string; 
    value: string; 
    options: string[]; 
    onChange: (value: string) => void;
  }) => (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-4 py-2 text-sm text-white transition-all duration-300">
        <span>{value}</span>
        <ChevronDownIcon className="h-4 w-4" />
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 focus:outline-none z-10">
        <div className="p-1">
          {options.map((option) => (
            <Menu.Item key={option}>
              {({ active }) => (
                <button
                  onClick={() => onChange(option)}
                  className={`${
                    active ? 'bg-white/10' : ''
                  } block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white rounded-lg transition-colors duration-200`}
                >
                  {option}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white border-b-2 border-indigo-500 w-fit pb-2">
          Transactions
        </h1>
        <div className="flex items-center space-x-2">
          <FunnelIcon className="h-5 w-5 text-gray-400" />
          <span className="text-gray-400 text-sm">Filter by:</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <DropdownFilter
          label="Type"
          value={selectedType}
          options={dropdownOptions.type}
          onChange={setSelectedType}
        />
        <DropdownFilter
          label="Date"
          value={selectedDate}
          options={dropdownOptions.date}
          onChange={setSelectedDate}
        />
        <DropdownFilter
          label="Group"
          value={selectedGroup}
          options={dropdownOptions.group}
          onChange={setSelectedGroup}
        />
      </div>

      {/* Active Filters */}
      {(selectedType !== 'All' || selectedDate !== 'All Time' || selectedGroup !== 'All Groups') && (
        <div className="flex flex-wrap gap-2">
          {selectedType !== 'All' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-400 border border-indigo-500/40">
              Type: {selectedType}
            </span>
          )}
          {selectedDate !== 'All Time' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-400 border border-indigo-500/40">
              Date: {selectedDate}
            </span>
          )}
          {selectedGroup !== 'All Groups' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-400 border border-indigo-500/40">
              Group: {selectedGroup}
            </span>
          )}
        </div>
      )}

      {/* Transactions List */}
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20 hover:border-white/40 hover:scale-[1.02] transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl">
                  {transaction.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-gray-100">
                    {transaction.description}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <span>{transaction.group}</span>
                    <span>•</span>
                    <span>{transaction.date}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`text-xl font-bold ${getAmountColor(transaction.type)}`}>
                  {transaction.type === 'payment' && transaction.description.includes('Paid') ? '-' : '+'}
                  ₹{transaction.amount.toLocaleString()}
                </p>
                <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(transaction.status)} mt-1`}>
                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 border border-white/20">
          Load More Transactions
        </button>
      </div>
    </div>
  );
}

export default Transactions;