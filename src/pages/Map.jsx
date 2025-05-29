import { useState } from 'react';
import MapComponent from '../components/MapComponent';
import PredictionForm from '../components/PredictionForm';
import { Formik } from 'formik';

export default function MapPage() {
  const [position, setPosition] = useState([106.8272, -6.1751]);
  const [predictionResult, setPredictionResult] = useState(null);

  const handlePredictionSubmit = async (values, { setSubmitting }) => {
    try {
      console.log('Submitting prediction:', values);

      await new Promise(resolve => setTimeout(resolve, 1500));

      const riskLevel = Math.random() > 0.7 ? 'High' : Math.random() > 0.4 ? 'Medium' : 'Low';
      setPredictionResult({
        riskLevel,
        message: `Flood risk for ${values.bulan}/${values.tahun} is ${riskLevel}`,
        details: values
      });
    } catch (error) {
      console.error('Prediction error:', error);
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
          latitude: position[1],
          longitude: position[0]
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
                  <div className={`p-3 rounded-md ${predictionResult.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                    predictionResult.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                    <p className="font-bold">{predictionResult.message}</p>
                    <p className="mt-2 text-sm">Lokasi: {predictionResult.details.latitude}, {predictionResult.details.longitude}</p>
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