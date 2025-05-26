import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const registerSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too short').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  city: Yup.string().required('Required'),
  // Hapus validasi untuk longitude dan latitude karena akan diisi otomatis
});

export default function Register() {
  const [locationError, setLocationError] = useState(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [coordinates, setCoordinates] = useState({
    latitude: 0,
    longitude: 0
  });
  const { register } = useAuth();

  const handleSubmit = (values, { setSubmitting }) => {
    const userData = {
      name: values.name,
      email: values.email,
      city: values.city,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    };

    // Simpan data user ke localStorage
    localStorage.setItem('profileData', JSON.stringify(userData));

    // Simulasikan login langsung setelah register
    register(userData);

    setSubmitting(false);
  };

  const getCurrentLocation = (setFieldValue) => {
    setIsGettingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newCoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        setCoordinates(newCoords);
        // Set nilai ke Formik tanpa menampilkan field
        setFieldValue('latitude', newCoords.latitude);
        setFieldValue('longitude', newCoords.longitude);
        setIsGettingLocation(false);
      },
      (error) => {
        setLocationError('Unable to retrieve your location: ' + error.message);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 sm:p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          city: '',
        }}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="space-y-4 sm:space-y-6">
            {/* Nama */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
              <Field
                type="text"
                name="name"
                className="mt-1 block w-full rounded-md border-gray-300 p-2 border"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Field
                type="email"
                name="email"
                className="mt-1 block w-full rounded-md border-gray-300 p-2 border"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <Field
                type="password"
                name="password"
                className="mt-1 block w-full rounded-md border-gray-300 p-2 border"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <Field
                type="password"
                name="confirmPassword"
                className="mt-1 block w-full rounded-md border-gray-300 p-2 border"
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">Kota/Kabupaten</label>
              <Field
                as="select"
                name="city"
                className="mt-1 block w-full rounded-md border-gray-300 p-2 border bg-white"
              >
                <option value="">Select a city or regency</option>
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
              </Field>
              <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
            </div>


            {/* Lokasi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi Saat Ini</label>
              <div className="flex justify-between items-center mb-2">
                <button
                  type="button"
                  onClick={() => getCurrentLocation(setFieldValue)}
                  disabled={isGettingLocation}
                  className="flex items-center bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
                >
                  {isGettingLocation ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Getting Location...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      Use My Location
                    </>
                  )}
                </button>
              </div>

              {/* Tampilkan latitude & longitude sebagai input non-editable */}
              {(coordinates.latitude !== 0 && coordinates.longitude !== 0) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Latitude</label>
                    <input
                      type="text"
                      value={coordinates.latitude.toFixed(6)}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Longitude</label>
                    <input
                      type="text"
                      value={coordinates.longitude.toFixed(6)}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 cursor-not-allowed"
                    />
                  </div>
                </div>
              )}

              {locationError && (
                <div className="text-red-500 text-sm text-left mt-1">{locationError}</div>
              )}

              {/* Field tersembunyi untuk dikirim ke backend */}
              <Field type="hidden" name="latitude" />
              <Field type="hidden" name="longitude" />
            </div>


            <button
              type="submit"
              disabled={isGettingLocation || isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Sudah punya akun? <Link to="/login" className="text-blue-600 hover:text-blue-800">Login</Link>
        </p>
      </div>
    </div>
  );
}