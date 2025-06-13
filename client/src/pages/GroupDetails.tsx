import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';
import ExpenseCard from '../components/ExpenseCard';
import AddExpenseModal from '../components/AddExpenseModal';
import SettleModal from '../components/SettleModal';

function GroupDetails() {
  const { groupId } = useParams();
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showSettleModal, setShowSettleModal] = useState(false);
  const [selectedSettlement, setSelectedSettlement] = useState<{person: string, amount: number} | null>(null);

  // Mock data with notes and comments
  const groupData = {
    id: groupId,
    name: 'College Friends',
    members: ['You', 'Ravi', 'Priya', 'Amit'],
    expenses: [
      {
        id: '1',
        title: 'Dinner at Pizza Hut',
        amount: 1200,
        paidBy: 'You',
        splitType: 'Equal Split',
        date: '2024-01-15',
        hasNotes: true,
        commentCount: 3
      },
      {
        id: '2',
        title: 'Movie Tickets',
        amount: 800,
        paidBy: 'Ravi',
        splitType: 'Equal Split',
        date: '2024-01-14',
        hasNotes: false,
        commentCount: 1
      },
      {
        id: '3',
        title: 'Uber Ride',
        amount: 320,
        paidBy: 'Priya',
        splitType: 'Custom Split',
        date: '2024-01-13',
        hasNotes: true,
        commentCount: 0
      }
    ],
    balances: [
      { person: 'Ravi', amount: -400, type: 'owe' },
      { person: 'Priya', amount: 150, type: 'owed' },
      { person: 'Amit', amount: -250, type: 'owe' }
    ]
  };

  const handleSettle = (person: string, amount: number) => {
    setSelectedSettlement({ person, amount });
    setShowSettleModal(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{groupData.name}</h1>
          <div className="flex items-center space-x-2">
            {groupData.members.map((member, index) => (
              <div
                key={index}
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-medium"
              >
                {member === 'You' ? 'Y' : member.charAt(0)}
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => setShowAddExpense(true)}
          className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Balance Summary */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20">
        <h2 className="text-xl font-semibold text-white mb-4">Balance Summary</h2>
        <div className="space-y-3">
          {groupData.balances.map((balance, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {balance.person.charAt(0)}
                </div>
                <span className="text-white">
                  {balance.type === 'owe' ? `You owe ${balance.person}` : `${balance.person} owes you`}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`font-bold ${
                  balance.type === 'owe' ? 'text-red-400' : 'text-emerald-400'
                }`}>
                  ₹{Math.abs(balance.amount)}
                </span>
                {balance.type === 'owe' && (
                  <button
                    onClick={() => handleSettle(balance.person, Math.abs(balance.amount))}
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-all duration-300"
                  >
                    Settle
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expenses List */}
      <div>
        <h2 className="text-2xl font-semibold text-white mb-6">Recent Expenses</h2>
        <div className="space-y-4">
          {groupData.expenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              title={expense.title}
              amount={expense.amount}
              paidBy={expense.paidBy}
              splitType={expense.splitType}
              date={expense.date}
              hasNotes={expense.hasNotes}
              commentCount={expense.commentCount}
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

      {/* Modals */}
      <AddExpenseModal
        isOpen={showAddExpense}
        onClose={() => setShowAddExpense(false)}
        groups={[{ id: groupId!, name: groupData.name, members: groupData.members }]}
      />

      {selectedSettlement && (
        <SettleModal
          isOpen={showSettleModal}
          onClose={() => {
            setShowSettleModal(false);
            setSelectedSettlement(null);
          }}
          person={selectedSettlement.person}
          amount={selectedSettlement.amount}
        />
      )}
    </div>
  );
}

export default GroupDetails;