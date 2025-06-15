# FloodSight: Web Prediksi Banjir Berbasis Convolutional Neural Networks 🌊

FloodSight adalah sistem prediksi banjir berbasis web yang memanfaatkan citra satelit dan machine learning untuk memprediksi risiko banjir di JABODETABEK. Dengan antarmuka responsif, FloodSight meningkatkan kesiapsiagaan bencana menggunakan model CNN dan tabular scikit-learn, menyediakan prediksi akurat melalui dashboard interaktif yang mudah digunakan.

## 📋 Daftar Isi

- [Fitur Utama](#fitur-utama-)
- [Tech Stack](#tech-stack-)
- [Struktur Proyek](#struktur-proyek-)
- [Instalasi & Menjalankan](#instalasi--menjalankan-)
- [Konfigurasi](#konfigurasi-)
- [Progressive Web App (PWA)](#progressive-web-app-pwa-)
- [Cara Berkontribusi](#cara-berkontribusi-)

## Fitur Utama ✨

### 🗺️ Peta Interaktif
Menampilkan data banjir secara real-time di atas peta, memungkinkan pengguna untuk melihat area yang terdampak. Pengguna dapat memilih lokasi di peta atau memasukkan koordinat secara manual untuk prediksi banjir di area Jabodetabek.

### 📊 Grafik dan Analisis Data
Visualisasi data historis dan terkini melalui grafik interaktif, membantu pengguna memahami tren dan pola banjir.

### 🔒 Autentikasi Pengguna Aman
Sistem autentikasi yang aman menggunakan JWT (JSON Web Tokens) untuk melindungi data pengguna dan memberikan akses yang personal. Pengguna dapat mendaftar, login, dan mengelola profil mereka, termasuk menyimpan lokasi favorit.

### 📱 Progressive Web App (PWA)
Dapat diinstal pada perangkat seluler dan desktop untuk akses cepat dan pengalaman pengguna yang lebih baik, bahkan saat offline.

### 📚 Riwayat Prediksi
Melacak riwayat prediksi yang telah dibuat oleh pengguna, memungkinkan peninjauan kembali hasil prediksi sebelumnya.

### 🆘 Kontak Darurat
Menyediakan daftar kontak darurat penting dan tips keselamatan banjir.

## Tech Stack 🛠️

### Frontend
- **Bahasa Pemrograman:** JavaScript
- **Framework:** React
- **Bundler:** Vite
- **Styling:** Tailwind CSS

### Libraries & Tools
- **HTTP Client:** Axios
- **Grafik:** Chart.js dengan `react-chartjs-2`
- **Peta:** Maptiler SDK
- **Autentikasi:** JWT dengan `jwt-decode`
- **PWA:** VitePWA Plugin
- **Validasi Form:** Formik dan Yup
- **Notifikasi:** React Hot Toast
- **Ikon:** React Icons
- **Loading Spinner:** React Spinners

## Struktur Proyek 📂

```
FE-FloodSight/
├── public/                     # Public assets (icons, images)
├── src/
│   ├── assets/                 # Images and other static files
│   │   ├── LogoFloodSight-Remove.png
│   │   └── banjir.png
│   ├── api/
│   │   └── axios.js            # Axios instance with interceptors for API calls
│   ├── components/
│   │   ├── auth/
│   │   │   └── ProtectedRoute.jsx # Component for protecting routes
│   │   ├── Footer.jsx          # Footer component
│   │   ├── MapComponent.jsx    # Map display and interaction logic
│   │   ├── Navbar.jsx          # Navigation bar
│   │   └── PredictionForm.jsx  # Form for flood prediction input
│   ├── context/
│   │   ├── AuthContext.jsx     # Authentication context using React Context API
│   │   └── WeatherContext.jsx  # Weather data context
│   ├── data/
│   │   └── jabodetabekAreas.js # List of JABODETABEK areas
│   ├── pages/
│   │   ├── Dashboard.jsx       # Main dashboard with stats and weather info
│   │   ├── Emergency.jsx       # Emergency contacts and safety tips
│   │   ├── History.jsx         # User's prediction history with charts
│   │   ├── Login.jsx           # User login page
│   │   ├── Map.jsx             # Page for map-based flood prediction
│   │   └── Profile.jsx         # User profile management page
│   ├── App.css                 # Main application CSS
│   ├── App.jsx                 # Main application component and routing
│   └── main.jsx                # Entry point of the React application
├── .gitignore                  # Git ignore file for common exclusions
├── index.html                  # Main HTML file
├── package.json                # Project dependencies and scripts
├── package-lock.json           # Exact dependency versions
├── postcss.config.js           # PostCSS configuration for Tailwind CSS
├── README.md                   # Project README (this file)
├── tailwind.config.js          # Tailwind CSS configuration
└── vite.config.js              # Vite build configuration, including PWA setup
```

## Instalasi & Menjalankan 🚀

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

### Prasyarat
- Node.js (versi 16 atau lebih baru)
- npm atau yarn

### Langkah Instalasi

1. **Clone repositori:**
   ```bash
   git clone https://github.com/septianhadinugroho/FE-FloodSight.git
   ```

2. **Masuk ke direktori proyek:**
   ```bash
   cd FE-FloodSight
   ```

3. **Instal dependensi:**
   ```bash
   npm install
   ```

4. **Jalankan proyek dalam mode pengembangan:**
   ```bash
   npm run dev
   ```

Aplikasi akan tersedia di `http://localhost:5173` (atau port lain yang tersedia).

### Perintah Tambahan

```bash
# Build untuk production
npm run build

# Preview build production
npm run preview

# Linting code
npm run lint
```

## Konfigurasi ⚙️

### Backend API
Aplikasi ini berinteraksi dengan backend untuk melakukan autentikasi pengguna dan prediksi banjir. Pastikan backend berjalan dan dapat diakses dari:
```
https://be-flood-sight.vercel.app/
```
Konfigurasi ini dapat ditemukan di `src/api/axios.js`.

### Maptiler SDK
Aplikasi menggunakan Maptiler SDK untuk menampilkan peta interaktif. Pastikan API key telah diatur dengan benar di `src/components/MapComponent.jsx`:

```javascript
maptilersdk.config.apiKey = 'fvfICxsPxewVtLpHCE4g';
```

> **Catatan:** Untuk keamanan, disarankan untuk menyimpan API key dalam environment variables.

## Progressive Web App (PWA) 📱

FloodSight dikonfigurasi sebagai Progressive Web App yang menawarkan:

- Instalasi pada perangkat mobile dan desktop
- Kemampuan offline (service worker)
- Notifikasi push (opsional)
- Pengalaman native-like

Konfigurasi PWA dapat ditemukan di `vite.config.js`.

### Menginstal sebagai PWA
1. Buka aplikasi di browser
2. Klik ikon "Install" atau "Add to Home Screen"
3. Aplikasi akan tersedia sebagai aplikasi standalone

## Cara Berkontribusi 🤝

Kami menyambut kontribusi dari komunitas! Untuk berkontribusi:

### Langkah Kontribusi

1. **Fork repositori ini**

2. **Buat branch baru untuk fitur Anda:**
   ```bash
   git checkout -b feature/nama-fitur-anda
   ```

3. **Lakukan perubahan dan commit:**
   ```bash
   git commit -m "feat: menambahkan fitur baru - deskripsi singkat"
   ```

4. **Push ke branch Anda:**
   ```bash
   git push origin feature/nama-fitur-anda
   ```

5. **Buat Pull Request** ke branch `main`

### Panduan Kontribusi

- Pastikan kode mengikuti eslint configuration
- Jalankan `npm run lint` sebelum commit
- Tulis commit message yang jelas dan deskriptif
- Tambahkan dokumentasi untuk fitur baru
- Test fitur sebelum submit PR

### Konvensi Commit

Gunakan format conventional commits:
- `feat:` untuk fitur baru
- `fix:` untuk bug fixes
- `docs:` untuk perubahan dokumentasi
- `style:` untuk perubahan formatting
- `refactor:` untuk refactoring code
- `test:` untuk menambahkan tests

---

## 🙏 Terima Kasih

Terima kasih telah menggunakan FloodSight! Aplikasi ini dikembangkan untuk membantu masyarakat JABODETABEK dalam mengantisipasi risiko banjir.

**Bersama-sama kita ciptakan masa depan yang lebih aman dari bencana banjir! 🌊🛡️**
