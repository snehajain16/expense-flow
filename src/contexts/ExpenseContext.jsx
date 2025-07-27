import React, { createContext, useContext, useState, useEffect } from 'react';

const ExpenseContext = createContext();

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};

const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Travel',
  'Education',
  'Business',
  'Other'
];

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load expenses from localStorage
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenseflow_expenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    } else {
      // Add some mock data
      const mockExpenses = [
        {
          id: '1',
          title: 'Coffee at Starbucks',
          amount: 4.50,
          category: 'Food & Dining',
          date: new Date().toISOString().split('T')[0],
          receipt: null,
          isDuplicate: false,
          description: 'Morning coffee'
        },
        {
          id: '2',
          title: 'Uber Ride',
          amount: 12.30,
          category: 'Transportation',
          date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
          receipt: null,
          isDuplicate: false,
          description: 'Ride to office'
        },
        {
          id: '3',
          title: 'Grocery Shopping',
          amount: 85.20,
          category: 'Food & Dining',
          date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
          receipt: null,
          isDuplicate: false,
          description: 'Weekly groceries'
        }
      ];
      setExpenses(mockExpenses);
      localStorage.setItem('expenseflow_expenses', JSON.stringify(mockExpenses));
    }
  }, []);

  const saveExpenses = (newExpenses) => {
    localStorage.setItem('expenseflow_expenses', JSON.stringify(newExpenses));
    setExpenses(newExpenses);
  };

  const addExpense = async (expenseData) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const newExpense = {
      id: Date.now().toString(),
      ...expenseData,
      date: expenseData.date || new Date().toISOString().split('T')[0],
      isDuplicate: false
    };

    // Check for potential duplicates
    const duplicates = expenses.filter(expense => 
      Math.abs(expense.amount - newExpense.amount) < 0.01 &&
      expense.category === newExpense.category &&
      Math.abs(new Date(expense.date) - new Date(newExpense.date)) < 86400000 * 3
    );

    if (duplicates.length > 0) {
      duplicates.forEach(duplicate => {
        duplicate.isDuplicate = true;
      });
      newExpense.isDuplicate = true;
    }

    const updatedExpenses = [...expenses, newExpense];
    saveExpenses(updatedExpenses);
    setLoading(false);
    return newExpense;
  };

  const updateExpense = async (id, updates) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const updatedExpenses = expenses.map(expense =>
      expense.id === id ? { ...expense, ...updates } : expense
    );
    saveExpenses(updatedExpenses);
    setLoading(false);
  };

  const deleteExpense = async (id) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    saveExpenses(updatedExpenses);
    setLoading(false);
  };

  const markAsNotDuplicate = (id) => {
    const updatedExpenses = expenses.map(expense =>
      expense.id === id ? { ...expense, isDuplicate: false } : expense
    );
    saveExpenses(updatedExpenses);
  };

  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const getExpensesByCategory = () => {
    const categoryTotals = {};
    expenses.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });
    return categoryTotals;
  };

  const getDuplicateExpenses = () => {
    return expenses.filter(expense => expense.isDuplicate);
  };

  const value = {
    expenses,
    loading,
    addExpense,
    updateExpense,
    deleteExpense,
    markAsNotDuplicate,
    getTotalExpenses,
    getExpensesByCategory,
    getDuplicateExpenses,
    categories: CATEGORIES
  };

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
};