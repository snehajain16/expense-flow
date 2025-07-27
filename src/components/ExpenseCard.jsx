import React, { useState } from 'react';
import { useExpenses } from '../contexts/ExpenseContext';
import { Calendar, Tag, FileText, Edit, Trash2, AlertTriangle, Eye } from 'lucide-react';

const ExpenseCard = ({ expense }) => {
  const { updateExpense, deleteExpense, markAsNotDuplicate, loading } = useExpenses();
  const [showReceipt, setShowReceipt] = useState(false);

  const getCategoryColor = (category) => {
    const colors = {
      'Food & Dining': 'bg-orange-100 text-orange-800',
      'Transportation': 'bg-blue-100 text-blue-800',
      'Shopping': 'bg-purple-100 text-purple-800',
      'Entertainment': 'bg-pink-100 text-pink-800',
      'Bills & Utilities': 'bg-red-100 text-red-800',
      'Healthcare': 'bg-green-100 text-green-800',
      'Travel': 'bg-indigo-100 text-indigo-800',
      'Education': 'bg-yellow-100 text-yellow-800',
      'Business': 'bg-gray-100 text-gray-800',
      'Other': 'bg-slate-100 text-slate-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      await deleteExpense(expense.id);
    }
  };

  const handleMarkAsNotDuplicate = () => {
    markAsNotDuplicate(expense.id);
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border hover:shadow-md transition-all ${
      expense.isDuplicate ? 'border-amber-200 bg-amber-50' : 'border-gray-200'
    }`}>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{expense.title}</h3>
              {expense.isDuplicate && (
                <div className="flex items-center text-amber-600 bg-amber-100 px-2 py-1 rounded-full text-xs font-medium">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Potential Duplicate
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(expense.date)}
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(expense.category)}`}>
                  {expense.category}
                </span>
              </div>
              {expense.receipt && (
                <button
                  onClick={() => setShowReceipt(true)}
                  className="flex items-center text-blue-600 hover:text-blue-700"
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Receipt
                </button>
              )}
            </div>

            {expense.description && (
              <p className="text-gray-600 text-sm mb-3">{expense.description}</p>
            )}
          </div>

          <div className="text-right ml-4">
            <p className="text-2xl font-bold text-gray-900">
              ${expense.amount.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex space-x-2">
            {expense.isDuplicate && (
              <button
                onClick={handleMarkAsNotDuplicate}
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Mark as Unique
              </button>
            )}
          </div>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      {showReceipt && expense.receipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Receipt - {expense.title}</h3>
              <button
                onClick={() => setShowReceipt(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Eye className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <img
                src={expense.receipt.data}
                alt="Receipt"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseCard;