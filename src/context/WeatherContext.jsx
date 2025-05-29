import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [failedAreas, setFailedAreas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async (retries = 2, delay = 1000) => {
    // Check sessionStorage
    const cached = sessionStorage.getItem('weatherData');
    const cachedTime = sessionStorage.getItem('weatherDataTime');
    const now = Date.now();
    if (cached && cachedTime && now - cachedTime < 10 * 60 * 1000) { // 10-minute cache
      setWeatherData(JSON.parse(cached));
      setFailedAreas(JSON.parse(sessionStorage.getItem('failedAreas') || '[]'));
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://be-flood-sight.vercel.app/api/weather', {
        timeout: 60000,
      });
      const { data, failed, error } = response.data;
      setWeatherData(data);
      setFailedAreas(failed);
      sessionStorage.setItem('weatherData', JSON.stringify(data));
      sessionStorage.setItem('failedAreas', JSON.stringify(failed));
      sessionStorage.setItem('weatherDataTime', now);
      if (error) setError(error);
    } catch (err) {
      console.error('Error fetching weather:', err.message);
      if (retries > 0 && err.code === 'ECONNABORTED') {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchWeather(retries - 1, delay * 2);
      }
      setError('Gagal memuat data cuaca.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <WeatherContext.Provider value={{ weatherData, failedAreas, error, loading, fetchWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);