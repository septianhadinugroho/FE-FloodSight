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
机关
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
    login(userData, token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('profileData');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}