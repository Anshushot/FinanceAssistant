import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Get user profile from localStorage
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      try {
        const parsedProfile = JSON.parse(profile);
        console.log('Loaded profile:', parsedProfile); // Debug log
        setUserProfile(parsedProfile);
      } catch (error) {
        console.error('Error parsing profile:', error);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userProfile');
    navigate('/');
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none focus:ring-0 focus:ring-offset-0 p-0"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-blue-500 hover:bg-blue-600 transition-colors">
          {userProfile?.picture ? (
            <img
              src={userProfile.picture}
              alt={userProfile.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error('Error loading profile picture:', e);
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMCAzYzEuNjYgMCAzIDEuMzQgMyAzcy0xLjM0IDMtMyAzLTMtMS4zNC0zLTMgMS4zNC0zIDMtM3ptMCAxNC4yYy0yIDAtMy44MS0xLjAyLTQtMi40MiAwLTEuMzkgMi0yLjU4IDQtMi41OHM0IDEuMTkgNCAyLjU4Yy0uMTkgMS40LTIgMi40Mi00IDIuNDJ6IiBmaWxsPSIjRkZGRkZGIi8+PC9zdmc+';
              }}
            />
          ) : (
            <span className="text-white font-semibold text-lg">👤</span>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-1 z-50 border border-blue-100">
          {userProfile && (
            <div className="px-4 py-2 border-b border-blue-100">
              <p className="text-sm font-semibold text-blue-900 truncate">{userProfile.name}</p>
              <p className="text-xs text-blue-600 truncate" title={userProfile.email}>{userProfile.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 transition duration-150"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu; 