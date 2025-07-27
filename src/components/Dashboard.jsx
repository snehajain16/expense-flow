import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useExpenses } from '../contexts/ExpenseContext';
import Header from './Header';
import ExpenseStats from './ExpenseStats';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import DuplicateDetector from './DuplicateDetector';
import { Plus, X } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { expenses, getDuplicateExpenses } = useExpenses();
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const duplicateExpenses = getDuplicateExpenses();

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'expenses', label: 'All Expenses' },
    { id: 'duplicates', label: `Duplicates (${duplicateExpenses.length})` }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <ExpenseStats />
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Expenses</h3>
              <ExpenseList limit={5} />
            </div>
          </div>
        );
      case 'expenses':
        return <ExpenseList />;
      case 'duplicates':
        return <DuplicateDetector />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600 mt-1">
              Here's your expense overview for this month
            </p>
          </div>
          <button
            onClick={() => setShowExpenseForm(true)}
            className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Expense
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {renderContent()}
      </div>

      {/* Add Expense Modal */}
      {showExpenseForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Add New Expense</h2>
              <button
                onClick={() => setShowExpenseForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <ExpenseForm onSuccess={() => setShowExpenseForm(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;