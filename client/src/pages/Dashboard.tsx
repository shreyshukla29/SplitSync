import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import StatsCard from '../components/StatsCard';
import GroupCard from '../components/GroupCard';
import AddExpenseModal from '../components/AddExpenseModal';

function Dashboard() {
  const [showAddExpense, setShowAddExpense] = useState(false);

  const mockGroups = [
    {
      id: '1',
      name: 'College Friends',
      balance: -1200,
      memberCount: 4,
      members: ['Ravi', 'Priya', 'Amit', 'Sara']
    },
    {
      id: '2',
      name: 'Office Team',
      balance: 750,
      memberCount: 6,
      members: ['John', 'Emma', 'Mike', 'Lisa', 'David', 'Anna']
    },
    {
      id: '3',
      name: 'Roommates',
      balance: -320,
      memberCount: 3,
      members: ['Alex', 'Jordan', 'Sam']
    },
    {
      id: '4',
      name: 'Travel Group',
      balance: 1500,
      memberCount: 5,
      members: ['Maya', 'Chris', 'Taylor', 'Jordan', 'Casey']
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <button
          onClick={() => setShowAddExpense(true)}
          className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard
          title="You Owe"
          amount={1200}
          type="owe"
        />
        <StatsCard
          title="You Are Owed"
          amount={700}
          type="owed"
        />
      </div>

      {/* Groups Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">Your Groups</h2>
          <button className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200">
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockGroups.map((group) => (
            <GroupCard
              key={group.id}
              id={group.id}
              name={group.name}
              balance={group.balance}
              memberCount={group.memberCount}
              members={group.members}
            />
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowAddExpense(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 hover:shadow-3xl transition-all duration-300 z-20"
      >
        <PlusIcon className="h-8 w-8" />
      </button>

      {/* Add Expense Modal */}
      <AddExpenseModal
        isOpen={showAddExpense}
        onClose={() => setShowAddExpense(false)}
        groups={mockGroups}
      />
    </div>
  );
}

export default Dashboard;