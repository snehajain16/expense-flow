import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ExpenseProvider } from './contexts/ExpenseContext';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Analytics from './components/Analytics';
import { ToastProvider, useToast } from './components/Toaster';
import Settings from './components/Settings';
import Profile from './components/Profile';

function AppContent() {
  const [currentView, setCurrentView] = useState('landing');
  const { user } = useAuth();
  const { addToast } = useToast();

  // Show landing page if not authenticated
  if (!user && currentView === 'landing') {
    return <LandingPage onGetStarted={() => setCurrentView('auth')} />;
  }

  // Show auth form if not authenticated and not on landing
  if (!user && currentView === 'auth') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <AuthForm onBackToLanding={() => setCurrentView('landing')} />
      </div>
    );
  }

  // Redirect to dashboard if authenticated but on landing/auth
  if (user && (currentView === 'landing' || currentView === 'auth')) {
    setCurrentView('dashboard');
  }

  // Show auth form if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <AuthForm onBackToLanding={() => setCurrentView('landing')} />
      </div>
    );
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'expenses':
        return <ExpenseList onNavigate={setCurrentView} />;
      case 'add-expense':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Expense</h1>
              <ExpenseForm 
                onSuccess={() => {
                  setCurrentView('expenses');
                  addToast('Expense added successfully!', 'success');
                }} 
                onCancel={() => setCurrentView('expenses')}
              />
            </div>
          </div>
        );
      case 'analytics':
        return <Analytics onNavigate={setCurrentView} />;
      case 'settings':
        return <Settings onNavigate={setCurrentView} />;
      case 'profile':
        return <Profile onNavigate={setCurrentView} />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header currentView={currentView} onNavigate={setCurrentView} />
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