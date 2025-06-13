import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { jwtDecode } from 'jwt-decode'; // Use named import

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem('profileData');
      const token = localStorage.getItem('token');

      if (storedUser && token) {
        try {
          const decoded = jwtDecode(token); // Use named import
          const isExpired = decoded.exp * 1000 < Date.now();

          if (isExpired) {
            console.log('Token expired');
            localStorage.removeItem('profileData');
            localStorage.removeItem('token');
            setUser(null);
            setLoading(false);
            navigate('/login');
            return;
          }

          const response = await api.get(`/users/${decoded.userId}`);
          setUser(response.data);
        } catch (error) {
          console.error('Token validation failed:', error);
          localStorage.removeItem('profileData');
          localStorage.removeItem('token');
          setUser(null);
          navigate('/login');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [navigate]);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('profileData', JSON.stringify(userData));
    localStorage.setItem('token', token);
    navigate('/profile');
  };

  const register = (userData, token) => {
  console.log('Register data:', userData);
  setUser(userData);
  localStorage.setItem('profileData', JSON.stringify(userData));
  localStorage.setItem('token', token);
  navigate('/'); // Redirect ke dashboard setelah registrasi
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem('profileData');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f0f2f5',
          }}
        >
          <svg
            width="100"
            height="100"
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
            style={{ animation: 'spin 1s linear infinite' }}
          >
            <circle
              cx="25"
              cy="25"
              r="20"
              stroke="#007bff"
              strokeWidth="4"
              fill="none"
              strokeDasharray="31.4"
              strokeDashoffset="0"
            >
              <animate
                attributeName="strokeDashoffset"
                values="0;31.4"
                dur="1.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="1;0.3"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
          <style>
            {`
              @keyframes spin {
                100% {
                  transform: rotate(360deg);
                }
              }
            `}
          </style>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}