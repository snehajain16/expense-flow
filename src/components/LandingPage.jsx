import React from 'react';
import { 
  DollarSign, 
  Shield, 
  BarChart3, 
  Camera, 
  Zap, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Star,
  TrendingUp,
  PieChart,
  Receipt,
  Smartphone,
  Globe,
  Lock
} from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {
  const features = [
    {
      icon: Camera,
      title: 'Receipt Scanning',
      description: 'Snap photos of receipts and automatically extract expense data with AI-powered recognition.'
    },
    {
      icon: BarChart3,
      title: 'Smart Analytics',
      description: 'Get detailed insights into your spending patterns with interactive charts and reports.'
    },
    {
      icon: Shield,
      title: 'Duplicate Detection',
      description: 'Automatically identify and flag potential duplicate transactions to keep your records clean.'
    },
    {
      icon: Zap,
      title: 'Real-time Sync',
      description: 'Access your expenses across all devices with instant synchronization and offline support.'
    },
    {
      icon: PieChart,
      title: 'Category Management',
      description: 'Organize expenses with smart categorization and custom tags for better organization.'
    },
    {
      icon: Lock,
      title: 'Bank-level Security',
      description: 'Your financial data is protected with enterprise-grade encryption and security measures.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Small Business Owner',
      content: 'ExpenseFlow has revolutionized how I track business expenses. The receipt scanning feature alone saves me hours every week.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Freelance Designer',
      content: 'The duplicate detection feature caught several double-entries I would have missed. It\'s like having a personal accountant.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Manager',
      content: 'Beautiful interface and powerful analytics. I can finally understand where my money goes each month.',
      rating: 5
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Users' },
    { number: '$2M+', label: 'Expenses Tracked' },
    { number: '99.9%', label: 'Uptime' },
    { number: '4.9★', label: 'User Rating' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">ExpenseFlow</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium">Features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 font-medium">Reviews</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium">Pricing</a>
              <button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Track Expenses
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Effortlessly</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The most intuitive expense tracker with AI-powered receipt scanning, smart duplicate detection, 
              and beautiful analytics to help you take control of your finances.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-gray-400 transition-all">
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to manage expenses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to simplify expense tracking and give you complete control over your finances.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How ExpenseFlow Works</h2>
            <p className="text-xl text-gray-600">Get started in minutes with our simple 3-step process</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Capture Receipts</h3>
              <p className="text-gray-600">
                Simply snap a photo of your receipt or manually enter expense details. Our AI extracts all the important information automatically.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Categorization</h3>
              <p className="text-gray-600">
                Expenses are automatically categorized and checked for duplicates. Review and approve with just a few taps.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Analyze & Optimize</h3>
              <p className="text-gray-600">
                Get detailed insights into your spending patterns with beautiful charts and reports to make better financial decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Loved by thousands of users</h2>
            <p className="text-xl text-gray-600">See what our customers have to say about ExpenseFlow</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to take control of your expenses?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have simplified their expense tracking with ExpenseFlow. 
            Start your free trial today.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all inline-flex items-center"
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold">ExpenseFlow</span>
              </div>
              <p className="text-gray-400">
                The most intuitive expense tracker for individuals and businesses.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ExpenseFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;