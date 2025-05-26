import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect, useRef } from 'react';

const bulanOptions = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const predictionSchema = Yup.object().shape({
  tahun: Yup.number()
    .required('Tahun harus diisi')
    .min(2020, 'Tahun minimal 2020')
    .max(2030, 'Tahun maksimal 2030'),
  bulan: Yup.string()
    .required('Bulan harus dipilih')
    .oneOf(bulanOptions, 'Bulan tidak valid'),
});

export default function PredictionForm({ onSubmit, initialPosition = [106.8272, -6.1751] }) {
  const [locationError, setLocationError] = useState(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [coordinates, setCoordinates] = useState({
    latitude: initialPosition[1],
    longitude: initialPosition[0]
  });

  const formikSetFieldValue = useRef(null);

  useEffect(() => {
    setCoordinates({
      latitude: initialPosition[1],
      longitude: initialPosition[0]
    });
  }, [initialPosition]);

  useEffect(() => {
    if (formikSetFieldValue.current) {
      formikSetFieldValue.current('latitude', coordinates.latitude);
      formikSetFieldValue.current('longitude', coordinates.longitude);
    }
  }, [coordinates]);

  const initialValues = {
    tahun: new Date().getFullYear(),
    bulan: bulanOptions[new Date().getMonth()],
    latitude: initialPosition[1],
    longitude: initialPosition[0]
  };

  const getCurrentLocation = (setFieldValue) => {
    setIsGettingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation tidak didukung di browser ini');
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
        setFieldValue('latitude', newCoords.latitude);
        setFieldValue('longitude', newCoords.longitude);
        setIsGettingLocation(false);
      },
      (error) => {
        setLocationError('Gagal mendapatkan lokasi: ' + error.message);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  const handleSubmit = (values, actions) => {
    const formData = {
      ...values,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude
    };
    onSubmit(formData, actions);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 sm:p-8 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Form Prediksi Banjir</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={predictionSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => {
          formikSetFieldValue.current = setFieldValue;

          return (
            <Form className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label htmlFor="tahun" className="block text-sm font-medium text-gray-700">
                    Tahun
                  </label>
                  <Field
                    type="number"
                    name="tahun"
                    id="tahun"
                    placeholder="Contoh: 2023"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                  />
                  <ErrorMessage name="tahun" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label htmlFor="bulan" className="block text-sm font-medium text-gray-700">
                    Bulan
                  </label>
                  <Field
                    as="select"
                    name="bulan"
                    id="bulan"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                  >
                    {bulanOptions.map((bulan) => (
                      <option key={bulan} value={bulan}>
                        {bulan}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="bulan" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lokasi Saat Ini
                  </label>
                  <div className="flex justify-between items-center mb-2">
                    <button
                      type="button"
                      onClick={() => getCurrentLocation(setFieldValue)}
                      disabled={isGettingLocation}
                      className="flex items-center bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      {isGettingLocation ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Mendapatkan Lokasi...
                        </>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Use My Location
                        </>
                      )}
                    </button>
                  </div>

                  {coordinates.latitude && coordinates.longitude && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div className="text-red-500 text-sm text-left mt-2">{locationError}</div>
                  )}

                  <Field type="hidden" name="latitude" />
                  <Field type="hidden" name="longitude" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isGettingLocation || isSubmitting}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isSubmitting ? 'Memproses...' : 'Prediksi Risiko Banjir'}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}