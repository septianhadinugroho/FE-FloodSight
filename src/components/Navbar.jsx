import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg px-3 sm:px-4 py-3">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">FloodSight</Link>

          {/* Hamburger */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded">Dashboard</Link>
            <Link to="/map" className="hover:bg-blue-700 px-3 py-2 rounded">Map</Link>
            <Link to="/profile" className="hover:bg-blue-700 px-3 py-2 rounded">Profile</Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="hover:bg-blue-700 px-3 py-2 rounded"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="hover:bg-blue-700 px-3 py-2 rounded">Login</Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation - Side Menu */}
        <div className={`fixed inset-0 z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Side Menu Content */}
          <div className="absolute right-0 top-0 h-full w-64 bg-blue-600 shadow-xl">
            <div className="flex flex-col h-full p-4">
              <button 
                className="self-end mb-4 focus:outline-none"
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex flex-col space-y-4">
                <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded" onClick={() => setIsOpen(false)}>Dashboard</Link>
                <Link to="/map" className="hover:bg-blue-700 px-3 py-2 rounded" onClick={() => setIsOpen(false)}>Map</Link>
                <Link to="/profile" className="hover:bg-blue-700 px-3 py-2 rounded" onClick={() => setIsOpen(false)}>Profile</Link>
                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="text-left hover:bg-blue-700 px-3 py-2 rounded"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="hover:bg-blue-700 px-3 py-2 rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}