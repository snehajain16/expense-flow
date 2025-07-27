import React from 'react';
import { useExpenses } from '../contexts/ExpenseContext';
import ExpenseCard from './ExpenseCard';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const DuplicateDetector = () => {
  const { getDuplicateExpenses, markAsNotDuplicate } = useExpenses();
  const duplicateExpenses = getDuplicateExpenses();

  const handleMarkAllAsUnique = () => {
    if (window.confirm('Mark all flagged expenses as unique? This action cannot be undone.')) {
      duplicateExpenses.forEach(expense => {
        markAsNotDuplicate(expense.id);
      });
    }
  };

  if (duplicateExpenses.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Duplicates Found</h3>
        <p className="text-gray-600">
          Great! All your expenses look unique. Our system automatically checks for potential duplicates based on amount, category, and date proximity.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-amber-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-amber-900">
                {duplicateExpenses.length} Potential Duplicate{duplicateExpenses.length !== 1 ? 's' : ''} Found
              </h3>
              <p className="text-amber-700 mt-1">
                These expenses appear similar to others in your records. Review them below to avoid double-counting.
              </p>
            </div>
          </div>
          {duplicateExpenses.length > 1 && (
            <button
              onClick={handleMarkAllAsUnique}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              Mark All as Unique
            </button>
          )}
        </div>
      </div>

      {/* Duplicate Detection Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="font-semibold text-blue-900 mb-2">How Duplicate Detection Works</h4>
        <div className="text-blue-800 text-sm space-y-1">
          <p>• Expenses with the same amount and category within 3 days of each other</p>
          <p>• Similar transaction patterns that might indicate double-entry</p>
          <p>• You can mark expenses as unique if they're legitimately separate transactions</p>
        </div>
      </div>

      {/* Duplicate Expenses */}
      <div className="space-y-4">
        {duplicateExpenses.map(expense => (
          <ExpenseCard key={expense.id} expense={expense} />
        ))}
      </div>

      {/* Tips */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-2">💡 Tips for Managing Duplicates</h4>
        <ul className="text-gray-700 text-sm space-y-1">
          <li>• Check your bank statements to verify which expenses are legitimate</li>
          <li>• Look for recurring subscriptions that might be charged on different dates</li>
          <li>• Consider adding more descriptive titles to help differentiate similar expenses</li>
          <li>• Upload receipts when available to provide additional context</li>
        </ul>
      </div>
    </div>
  );
};

export default DuplicateDetector;