import { Link } from 'react-router-dom';
import jakartaHero from '../assets/hero-banjir.jpg';
import MapComponent from '../components/MapComponent';

export default function Dashboard() {
  // Data dummy
  const highRiskAreas = [
    { name: "Jakarta Utara", riskLevel: "Tinggi", lastFlood: "2 hari lalu" },
    { name: "Bekasi", riskLevel: "Sedang", lastFlood: "1 minggu lalu" },
    { name: "Depok", riskLevel: "Rendah", lastFlood: "3 bulan lalu" }
  ];

  const weatherAlerts = [
    { type: "Hujan Lebat", area: "Jakarta Selatan", time: "Hari ini" },
    { type: "Angin Kencang", area: "Tangerang", time: "Besok" }
  ];

  return (
    <div className="px-4 py-6 space-y-6 sm:space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden shadow-lg h-48 sm:h-64 md:h-80 lg:h-96">
        <img
          src={jakartaHero}
          alt="Peta Banjir Jabodetabek"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent flex items-end p-4 sm:p-6 md:p-8">
          <div className="w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Sistem Prediksi Banjir Jabodetabek
            </h1>
            <p className="text-blue-100 mt-2 text-sm sm:text-base md:text-lg">
              Pantau dan antisipasi banjir di wilayah Anda
            </p>
          </div>
        </div>
      </div>

      {/* Statistik Cepat */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            Zona Risiko Tinggi
          </h3>
          <p className="text-3xl font-bold text-red-600">3 Wilayah</p>
          <p className="text-gray-500 mt-2">Dalam sebulan terakhir</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
            Siaga Cuaca
          </h3>
          <p className="text-3xl font-bold text-yellow-600">2 Alert</p>
          <p className="text-gray-500 mt-2">Hujan lebat diperkirakan</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
            Prediksi Terakhir
          </h3>
          <p className="text-3xl font-bold text-blue-600">85% Akurat</p>
          <p className="text-gray-500 mt-2">Berdasarkan data BMKG</p>
        </div>
      </div>

      {/* Peta Risiko */}
      <div className="bg-white p-3 sm:p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4">Peta Risiko Banjir Jabodetabek</h3>
        <div className="h-96 rounded-lg overflow-hidden border border-gray-300 relative">
          <MapComponent />
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Critical - Untuk area paling berbahaya */}
            <div className="flex items-center">
              <span className="w-5 h-5 bg-red-700 rounded-full mr-3 border border-white shadow-sm"></span>
              <div>
                <p className="font-medium text-gray-900">Kritis</p>
                <p className="text-xs text-gray-500">Bendungan/Pintu Air Utama</p>
              </div>
            </div>

            {/* Very High - Banjir tahunan */}
            <div className="flex items-center">
              <span className="w-5 h-5 bg-red-500 rounded-full mr-3 border border-white shadow-sm"></span>
              <div>
                <p className="font-medium text-gray-900">Sangat Tinggi</p>
                <p className="text-xs text-gray-500">Banjir Kanal, Rob, Kawasan Puncak</p>
              </div>
            </div>

            {/* High - Banjir periodik */}
            <div className="flex items-center">
              <span className="w-5 h-5 bg-orange-500 rounded-full mr-3 border border-white shadow-sm"></span>
              <div>
                <p className="font-medium text-gray-900">Tinggi</p>
                <p className="text-xs text-gray-500">Banjir Kiriman</p>
              </div>
            </div>

            {/* Medium - Banjir lokal */}
            <div className="flex items-center">
              <span className="w-5 h-5 bg-yellow-400 rounded-full mr-3 border border-white shadow-sm"></span>
              <div>
                <p className="font-medium text-gray-900">Sedang</p>
                <p className="text-xs text-gray-500">Banjir Lokal</p>
              </div>
            </div>

            {/* Monitoring Points */}
            <div className="flex items-center">
              <span className="w-5 h-5 bg-blue-500 rounded-full mr-3 border-2 border-white shadow-sm"></span>
              <div>
                <p className="font-medium text-gray-900">Pos Pantau</p>
                <p className="text-xs text-gray-500">Pos Pengamatan Banjir</p>
              </div>
            </div>

            {/* Safe Area */}
            <div className="flex items-center">
              <span className="w-5 h-5 bg-green-500 rounded-full mr-3 border border-white shadow-sm"></span>
              <div>
                <p className="font-medium text-gray-900">Aman</p>
                <p className="text-xs text-gray-500">Area Tidak Rawan Banjir</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Area Berisiko */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Wilayah Berisiko Tinggi</h3>
          <ul className="space-y-3">
            {highRiskAreas.map((area, index) => (
              <li key={index} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{area.name}</h4>
                  <p className="text-sm text-gray-500">Banjir terakhir: {area.lastFlood}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${area.riskLevel === "Tinggi" ? "bg-red-100 text-red-800" :
                  area.riskLevel === "Sedang" ? "bg-yellow-100 text-yellow-800" :
                    "bg-green-100 text-green-800"
                  }`}>
                  {area.riskLevel}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Peringatan Cuaca</h3>
          <ul className="space-y-3">
            {weatherAlerts.map((alert, index) => (
              <li key={index} className="p-3 hover:bg-gray-50 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-medium">{alert.type}</h4>
                <p className="text-sm">{alert.area} • {alert.time}</p>
                <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                  Detail &raquo;
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-blue-50 p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4">Aksi Cepat</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/map"
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all flex flex-col items-center"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <span className="font-medium text-center">Prediksi Baru</span>
          </Link>

          <Link
            to="/profile"
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all flex flex-col items-center"
          >
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="font-medium text-center">Profil Saya</span>
          </Link>

          <Link
            to="/history"
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all flex flex-col items-center"
          >
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-medium text-center">Riwayat</span>
          </Link>

          <Link
            to="/emergency"
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all flex flex-col items-center"
          >
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-2">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <span className="font-medium text-center">Darurat</span>
          </Link>
        </div>
      </div>
    </div>
  );
}