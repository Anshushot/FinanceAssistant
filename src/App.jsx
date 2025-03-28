import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Goals from './components/Goals';
import Reminders from './components/Reminders';
import Auth from './components/Auth';
import ProtectedRoute from './components/ProtectedRoute';
import ProfileMenu from './components/ProfileMenu';
import ChatInterface from './components/ChatInterface';

const API_URL = 'http://localhost:5000';

const App = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    // Check if the API is running
    const checkApiStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/`);
        if (response.ok) {
          setApiStatus('running');
        } else {
          setApiStatus('error');
        }
      } catch (error) {
        console.error('API Status Check Error:', error);
        setApiStatus('error');
      }
    };

    checkApiStatus();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsChatOpen(true);
    setMessages(prev => [...prev, { type: 'user', content: searchQuery }]);
    setIsLoading(true);

    try {
      console.log('Sending request to backend:', searchQuery);  // Debug log
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: searchQuery }),
      });

      console.log('Backend response status:', response.status);  // Debug log
      const data = await response.json();
      console.log('Backend response data:', data);  // Debug log

      if (response.ok && data.reply) {
        setMessages(prev => [...prev, { type: 'bot', content: data.reply }]);
      } else {
        const errorMessage = data.error || 'Failed to get response from AI';
        console.error('API Error:', errorMessage);  // Debug log
        setMessages(prev => [...prev, { 
          type: 'bot', 
          content: `Error: ${errorMessage}. Please try again.` 
        }]);
      }
    } catch (error) {
      console.error('Network Error:', error);  // Debug log
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: `Network error: ${error.message}. Please check if the backend server is running.` 
      }]);
    } finally {
      setIsLoading(false);
      setSearchQuery('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleSendMessage = async (message) => {
    setMessages(prev => [...prev, { type: 'user', content: message }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { type: 'bot', content: data.reply }]);
      } else {
        console.error('API Error:', data.error);
        setMessages(prev => [...prev, { 
          type: 'bot', 
          content: 'Sorry, I encountered an error. Please try again.' 
        }]);
      }
    } catch (error) {
      console.error('Network Error:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'Sorry, I cannot connect to the server. Please check if the backend is running.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {isAuthenticated && (
          <nav className="bg-blue-600 shadow-md">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center h-16">
                <h1 className="text-2xl font-extrabold text-white">💸 AI Finance Assistant</h1>
                <div className="flex items-center space-x-6">
                  <Link to="/home" className="text-white hover:text-blue-100 font-medium transition">
                    Home
                  </Link>
                  <Link to="/dashboard" className="text-white hover:text-blue-100 font-medium transition">
                    Dashboard
                  </Link>
                  <Link to="/goals" className="text-white hover:text-blue-100 font-medium transition">
                    Goals
                  </Link>
                  <Link to="/reminders" className="text-white hover:text-blue-100 font-medium transition">
                    Reminders
                  </Link>
                  <ProfileMenu />
                </div>
              </div>
            </div>
          </nav>
        )}

        {/* Search Bar Section */}
        <div className="bg-white shadow-md py-4 border-b border-blue-100">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask any finance related question..."
                  className="w-full px-6 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-lg"
                />
                <button 
                  onClick={handleSearch}
                  disabled={isLoading || !searchQuery.trim()}
                  className="absolute right-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>🔍</span>
                  <span>{isLoading ? 'Searching...' : 'Search'}</span>
                </button>
              </div>
              <p className="text-sm text-blue-500 mt-2 text-center">
                Get instant answers to your financial questions from our AI assistant
              </p>
            </div>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/home" replace /> : <Auth />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/goals"
              element={
                <ProtectedRoute>
                  <Goals />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reminders"
              element={
                <ProtectedRoute>
                  <Reminders />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        
        {isAuthenticated && (
          <footer className="bg-white border-t border-blue-100 mt-8">
            <div className="container mx-auto px-4 py-4">
              <p className="text-center text-blue-700 text-sm">
                © {new Date().getFullYear()} AI Finance Assistant. All rights reserved.
              </p>
            </div>
          </footer>
        )}

        <ChatInterface
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />

        {apiStatus === 'error' && (
          <div className="fixed bottom-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
            Backend server is not running. Please start the server at http://localhost:5000
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
