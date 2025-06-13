import { useState } from 'react';
import { Link } from 'react-router-dom';
import jakartaHero from '../assets/banjir.png';
import { jabodetabekAreas } from '../data/jabodetabekAreas';
import { useWeather } from '../context/WeatherContext';

export default function Dashboard() {
  const { weatherData, failedAreas, error, loading } = useWeather();
  const [selectedArea, setSelectedArea] = useState(null); // For modal
  const [weatherFilter, setWeatherFilter] = useState('all'); // For weather filter
  const [expandedWarning, setExpandedWarning] = useState(null); // For accordion
  const [isAboutVisible, setIsAboutVisible] = useState(false); // For About animation

  // Dynamic rain warnings count
  const rainWarningsCount = weatherData
    ? Object.values(weatherData).filter((data) =>
        data?.data?.[0]?.cuaca?.[0]?.some((cuaca) =>
          cuaca.weather_desc?.includes('Hujan')
        )
      ).length
    : 0;

  // Filter weather data
  const filteredAreas = jabodetabekAreas.filter((area) => {
    if (weatherFilter === 'all') return true;
    const forecast = weatherData?.[area.name]?.data?.[0]?.cuaca?.[0]?.[0];
    return forecast?.weather_desc?.toLowerCase().includes(weatherFilter);
  });

  // Format date
  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleString('id-ID', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Jakarta',
      });
    } catch {
      return 'Tidak tersedia';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative h-48 sm:h-64 md:h-80 lg:h-[500px] overflow-hidden -mb-4 sm:-mb-6">
        <img
          src={jakartaHero}
          alt="Banjir Jabodetabek"
          className="w-full h-full object-cover rounded-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-blue-600/30 flex items-center justify-center rounded-2xl">
          <div className="text-center px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              FloodSight
            </h1>
            <p className="text-blue-100 mt-3 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Prediksi banjir akurat untuk JABODETABEK.
            </p>
            <Link
              to="/map"
              className="mt-4 inline-block bg-white text-blue-700 px-6 py-2 sm:px-8 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-blue-50 transition transform hover:scale-105"
            >
              Jelajahi Prediksi
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-8">
        {/* Statistik Cepat */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-white p-3 sm:p-5 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 flex items-center text-gray-800">
              <span className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 rounded-full mr-2 sm:mr-3"></span>
              Peringatan Hujan JABODETABEK
            </h3>
            <p className="text-4xl sm:text-5xl font-bold text-yellow-500">{rainWarningsCount}</p>
            <p className="text-gray-500 mt-1 sm:mt-2 text-xs sm:text-sm">Wilayah berisiko hujan (BMKG)</p>
          </div>
          <div className="bg-white p-3 sm:p-5 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 flex items-center text-gray-800">
              <span className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-400 rounded-full mr-2 sm:mr-3"></span>
              Akurasi Prediksi
            </h3>
            <p className="text-4xl sm:text-5xl font-bold text-blue-500">94%</p>
            <p className="text-gray-500 mt-1 sm:mt-2 text-xs sm:text-sm">Model machine learning</p>
          </div>
        </section>

        {/* Tentang FloodSight */}
        <section className="bg-white p-3 sm:p-5 rounded-2xl shadow-lg">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-800">Tentang FloodSight</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              FloodSight adalah sistem prediksi banjir berbasis web yang memanfaatkan citra satelit dan machine learning untuk memprediksi risiko banjir di JABODETABEK. Dengan antarmuka responsif, FloodSight meningkatkan kesiapsiagaan bencana.
            </p>
            <button
              onClick={() => setIsAboutVisible(!isAboutVisible)}
              className="mt-2 sm:mt-3 text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
            >
              {isAboutVisible ? 'Sembunyikan' : 'Pelajari Lebih Lanjut'}
            </button>
            {isAboutVisible && (
              <p className="mt-1 sm:mt-2 text-gray-600 text-xs sm:text-sm animate-fade-in max-w-2xl mx-auto">
                Menggunakan model CNN dan tabular scikit-learn, FloodSight menyediakan prediksi akurat melalui dashboard interaktif yang mudah digunakan.
              </p>
            )}
          </div>
        </section>

        {/* Perkiraan Cuaca Jabodetabek */}
        <section className="bg-white p-3 sm:p-5 rounded-2xl shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-3">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">Perkiraan Cuaca Jabodetabek</h3>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              <button
                onClick={() => setWeatherFilter('all')}
                className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
                  weatherFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setWeatherFilter('hujan')}
                className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
                  weatherFilter === 'hujan'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Hujan
              </button>
              <button
                onClick={() => setWeatherFilter('cerah')}
                className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
                  weatherFilter === 'cerah'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Cerah
              </button>
            </div>
          </div>
          {loading ? (
            <div className="flex space-x-2 sm:space-x-3 overflow-x-auto pb-3 overscroll-x-contain">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-48 sm:w-64 p-3 sm:p-4 bg-gray-100 rounded-xl animate-pulse">
                  <div className="h-5 sm:h-6 bg-gray-300 rounded w-3/4 mb-2 sm:mb-3"></div>
                  <div className="h-3 sm:h-4 bg-gray-300 rounded w-full mb-1 sm:mb-2"></div>
                  <div className="h-3 sm:h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <p className="text-red-500 text-base sm:text-lg">{error}</p>
          ) : (
            <div className="flex space-x-2 sm:space-x-3 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-blue-200 overscroll-x-contain">
              {filteredAreas.map((area) => {
                const forecast = weatherData?.[area.name]?.data?.[0]?.cuaca?.[0]?.[0];
                return (
                  <div
                    key={area.adm4}
                    className="flex-shrink-0 w-48 sm:w-64 p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md hover:shadow-lg transition"
                  >
                    <h4 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 text-blue-800">{area.name}</h4>
                    {forecast ? (
                      <div className="space-y-0.5 sm:space-y-1">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          {forecast.image && (
                            <img
                              src={forecast.image}
                              alt={forecast.weather_desc || 'Ikon cuaca'}
                              className="w-6 h-6 sm:w-8 sm:h-8"
                              onError={(e) => (e.target.src = 'https://openweathermap.org/img/wn/01d@2x.png')}
                            />
                          )}
                          <p className="text-xs sm:text-sm font-medium text-gray-700">
                            {forecast.weather_desc || 'N/A'}
                          </p>
                        </div>
                        <p className="text-2xs sm:text-xs text-gray-600">
                          <strong>Waktu:</strong> {formatDate(forecast.local_datetime)}
                        </p>
                        <p className="text-2xs sm:text-xs text-gray-600">
                          <strong>Suhu:</strong> {forecast.t ? `${forecast.t}°C` : 'N/A'}
                        </p>
                        <p className="text-2xs sm:text-xs text-gray-600">
                          <strong>Kelembapan:</strong> {forecast.hu ? `${forecast.hu}%` : 'N/A'}
                        </p>
                        <p className="text-2xs sm:text-xs text-gray-600">
                          <strong>Angin:</strong>{' '}
                          {forecast.ws && forecast.wd
                            ? `${forecast.ws} km/j ${forecast.wd}`
                            : 'N/A'}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-xs sm:text-sm">
                        Data tidak tersedia{failedAreas.includes(area.name) ? ' (kode salah)' : ''}.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Peringatan Hujan */}
        <section className="bg-white p-3 sm:p-5 rounded-2xl shadow-lg">
          <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">Peringatan Hujan JABODETABEK</h3>
          {loading ? (
            <div className="space-y-2 sm:space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-3 sm:p-4 bg-gray-100 rounded-lg animate-pulse">
                  <div className="h-4 sm:h-5 bg-gray-300 rounded w-1/2 mb-1 sm:mb-2"></div>
                  <div className="h-3 sm:h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <p className="text-red-500 text-base sm:text-lg">{error}</p>
          ) : weatherData && Object.keys(weatherData).length > 0 ? (
            <div className="space-y-1 sm:space-y-2">
              {Object.keys(weatherData).some((areaName) =>
                Array.isArray(weatherData[areaName]?.data?.[0]?.cuaca?.[0]) &&
                weatherData[areaName].data[0].cuaca[0].some(
                  (cuaca) =>
                    typeof cuaca.weather_desc === 'string' &&
                    cuaca.weather_desc.includes('Hujan')
                )
              ) ? (
                Object.keys(weatherData).map((areaName, index) =>
                  Array.isArray(weatherData[areaName]?.data?.[0]?.cuaca?.[0])
                    ? weatherData[areaName].data[0].cuaca[0]
                        .filter(
                          (cuaca) =>
                            typeof cuaca.weather_desc === 'string' &&
                            cuaca.weather_desc.includes('Hujan')
                        )
                        .map((cuaca, i) => (
                          <div
                            key={`${index}-${i}`}
                            className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                          >
                            <button
                              className="w-full p-3 sm:p-4 text-left flex justify-between items-center"
                              onClick={() =>
                                setExpandedWarning(
                                  expandedWarning === `${index}-${i}` ? null : `${index}-${i}`
                                )
                              }
                            >
                              <div>
                                <h4 className="font-medium text-sm sm:text-base text-gray-800">Hujan di {areaName}</h4>
                                <p className="text-xs sm:text-sm text-gray-600">
                                  {formatDate(cuaca.local_datetime)} • {cuaca.weather_desc}
                                </p>
                              </div>
                              <svg
                                className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transform transition ${
                                  expandedWarning === `${index}-${i}` ? 'rotate-180' : ''
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </button>
                            {expandedWarning === `${index}-${i}` && (
                              <div className="p-3 sm:p-4 bg-white border-t border-gray-200 animate-fade-in">
                                <p className="text-xs sm:text-sm text-gray-600">
                                  <strong>Suhu:</strong> {cuaca.t ? `${cuaca.t}°C` : 'N/A'}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-600">
                                  <strong>Kelembapan:</strong> {cuaca.hu ? `${cuaca.hu}%` : 'N/A'}
                                </p>
                                <button
                                  onClick={() => setSelectedArea({ name: areaName, forecast: cuaca })}
                                  className="mt-1 sm:mt-2 text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium"
                                >
                                  Lihat Detail »
                                </button>
                              </div>
                            )}
                          </div>
                        ))
                    : null
                )
              ) : (
                <div className="p-4 sm:p-6 bg-blue-50 rounded-lg flex items-center space-x-3 sm:space-x-4">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm sm:text-base text-gray-800 font-medium">
                      Tidak ada peringatan hujan saat ini
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Cuaca di JABODETABEK saat ini terdeteksi aman dari risiko hujan lebat. Tetap pantau untuk pembaruan.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 sm:p-6 bg-blue-50 rounded-lg flex items-center space-x-3 sm:space-x-4">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="text-sm sm:text-base text-gray-800 font-medium">
                  Tidak ada peringatan hujan saat ini
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Cuaca di JABODETABEK saat ini terdeteksi aman dari risiko hujan lebat. Tetap pantau untuk pembaruan.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Quick Actions */}
        <section className="bg-white p-3 sm:p-5 rounded-2xl shadow-lg">
          <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">Aksi Cepat</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            <Link
              to="/map"
              className="bg-blue-50 p-3 sm:p-5 rounded-xl hover:bg-blue-100 transition transform hover:scale-105 flex flex-col items-center"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-200 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <span className="font-semibold text-gray-800 text-sm sm:text-base text-center">Prediksi Baru</span>
            </Link>
            <Link
              to="/profile"
              className="bg-blue-50 p-3 sm:p-5 rounded-xl hover:bg-blue-100 transition transform hover:scale-105 flex flex-col items-center"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-200 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <span className="font-semibold text-gray-800 text-sm sm:text-base text-center">Profil Saya</span>
            </Link>
            <Link
              to="/history"
              className="bg-blue-50 p-3 sm:p-5 rounded-xl hover:bg-blue-100 transition transform hover:scale-105 flex flex-col items-center"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-yellow-200 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="font-semibold text-gray-800 text-sm sm:text-base text-center">Riwayat</span>
            </Link>
            <Link
              to="/emergency"
              className="bg-blue-50 p-3 sm:p-5 rounded-xl hover:bg-blue-100 transition transform hover:scale-105 flex flex-col items-center"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-200 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <span className="font-semibold text-gray-800 text-sm sm:text-base text-center">Darurat</span>
            </Link>
          </div>
        </section>
      </div>

      {/* Modal for Weather Details */}
      {selectedArea && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-3 sm:p-5 rounded-2xl w-full max-w-[90%] sm:max-w-md mx-4 shadow-xl">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800">Perkiraan Hujan {selectedArea.name}</h3>
            <div className="space-y-2 sm:space-y-3 max-h-80 sm:max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200">
              {weatherData[selectedArea.name]?.data?.[0]?.cuaca?.flat().map((fc, i) => (
                <div key={i} className="flex items-center space-x-2 sm:space-x-3 p-2 border-b border-gray-200">
                  <img
                    src={fc.image}
                    alt={fc.weather_desc}
                    className="w-6 h-6 sm:w-8 sm:h-8"
                    onError={(e) => (e.target.src = 'https://openweathermap.org/img/wn/01d@2x.png')}
                  />
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-800">{formatDate(fc.local_datetime)}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{fc.weather_desc}</p>
                    <p className="text-xs sm:text-sm text-gray-600">Suhu: {fc.t}°C, Kelembapan: {fc.hu}%</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setSelectedArea(null)}
              className="mt-2 sm:mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}