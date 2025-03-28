import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Here you would typically make an API call to your backend
    // For now, we'll just simulate a successful login
    if (isLogin) {
      // Simulate login
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/home');
    } else {
      // Simulate signup
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/home');
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log('Google Sign-in Success:', credentialResponse);
    // Decode the JWT token to get user info
    const decodedToken = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
    console.log('Decoded token:', decodedToken);
    
    // Store user info in localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userProfile', JSON.stringify({
      name: decodedToken.name,
      email: decodedToken.email,
      picture: decodedToken.picture
    }));
    
    navigate('/home');
  };

  const handleGoogleError = () => {
    console.error('Google Sign-in Error');
    setError('Google sign in failed. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId="550175186128-26te6j4cfubsomfqj41ulg5r1dpdkt0d.apps.googleusercontent.com">
      {/* Replace YOUR_GOOGLE_CLIENT_ID with the actual Client ID from Google Cloud Console */}
      {/* To get your Client ID:
          1. Go to https://console.cloud.google.com/
          2. Create a new project or select existing one
          3. Enable Google+ API
          4. Go to Credentials
          5. Create OAuth 2.0 Client ID
          6. Add http://localhost:5173 to authorized origins
          7. Copy the Client ID and replace it here */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-blue-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">💸 AI Finance Assistant</h1>
            <p className="text-blue-600 font-medium">
              {isLogin ? 'Welcome back! Please login to your account.' : 'Create your account to get started.'}
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6">
              <p className="font-medium">{error}</p>
            </div>
          )}

          <div className="mb-6">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
              theme="outline"
              size="large"
              width="100%"
              text={isLogin ? "continue_with" : "signup_with"}
              shape="rectangular"
              logo_alignment="center"
            />
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-blue-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-blue-600">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-blue-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter your password"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-blue-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Confirm your password"
                  required={!isLogin}
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold text-lg shadow-md hover:shadow-lg"
            >
              {isLogin ? 'Login to Account' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-800 font-medium transition duration-300"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : 'Already have an account? Login'}
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-blue-600">
            <p>By {isLogin ? 'logging in' : 'creating an account'}, you agree to our</p>
            <p className="mt-1">
              <a href="#" className="text-blue-600 hover:text-blue-800 underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800 underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Auth; 