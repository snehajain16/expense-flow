import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (email && password.length >= 6) {
      const mockUser = {
        id: '1',
        email: email,
        name: email.split('@')[0]
      };
      setUser(mockUser);
      localStorage.setItem('expenseflow_user', JSON.stringify(mockUser));
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  };

  const signup = async (email, password, name) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password.length >= 6 && name) {
      const mockUser = {
        id: Date.now().toString(),
        email: email,
        name: name
      };
      setUser(mockUser);
      localStorage.setItem('expenseflow_user', JSON.stringify(mockUser));
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('expenseflow_user');
  };

  // Check for existing user on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('expenseflow_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};