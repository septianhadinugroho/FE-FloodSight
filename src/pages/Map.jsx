import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MapComponent from '../components/MapComponent';
import PredictionForm from '../components/PredictionForm';
import { Formik } from 'formik';
import api from '../api/axios';

export default function MapPage() {
  const [position, setPosition] = useState([106.8272, -6.1751]);
  const [predictionResult, setPredictionResult] = useState(null);
  const navigate = useNavigate();

  const handlePredictionSubmit = async (values, { setSubmitting }) => {
    try {
      console.log('Submitting prediction:', values);

      const response = await api.post('/api/predict', {
        tahun: values.tahun,
        bulan: values.bulan,
        latitude: parseFloat(values.latitude),
        longitude: parseFloat(values.longitude),
      });

      const { prediksi_label, kecamatan, kabupaten } = response.data;

      setPredictionResult({
        prediksi_label,
        message: `Prediksi banjir untuk ${values.bulan}/${values.tahun} di ${kecamatan}, ${kabupaten} adalah ${prediksi_label ? 'Banjir' : 'Tidak Banjir'}`,
        details: { ...values, kecamatan, kabupaten },
      });
    } catch (error) {
      console.error('Prediction error:', error);
      const errorMessage = error.response?.data?.error || 'Gagal melakukan prediksi. Silakan coba lagi.';
      setPredictionResult({
        message: errorMessage,
        error: true,
      });
      // Only redirect to login if explicitly a 401 error
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="px-4 py-6 space-y-4 sm:space-y-6">
      <h1 className="text-2xl font-bold">Peta Prediksi Banjir</h1>

      <Formik
        initialValues={{
          tahun: new Date().getFullYear(),
          bulan: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'][new Date().getMonth()],
          latitude: parseFloat(position[1]).toFixed(6),
          longitude: parseFloat(position[0]).toFixed(6),
        }}
        onSubmit={handlePredictionSubmit}
      >
        {({ setFieldValue }) => (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2">
              <MapComponent
                position={position}
                setPosition={(newPosition) => {
                  console.log('Map updating position:', newPosition);
                  setPosition(newPosition);
                  setFieldValue('latitude', parseFloat(newPosition[1]).toFixed(6));
                  setFieldValue('longitude', parseFloat(newPosition[0]).toFixed(6));
                }}
              />
            </div>

            <div>
              <PredictionForm
                onSubmit={handlePredictionSubmit}
                initialPosition={position}
                setPosition={(newPosition) => {
                  console.log('Form updating position:', newPosition);
                  setPosition(newPosition);
                  setFieldValue('latitude', parseFloat(newPosition[1]).toFixed(6));
                  setFieldValue('longitude', parseFloat(newPosition[0]).toFixed(6));
                }}
              />

              {predictionResult && (
                <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">Hasil Prediksi</h3>
                  <div className={`p-3 rounded-md ${predictionResult.error ? 'bg-red-100 text-red-800' : predictionResult.prediksi_label ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    <p className="font-bold">{predictionResult.message}</p>
                    {!predictionResult.error && (
                      <p className="mt-2 text-sm">Lokasi: {predictionResult.details.kecamatan}, {predictionResult.details.kabupaten} ({predictionResult.details.latitude}, {predictionResult.details.longitude})</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}