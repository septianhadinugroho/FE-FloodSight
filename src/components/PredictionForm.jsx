import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

const bulanOptions = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

// Validation schema with Jabodetabek bounds
const predictionSchema = Yup.object().shape({
  tahun: Yup.number()
    .required('Tahun harus diisi')
    .min(2020, 'Tahun minimal 2020')
    .max(2030, 'Tahun maksimal 2030'),
  bulan: Yup.string()
    .required('Bulan harus dipilih')
    .oneOf(bulanOptions, 'Bulan tidak valid'),
  latitude: Yup.number()
    .required('Latitude harus diisi')
    .min(-6.6, 'Latitude harus antara -6.6 dan -5.8 (wilayah Jabodetabek)')
    .max(-5.8, 'Latitude harus antara -6.6 dan -5.8 (wilayah Jabodetabek)'),
  longitude: Yup.number()
    .required('Longitude harus diisi')
    .min(106.4, 'Longitude harus antara 106.4 dan 107.2 (wilayah Jabodetabek)')
    .max(107.2, 'Longitude harus antara 106.4 dan 107.2 (wilayah Jabodetabek)'),
});

export default function PredictionForm({ onSubmit, initialPosition = [106.8272, -6.1751], setPosition }) {
  const [isCoordinatesSaved, setIsCoordinatesSaved] = useState(false);

  const initialValues = {
    tahun: new Date().getFullYear(),
    bulan: bulanOptions[new Date().getMonth()],
    latitude: parseFloat(initialPosition[1]).toFixed(6),
    longitude: parseFloat(initialPosition[0]).toFixed(6)
  };

  const handleSaveCoordinates = (values, setFieldValue) => {
    const boundedLng = Math.max(106.4, Math.min(107.2, parseFloat(values.longitude)));
    const boundedLat = Math.max(-6.6, Math.min(-5.8, parseFloat(values.latitude)));
    setFieldValue('latitude', boundedLat.toFixed(6));
    setFieldValue('longitude', boundedLng.toFixed(6));
    setPosition([boundedLng, boundedLat]);
    setIsCoordinatesSaved(true);
    console.log('Coordinates saved:', [boundedLng, boundedLat]);
  };

  const handleSubmit = (values, actions) => {
    const formData = {
      ...values,
      latitude: parseFloat(values.latitude),
      longitude: parseFloat(values.longitude)
    };
    onSubmit(formData, actions);
    setIsCoordinatesSaved(false); // Reset after submission
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 sm:p-8 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Form Prediksi Banjir</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={predictionSchema}
        onSubmit={handleSubmit}
        enableReinitialize // Ensure form updates when initialPosition changes
      >
        {({ isSubmitting, setFieldValue, values, setFieldTouched }) => (
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

              <div>
                <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
                  Latitude
                </label>
                <Field
                  type="number"
                  name="latitude"
                  id="latitude"
                  step="any"
                  onChange={(e) => {
                    setFieldValue('latitude', e.target.value);
                    setFieldTouched('latitude', true);
                    setIsCoordinatesSaved(false);
                    if (e.target.value && values.longitude) {
                      const boundedLat = Math.max(-6.6, Math.min(-5.8, parseFloat(e.target.value)));
                      const boundedLng = Math.max(106.4, Math.min(107.2, parseFloat(values.longitude)));
                      setPosition([boundedLng, boundedLat]);
                    }
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
                <ErrorMessage name="latitude" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
                  Longitude
                </label>
                <Field
                  type="number"
                  name="longitude"
                  id="longitude"
                  step="any"
                  onChange={(e) => {
                    setFieldValue('longitude', e.target.value);
                    setFieldTouched('longitude', true);
                    setIsCoordinatesSaved(false);
                    if (e.target.value && values.latitude) {
                      const boundedLng = Math.max(106.4, Math.min(107.2, parseFloat(e.target.value)));
                      const boundedLat = Math.max(-6.6, Math.min(-5.8, parseFloat(values.latitude)));
                      setPosition([boundedLng, boundedLat]);
                    }
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
                <ErrorMessage name="longitude" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleSaveCoordinates(values, setFieldValue)}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mb-2"
            >
              Simpan Koordinat
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !isCoordinatesSaved}
              className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isSubmitting || !isCoordinatesSaved
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Memproses...' : 'Prediksi Risiko Banjir'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}