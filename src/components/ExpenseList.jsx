import React, { useState } from 'react';
import { useExpenses } from '../contexts/ExpenseContext';
import ExpenseCard from './ExpenseCard';
import { Search, Filter, Calendar, DollarSign } from 'lucide-react';

const ExpenseList = ({ limit }) => {
  const { expenses, categories } = useExpenses();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Filter and sort expenses
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || expense.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'amount':
        aValue = a.amount;
        bValue = b.amount;
        break;
      case 'title':
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      case 'category':
        aValue = a.category;
        bValue = b.category;
        break;
      default: // date
        aValue = new Date(a.date);
        bValue = new Date(b.date);
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const displayExpenses = limit ? sortedExpenses.slice(0, limit) : sortedExpenses;

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <DollarSign className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses yet</h3>
        <p className="text-gray-600">
          Start tracking your expenses by adding your first expense above.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters - Only show if not limited */}
      {!limit && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
              <option value="title">Sort by Title</option>
              <option value="category">Sort by Category</option>
            </select>

            {/* Sort Order */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>
      )}

      {/* Expenses */}
      <div className="space-y-4">
        {displayExpenses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No matching expenses</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters.
            </p>
          </div>
        ) : (
          displayExpenses.map(expense => (
            <ExpenseCard key={expense.id} expense={expense} />
          ))
        )}
      </div>

      {/* Show more link for limited view */}
      {limit && sortedExpenses.length > limit && (
        <div className="text-center">
          <p className="text-gray-600">
            Showing {limit} of {sortedExpenses.length} expenses
          </p>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;