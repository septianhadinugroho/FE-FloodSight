import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../assets/LogoFloodSight-Remove.png';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      // Clear local storage and call logout
      localStorage.removeItem('token');
      localStorage.removeItem('profileData');
      logout(); // Clear user state in AuthContext
      toast.success('Berhasil logout!', {
        duration: 3000,
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Gagal logout. Silakan coba lagi.');
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg px-4 sm:px-6 py-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center">
            <img
              src={Logo}
              alt="FloodSight Logo"
              className="h-8 w-8 object-contain transition-transform duration-300 hover:scale-105"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <span className="text-xl font-semibold tracking-tight">FloodSight</span>
          </Link>
        </div>

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
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-base font-medium hover:bg-blue-700 px-3 py-2 rounded-md transition-colors duration-200">
            Dashboard
          </Link>
          <Link to="/map" className="text-base font-medium hover:bg-blue-700 px-3 py-2 rounded-md transition-colors duration-200">
            Map
          </Link>
          <Link to="/profile" className="text-base font-medium hover:bg-blue-700 px-3 py-2 rounded-md transition-colors duration-200">
            Profile
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="text-base font-medium hover:bg-blue-700 px-3 py-2 rounded-md transition-colors duration-200"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-base font-medium hover:bg-blue-700 px-3 py-2 rounded-md transition-colors duration-200">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation - Side Menu */}
      <div className={`fixed inset-0 z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        ></div>

        <div className="absolute right-0 top-0 h-full w-64 bg-blue-600 shadow-xl">
          <div className="flex flex-col h-full p-6">
            <button
              className="self-end mb-6 focus:outline-none"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-base font-medium hover:bg-blue-700 px-4 py-2 rounded-md transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/map"
                className="text-base font-medium hover:bg-blue-700 px-4 py-2 rounded-md transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Map
              </Link>
              <Link
                to="/profile"
                className="text-base font-medium hover:bg-blue-700 px-4 py-2 rounded-md transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-left text-base font-medium hover:bg-blue-700 px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-base font-medium hover:bg-blue-700 px-4 py-2 rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}