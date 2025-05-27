export default function Emergency() {
  // Data kontak darurat
  const emergencyContacts = [
    {
      name: "BPBD DKI Jakarta",
      phone: "112",
      description: "Badan Penanggulangan Bencana Daerah"
    },
    {
      name: "Pemadam Kebakaran",
      phone: "113",
      description: "Dinas Penanggulangan Kebakaran"
    },
    {
      name: "Ambulans",
      phone: "119",
      description: "Layanan Gawat Darurat"
    },
    {
      name: "Polisi",
      phone: "110",
      description: "Kepolisian Negara"
    }
  ];

  const safetyTips = [
    "Segera evakuasi ke tempat yang lebih tinggi",
    "Hindari arus air yang deras",
    "Matikan aliran listrik di rumah",
    "Bawa dokumen penting dalam tas tahan air",
    "Gunakan jalur evakuasi yang sudah ditentukan"
  ];

  return (
    <div className="px-4 py-6">
      <div className="bg-red-600 text-white p-4 sm:p-6 rounded-xl">
        <h1 className="text-2xl font-bold">Darurat Banjir Jabodetabek</h1>
        <p className="mt-2">Layanan dan informasi penting saat keadaan darurat</p>
      </div>

      {/* Kontak Darurat */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Kontak Darurat
          </h2>
          
          <div className="space-y-3">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="p-3 border rounded-lg hover:bg-red-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{contact.name}</h3>
                    <p className="text-sm text-gray-600">{contact.description}</p>
                  </div>
                  <a 
                    href={`tel:${contact.phone}`}
                    className="bg-red-100 text-red-800 px-3 py-1 rounded-lg hover:bg-red-200 transition-colors flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {contact.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panduan Keselamatan */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Panduan Keselamatan
          </h2>
          
          <ul className="space-y-2">
            {safetyTips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mr-2 mt-0.5">
                  {index + 1}
                </span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}