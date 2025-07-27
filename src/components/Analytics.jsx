import React from 'react';
import { useExpenses } from '../contexts/ExpenseContext';
import { BarChart3, PieChart, TrendingUp, Calendar } from 'lucide-react';

const Analytics = () => {
  const { expenses, getExpensesByCategory, getTotalExpenses } = useExpenses();

  const totalExpenses = getTotalExpenses();
  const categoryData = getExpensesByCategory();

  // Calculate monthly trends
  const monthlyData = expenses.reduce((acc, expense) => {
    const month = new Date(expense.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    acc[month] = (acc[month] || 0) + expense.amount;
    return acc;
  }, {});

  const topCategories = Object.entries(categoryData)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <div className="flex items-center space-x-2 text-gray-600">
          <BarChart3 className="h-5 w-5" />
          <span>Expense Insights</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900">${totalExpenses.toFixed(2)}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-gray-900">{Object.keys(categoryData).length}</p>
            </div>
            <div className="bg-purple-500 p-3 rounded-lg">
              <PieChart className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Transactions</p>
              <p className="text-2xl font-bold text-gray-900">{expenses.length}</p>
            </div>
            <div className="bg-emerald-500 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Categories */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Spending Categories</h3>
        <div className="space-y-4">
          {topCategories.map(([category, amount], index) => (
            <div key={category} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <span className="font-medium text-gray-900">{category}</span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">${amount.toFixed(2)}</p>
                <p className="text-sm text-gray-500">
                  {((amount / totalExpenses) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Spending</h3>
        <div className="space-y-3">
          {Object.entries(monthlyData).map(([month, amount]) => (
            <div key={month} className="flex items-center justify-between">
              <span className="font-medium text-gray-700">{month}</span>
              <span className="font-semibold text-gray-900">${amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;