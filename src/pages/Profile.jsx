import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    city: '',
    longitude: '',
    latitude: '',
  });
  const [locationError, setLocationError] = useState(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?._id) {
        try {
          const response = await api.get(`/users/${user._id}`);
          setUserData(response.data);
          localStorage.setItem('profileData', JSON.stringify(response.data));
        } catch (err) {
          setApiError(err.response?.data?.error || 'Gagal mengambil data pengguna');
        }
      }
    };
    fetchUserData();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'longitude' || name === 'latitude') return;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await api.put(`/users/${user._id}`, userData);
      setUserData(response.data);
      localStorage.setItem('profileData', JSON.stringify(response.data));
      setIsEditing(false);
      setApiError(null);
    } catch (err) {
      setApiError(err.response?.data?.error || 'Gagal memperbarui profil');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus akun?')) {
      try {
        await api.delete(`/users/${user._id}`);
        logout();
      } catch (err) {
        setApiError(err.response?.data?.error || 'Gagal menghapus akun');
      }
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolokasi tidak didukung oleh browser Anda');
      return;
    }

    setIsGettingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserData((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
        setIsGettingLocation(false);
      },
      (error) => {
        setLocationError('Gagal mendapatkan lokasi: ' + error.message);
        setIsGettingLocation(false);
      }
    );
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Anda harus login untuk mengakses profil</h1>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Ke Halaman Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Profil</h1>
      {apiError && <div className="text-red-500 text-sm mb-4">{apiError}</div>}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              placeholder="Masukkan nama Anda"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          ) : (
            <p className="mt-1 p-2 bg-gray-50 rounded">{userData.name || <span className="text-gray-400">Belum diisi</span>}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              placeholder="Masukkan email Anda"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          ) : (
            <p className="mt-1 p-2 bg-gray-50 rounded">{userData.email || <span className="text-gray-400">Belum diisi</span>}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Kota/Kabupaten</label>
          {isEditing ? (
            <select
              name="city"
              value={userData.city}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 border bg-white"
            >
              <option value="">Pilih kota atau kabupaten</option>
              <option value="Jakarta Pusat">Jakarta Pusat</option>
              <option value="Jakarta Utara">Jakarta Utara</option>
              <option value="Jakarta Barat">Jakarta Barat</option>
              <option value="Jakarta Timur">Jakarta Timur</option>
              <option value="Jakarta Selatan">Jakarta Selatan</option>
              <option value="Kepulauan Seribu">Kepulauan Seribu</option>
              <option value="Kota Depok">Kota Depok</option>
              <option value="Kota Bekasi">Kota Bekasi</option>
              <option value="Kabupaten Bekasi">Kabupaten Bekasi</option>
              <option value="Kota Bogor">Kota Bogor</option>
              <option value="Kabupaten Bogor">Kabupaten Bogor</option>
              <option value="Kota Tangerang">Kota Tangerang</option>
              <option value="Kota Tangerang Selatan">Kota Tangerang Selatan</option>
              <option value="Kabupaten Tangerang">Kabupaten Tangerang</option>
            </select>
          ) : (
            <p className="mt-1 p-2 bg-gray-50 rounded">{userData.city || <span className="text-gray-400">Belum diisi</span>}</p>
          )}
        </div>

        {isEditing && (
          <div className="flex justify-start">
            <button
              onClick={getCurrentLocation}
              disabled={isGettingLocation}
              className="flex items-center bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              {isGettingLocation ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Mendapatkan Lokasi...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Gunakan Lokasi Saya
                </>
              )}
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Latitude</label>
            <input
              type="number"
              name="latitude"
              step="0.000001"
              value={userData.latitude}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm p-2 border text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Longitude</label>
            <input
              type="number"
              name="longitude"
              step="0.000001"
              value={userData.longitude}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm p-2 border text-gray-600"
            />
          </div>
        </div>

        {locationError && (
          <div className="text-red-500 text-sm mt-2">{locationError}</div>
        )}

        <div className="pt-6">
          {isEditing ? (
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Simpan Perubahan
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Edit Profil
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Hapus Akun
              </button>
              <button
                onClick={logout}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}