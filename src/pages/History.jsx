import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
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
  // Data dummy prediction history
  const predictionHistory = [
    {
      id: 1,
      location: "Kelapa Gading, Jakarta Utara",
      date: "15 Juni 2024",
      riskLevel: "Tinggi",
      accuracy: 87,
      coordinates: [-6.1592, 106.9078]
    },
    {
      id: 2,
      location: "Cibubur, Jakarta Timur",
      date: "10 Juni 2024",
      riskLevel: "Sedang",
      accuracy: 78,
      coordinates: [-6.3645, 106.9197]
    },
    {
      id: 3,
      location: "BSD, Tangerang Selatan",
      date: "5 Juni 2024",
      riskLevel: "Rendah",
      accuracy: 92,
      coordinates: [-6.3026, 106.6436]
    },
    {
      id: 4,
      location: "Kemang, Jakarta Selatan",
      date: "1 Juni 2024",
      riskLevel: "Sedang",
      accuracy: 82,
      coordinates: [-6.2649, 106.8176]
    },
    {
      id: 5,
      location: "Pondok Indah, Jakarta Selatan",
      date: "28 Mei 2024",
      riskLevel: "Rendah",
      accuracy: 95,
      coordinates: [-6.2916, 106.7834]
    }
  ];

  // chart data, gatau sih buat apa
  const chartData = {
    labels: predictionHistory.map(item => item.location.split(',')[0]),
    datasets: [
      {
        label: 'Akurasi Prediksi (%)',
        data: predictionHistory.map(item => item.accuracy),
        backgroundColor: predictionHistory.map(item => 
          item.riskLevel === "Tinggi" ? 'rgba(239, 68, 68, 0.7)' :
          item.riskLevel === "Sedang" ? 'rgba(234, 179, 8, 0.7)' :
          'rgba(34, 197, 94, 0.7)'
        ),
        borderColor: predictionHistory.map(item => 
          item.riskLevel === "Tinggi" ? 'rgb(239, 68, 68)' :
          item.riskLevel === "Sedang" ? 'rgb(234, 179, 8)' :
          'rgb(34, 197, 94)'
        ),
        borderWidth: 1,
      }
    ]
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
              return `Akurasi: ${context.raw}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      }
    }
  };

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Riwayat Prediksi</h1>
        <Link 
          to="/map" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto text-center"
        >
          Lihat Prediksi Lainnya
        </Link>
      </div>

      {/* History Table - Mobile Friendly */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Desktop Table Header (hidden on mobile) */}
        <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 font-medium">
          <div className="col-span-4">Lokasi</div>
          <div className="col-span-2">Tanggal</div>
          <div className="col-span-2">Tingkat Risiko</div>
          <div className="col-span-2">Akurasi</div>
          <div className="col-span-2">Aksi</div>
        </div>

        {/* Mobile & Desktop Table Rows */}
        {predictionHistory.map((item) => (
          <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 p-4 border-b hover:bg-gray-50 transition-colors gap-2 md:gap-0">
            {/* Mobile View */}
            <div className="md:hidden flex justify-between">
              <span className="font-medium text-gray-500">Lokasi:</span>
              <span className="font-medium text-right">{item.location}</span>
            </div>
            
            {/* Desktop View */}
            <div className="hidden md:block col-span-4 font-medium truncate" title={item.location}>
              {item.location}
            </div>

            <div className="md:col-span-2">
              <div className="md:hidden flex justify-between">
                <span className="text-gray-500">Tanggal:</span>
                <span>{item.date}</span>
              </div>
              <div className="hidden md:block text-gray-600">
                {item.date}
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="md:hidden flex justify-between">
                <span className="text-gray-500">Risiko:</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  item.riskLevel === "Tinggi" ? "bg-red-100 text-red-800" :
                  item.riskLevel === "Sedang" ? "bg-yellow-100 text-yellow-800" :
                  "bg-green-100 text-green-800"
                }`}>
                  {item.riskLevel}
                </span>
              </div>
              <div className="hidden md:block">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  item.riskLevel === "Tinggi" ? "bg-red-100 text-red-800" :
                  item.riskLevel === "Sedang" ? "bg-yellow-100 text-yellow-800" :
                  "bg-green-100 text-green-800"
                }`}>
                  {item.riskLevel}
                </span>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="md:hidden flex justify-between">
                <span className="text-gray-500">Akurasi:</span>
                <span>{item.accuracy}%</span>
              </div>
              <div className="hidden md:block">
                {item.accuracy}%
              </div>
            </div>

            <div className="md:col-span-2 text-right">
              <Link 
                to={`/map?lat=${item.coordinates[0]}&lng=${item.coordinates[1]}`}
                className="inline-block text-blue-600 hover:text-blue-800 text-sm whitespace-nowrap"
              >
                {window.innerWidth < 768 ? 'Detail →' : 'Lihat Detail →'}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Statistics Chart */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Statistik Prediksi</h2>
        <div className="h-64 sm:h-80 lg:h-96">
          <Bar data={chartData} options={chartOptions} />
        </div>
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm">Tinggi</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <span className="text-sm">Sedang</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm">Rendah</span>
          </div>
        </div>
      </div>
    </div>
  );
}