import React from 'react';
import { useExpenses } from '../contexts/ExpenseContext';
import { DollarSign, TrendingUp, Calendar, AlertTriangle } from 'lucide-react';

const ExpenseStats = () => {
  const { expenses, getTotalExpenses, getExpensesByCategory, getDuplicateExpenses } = useExpenses();

  const totalExpenses = getTotalExpenses();
  const categoryData = getExpensesByCategory();
  const duplicateExpenses = getDuplicateExpenses();
  
  // Calculate this month's expenses
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  });
  const thisMonthTotal = thisMonthExpenses.reduce((total, expense) => total + expense.amount, 0);

  // Get top category
  const topCategory = Object.entries(categoryData).reduce((a, b) => 
    categoryData[a[0]] > categoryData[b[0]] ? a : b, ['', 0]
  );

  const stats = [
    {
      label: 'Total Expenses',
      value: `$${totalExpenses.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-blue-500',
      change: null
    },
    {
      label: 'This Month',
      value: `$${thisMonthTotal.toFixed(2)}`,
      icon: Calendar,
      color: 'bg-emerald-500',
      change: null
    },
    {
      label: 'Top Category',
      value: topCategory[0] || 'None',
      subValue: topCategory[1] ? `$${topCategory[1].toFixed(2)}` : '$0.00',
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: null
    },
    {
      label: 'Potential Duplicates',
      value: duplicateExpenses.length.toString(),
      subValue: duplicateExpenses.length > 0 ? 'Review needed' : 'All clear',
      icon: AlertTriangle,
      color: duplicateExpenses.length > 0 ? 'bg-amber-500' : 'bg-emerald-500',
      change: null
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              {stat.subValue && (
                <p className="text-sm text-gray-500 mt-1">{stat.subValue}</p>
              )}
            </div>
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseStats;