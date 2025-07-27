import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useExpenses } from '../contexts/ExpenseContext';
import { 
  User, 
  Mail, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Award,
  Target,
  Clock,
  Edit3,
  Camera,
  CheckCircle
} from 'lucide-react';

const Profile = ({ onNavigate }) => {
  const { user } = useAuth();
  const { expenses, getTotalExpenses, getExpensesByCategory } = useExpenses();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Passionate about financial wellness and smart spending.',
    location: 'San Francisco, CA',
    joinDate: 'January 2024'
  });

  const totalExpenses = getTotalExpenses();
  const categoryData = getExpensesByCategory();
  const topCategory = Object.entries(categoryData).reduce((a, b) => 
    categoryData[a[0]] > categoryData[b[0]] ? a : b, ['', 0]
  );

  // Calculate some stats
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const thisMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === thisMonth && expenseDate.getFullYear() === thisYear;
  });
  const monthlyAverage = thisMonthExpenses.reduce((total, expense) => total + expense.amount, 0);

  const achievements = [
    {
      title: 'First Expense',
      description: 'Added your first expense to ExpenseFlow',
      icon: Target,
      earned: true,
      date: 'Jan 15, 2024'
    },
    {
      title: 'Expense Tracker',
      description: 'Tracked 50+ expenses',
      icon: TrendingUp,
      earned: expenses.length >= 3, // Using 3 for demo since we have mock data
      date: expenses.length >= 3 ? 'Feb 1, 2024' : null
    },
    {
      title: 'Category Master',
      description: 'Used 5+ different expense categories',
      icon: Award,
      earned: Object.keys(categoryData).length >= 3,
      date: Object.keys(categoryData).length >= 3 ? 'Feb 10, 2024' : null
    },
    {
      title: 'Consistent Tracker',
      description: 'Added expenses for 30 consecutive days',
      icon: Clock,
      earned: false,
      date: null
    }
  ];

  const handleSaveProfile = () => {
    // Simulate API call
    setTimeout(() => {
      setIsEditing(false);
      // In a real app, you'd update the user context here
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32"></div>
        <div className="px-8 pb-8">
          <div className="flex items-end -mt-16 mb-6">
            <div className="relative">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <User className="h-16 w-16 text-gray-400" />
              </div>
              <button className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="ml-6 flex-1">
              <div className="flex items-center justify-between">
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="text-2xl font-bold text-gray-900 border-b-2 border-blue-600 bg-transparent focus:outline-none"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
                  )}
                  <div className="flex items-center text-gray-600 mt-1">
                    <Mail className="h-4 w-4 mr-2" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-600"
                      />
                    ) : (
                      <span>{profileData.email}</span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-3">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSaveProfile}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                {isEditing ? (
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    className="w-full text-gray-600 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-600"
                    rows={2}
                  />
                ) : (
                  <p className="text-gray-600">{profileData.bio}</p>
                )}
              </div>

              <div className="flex items-center space-x-6 mt-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Joined {profileData.joinDate}
                </div>
                <div>📍 {profileData.location}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900">${totalExpenses.toFixed(2)}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">${monthlyAverage.toFixed(2)}</p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Top Category</p>
              <p className="text-2xl font-bold text-gray-900">{topCategory[0] || 'None'}</p>
              <p className="text-sm text-gray-500">${topCategory[1]?.toFixed(2) || '0.00'}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg border-2 transition-all ${
                achievement.earned
                  ? 'border-emerald-200 bg-emerald-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                  achievement.earned
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  <achievement.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${
                    achievement.earned ? 'text-emerald-900' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-sm mt-1 ${
                    achievement.earned ? 'text-emerald-700' : 'text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>
                  {achievement.earned && achievement.date && (
                    <p className="text-xs text-emerald-600 mt-2">
                      Earned on {achievement.date}
                    </p>
                  )}
                </div>
                {achievement.earned && (
                  <div className="text-emerald-600">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {expenses.slice(0, 5).map((expense, index) => (
            <div key={expense.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{expense.title}</p>
                  <p className="text-sm text-gray-500">{expense.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">${expense.amount.toFixed(2)}</p>
                <p className="text-sm text-gray-500">
                  {new Date(expense.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;