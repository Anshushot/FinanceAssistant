import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Mock data for quick stats
  const quickStats = {
    monthlySavings: 700.00,
    upcomingBills: 3,
    totalInvestments: 15000.00,
    creditScore: 750,
  };

  // Mock data for AI insights
  const aiInsights = [
    {
      title: 'Spending Pattern Analysis',
      description: 'Your entertainment expenses have increased by 25% this month. Consider reviewing your subscription services.',
      type: 'warning'
    },
    {
      title: 'Savings Opportunity',
      description: 'You could save ₹200 monthly by optimizing your utility bills. Click to see recommendations.',
      type: 'success'
    },
    {
      title: 'Investment Update',
      description: 'Your portfolio has grown by 8% this quarter. Consider rebalancing your investments.',
      type: 'info'
    }
  ];

  // Mock data for quick actions
  const quickActions = [
    { title: 'Add Transaction', icon: '💰', link: '/dashboard' },
    { title: 'Set New Goal', icon: '🎯', link: '/goals' },
    { title: 'Schedule Bill', icon: '📅', link: '/reminders' },
    { title: 'View Reports', icon: '📊', link: '/dashboard' },
  ];

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl">
        <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
          Welcome to Your AI Finance Assistant
        </h1>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Smart financial management made simple with AI-powered insights
        </p>
        <Link
          to="/dashboard"
          className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 inline-block shadow-lg"
        >
          Get Started
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-3xl mb-4 text-white">💰</div>
          <h3 className="text-blue-100 text-sm font-medium mb-2">Monthly Savings</h3>
          <p className="text-3xl font-bold text-white">₹{quickStats.monthlySavings.toFixed(2)}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-3xl mb-4 text-white">📅</div>
          <h3 className="text-blue-100 text-sm font-medium mb-2">Upcoming Bills</h3>
          <p className="text-3xl font-bold text-white">{quickStats.upcomingBills}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-3xl mb-4 text-white">📈</div>
          <h3 className="text-blue-100 text-sm font-medium mb-2">Total Investments</h3>
          <p className="text-3xl font-bold text-white">₹{quickStats.totalInvestments.toFixed(2)}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-3xl mb-4 text-white">🎯</div>
          <h3 className="text-blue-100 text-sm font-medium mb-2">Credit Score</h3>
          <p className="text-3xl font-bold text-white">{quickStats.creditScore}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-8 text-blue-900">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer shadow-md"
            >
              <span className="text-4xl mb-4 text-white">{action.icon}</span>
              <span className="text-white font-medium text-center">{action.title}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-8 text-blue-900">AI Insights</h2>
        <div className="space-y-6">
          {aiInsights.map((insight, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              <h3 className="font-semibold text-lg mb-3">{insight.title}</h3>
              <p className="text-blue-100 leading-relaxed">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-8 text-blue-900 text-center">Why Choose Our AI Finance Assistant?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-4xl mb-6 text-white">🤖</div>
            <h3 className="font-semibold text-xl text-white mb-4">AI-Powered Insights</h3>
            <p className="text-blue-100 leading-relaxed">Get personalized financial recommendations based on your spending patterns</p>
          </div>
          <div className="text-center p-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-4xl mb-6 text-white">📊</div>
            <h3 className="font-semibold text-xl text-white mb-4">Smart Analytics</h3>
            <p className="text-blue-100 leading-relaxed">Track your progress with detailed financial reports and visualizations</p>
          </div>
          <div className="text-center p-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-4xl mb-6 text-white">🎯</div>
            <h3 className="font-semibold text-xl text-white mb-4">Goal Tracking</h3>
            <p className="text-blue-100 leading-relaxed">Set and monitor your financial goals with AI-powered progress tracking</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
