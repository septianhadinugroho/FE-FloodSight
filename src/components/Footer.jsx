import { Link } from 'react-router-dom';
import Logo from '../assets/LogoFloodSight-Remove.png';

export default function Footer() {
  return (
    <footer className="w-full bg-blue-600 text-white py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Branding */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <img
                src={Logo}
                alt="FloodSight Logo"
                className="h-6 w-6 object-contain"
                style={{ filter: 'brightness(0) invert(1)' }} // White logo
              />
              <h4 className="text-lg font-semibold">FloodSight</h4>
            </div>
            <p className="text-sm leading-relaxed">
              FloodSight adalah sistem prediksi banjir berbasis web yang memanfaatkan citra satelit dan machine learning untuk memprediksi risiko banjir di JABODETABEK. Dengan antarmuka responsif, FloodSight meningkatkan kesiapsiagaan bencana.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-200 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-blue-200 transition-colors">
                  Prediksi Baru
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-blue-200 transition-colors">
                  Riwayat
                </Link>
              </li>
              <li>
                <Link to="/emergency" className="hover:text-blue-200 transition-colors">
                  Darurat
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-blue-200 transition-colors">
                  Profil Saya
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak & Sumber */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Sumber</h4>
            <p className="text-sm leading-relaxed">
              Data Perkiraan Cuaca dan Hujan:
              <br />
              Badan Meteorologi, Klimatologi, dan Geofisika (BMKG)
              <br />
              Data Satelit:
              <br />
              Google Earth Engine (GEE)
            </p>
          </div>
        </div>
        <div className="mt-4 text-center text-sm border-t border-blue-500 pt-4">
          © 2025 FloodSight. Dikembangkan oleh FloodSight Team.
        </div>
      </div>
    </footer>
  );
}