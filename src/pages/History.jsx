import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function History() {
  const [predictionHistory, setPredictionHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/api/predictions');
        setPredictionHistory(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching history:', error);
        setError(error.response?.data?.error || 'Gagal memuat riwayat. Silakan coba lagi.');
        if (error.response?.status === 401) {
          window.location.href = '/login';
        }
      }
    };
    fetchHistory();
  }, []);

  // Chart data for counting flood vs. non-flood predictions
  const chartData = {
    labels: ['Banjir', 'Tidak Banjir'],
    datasets: [
      {
        label: 'Jumlah Prediksi',
        data: [
          predictionHistory.filter(item => item.prediksi_label).length,
          predictionHistory.filter(item => !item.prediksi_label).length,
        ],
        backgroundColor: ['rgba(239, 68, 68, 0.7)', 'rgba(34, 197, 94, 0.7)'],
        borderColor: ['rgb(239, 68, 68)', 'rgb(34, 197, 94)'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Jumlah: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Riwayat Prediksi</h1>
      </div>

      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="hidden md:grid grid-cols-8 bg-gray-100 p-4 font-medium">
          <div className="col-span-2">Kabupaten/Kota</div>
          <div className="col-span-2">Kecamatan</div>
          <div className="col-span-2">Koordinat</div>
          <div className="col-span-1">Bulan/Tahun</div>
          <div className="col-span-1">Prediksi</div>
        </div>

        {predictionHistory.length > 0 ? (
          predictionHistory.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-1 md:grid-cols-8 p-4 border-b hover:bg-gray-50 transition-colors gap-2 md:gap-0"
            >
              <div className="md:hidden flex justify-between">
                <span className="text-gray-500">Kabupaten/Kota:</span>
                <span>{item.kabupaten || 'N/A'}</span>
              </div>
              <div className="md:hidden flex justify-between">
                <span className="text-gray-500">Kecamatan:</span>
                <span>{item.kecamatan || 'N/A'}</span>
              </div>
              <div className="md:hidden flex justify-between">
                <span className="text-gray-500">Koordinat:</span>
                <span>
                  {item.longitude.toFixed(6)}, {item.latitude.toFixed(6)}
                </span>
              </div>
              <div className="md:hidden flex justify-between">
                <span className="text-gray-500">Bulan/Tahun:</span>
                <span>
                  {item.bulan} {item.tahun}
                </span>
              </div>
              <div className="md:hidden flex justify-between">
                <span className="text-gray-500">Prediksi:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    item.prediksi_label
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {item.prediksi_label ? 'Banjir' : 'Tidak Banjir'}
                </span>
              </div>

              <div className="hidden md:block col-span-2 text-gray-600">
                {item.kabupaten || 'N/A'}
              </div>
              <div className="hidden md:block col-span-2 text-gray-600">
                {item.kecamatan || 'N/A'}
              </div>
              <div className="hidden md:block col-span-2 text-gray-600">
                {item.longitude.toFixed(6)}, {item.latitude.toFixed(6)}
              </div>
              <div className="hidden md:block col-span-1 text-gray-600">
                {item.bulan} {item.tahun}
              </div>
              <div className="hidden md:block col-span-1">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    item.prediksi_label
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {item.prediksi_label ? 'Banjir' : 'Tidak Banjir'}
                </span>
              </div>
            </div>
          ))
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
                d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
              />
            </svg>
            <div>
              <p className="text-sm sm:text-base text-gray-800 font-medium">
                Belum ada riwayat prediksi
              </p>
              <p className="text-xs preoccupations sm:text-sm text-gray-600">
                Tidak ada prediksi banjir yang tersedia saat ini. Buat prediksi baru melalui halaman map untuk memulai.
              </p>
            </div>
          </div>
        )}
      </div>

      {predictionHistory.length > 0 && (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Statistik Prediksi</h2>
          <div className="h-64 sm:h-80 lg:h-96">
            <Bar data={chartData} options={chartOptions} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm">Banjir</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm">Tidak Banjir</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}