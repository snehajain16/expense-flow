import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ExpenseProvider } from './contexts/ExpenseContext';
import Header from './components/Header';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Analytics from './components/Analytics';
import { ToastProvider } from './components/Toaster';

function AppContent() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'expenses' | 'add-expense' | 'analytics'>('dashboard');
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <AuthForm />
      </div>
    );
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'expenses':
        return <ExpenseList />;
      case 'add-expense':
        return <ExpenseForm onBack={() => setCurrentView('expenses')} />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          {renderCurrentView()}
        </main>
      </div>
    </ExpenseProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;