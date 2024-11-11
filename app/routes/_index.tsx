import React, { useState } from "react";

export default function Index() {
  const [language, setLanguage] = useState('TH');

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'TH' ? 'EN' : 'TH'));
  };

  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center"
      style={{ fontFamily: 'Kanit, sans-serif' }}
    >
      {/* Background Image Overlay */}
      <div
        className="flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat rounded-[45px] shadow-lg shadow-inner"
        style={{
          width: '1891px',
          height: '888px',
          backgroundImage: "url('/background-home.png')",
          boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1), inset 0 4px 4px rgba(0, 0, 0, 0.2), 0 4px 4px rgba(0, 0, 0, 0.3)',
          marginTop: '59px',
        }}
      >
        {/* Link to Google Fonts for Kanit and Inter fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap"
          rel="stylesheet"
        />

        {/* Header Section */}
        <header className="w-full bg-opacity-80 flex justify-between items-center fixed top-0 z-10">
          <div className="flex items-center">
            <img src="/logo-rainbow.png" alt="Rainbow Logo" className="w-20 h-20 ml-[54px]" />
            <span className="text-xs text-gray-500 ml-1">BETA</span>
          </div>
          <nav className="space-x-6 text-gray-700">
            <a href="#" className="hover:text-gray-900">คำถามที่พบบ่อย</a>
            <a href="#" className="hover:text-gray-900">ที่ตั้งร้าน</a>
            <a href="#" className="hover:text-gray-900">ติดต่อเรา</a>
            <button
              onClick={toggleLanguage}
              aria-label="Toggle Language"
              className="hover:text-gray-900 font-semibold text-blue-500"
            >
              {language}
            </button>
          </nav>
        </header>

        <main className="flex flex-col items-center mt-[-130px] text-center px-4 bg-opacity-80 p-8 rounded-lg">
          <img 
            src="/logo-rainbow.png" 
            alt="Rainbow Logo" 
            className="w-[200px] h-[200px] drop-shadow-[20px_20px_40px_rgba(0,0,0,0.25)]" 
          />

          {/* Title Section */}
          <h1
            className="text-[110px] font-bold text-gray-800"
            style={{
              letterSpacing: '0.05em',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <span className="text-red-500">R</span>
            <span className="text-orange-500">a</span>
            <span className="text-yellow-500">i</span>
            <span className="text-green-500">n</span>
            <span className="text-blue-500">b</span>
            <span className="text-indigo-500">o</span>
            <span className="text-purple-500">w</span>
            <span style={{ color: "#212121", fontSize: "45px", letterSpacing: '0.02em' }} >
              Digital Photo.
            </span>
          </h1>

          <p
            className="mt-4 text-[78px]"
            style={{
              color: '#9E9E9E',
              letterSpacing: '0.2em',
              textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              fontWeight: '400',
              transform: 'scaleY(1.2)',
              marginTop: '-35px',
            }}
          >
            {language === 'TH' ? 'ร้านถ่ายรูปครบวงจร' : 'Full-Service Photo Shop'}
          </p>

          <p className="text-[22px] mt-2 text-gray-600" style={{ color: "#212121", transform: 'scaleY(1.1)', letterSpacing: '0.05em', marginTop: '45px' }}>
            {language === 'TH' 
              ? 'รับงานสื่อดิจิตอล ถ่ายรูปด่วนรอรับได้ ถ่ายตัดต่อใส่สูท บริการออนไลน์.'
              : 'Digital media services, quick photo shoots, suit photos, online services.'}
          </p>

          {/* Start Button */}
          <button
            className="mt-16 bg-red-500 text-white py-4 px-12 rounded-[15px] text-lg font-light hover:bg-red-600 transition duration-300"
            style={{ transform: 'scaleY(1.1)', letterSpacing: '0.05em' }}
          >
            {language === 'TH' ? 'เริ่มต้นใช้งาน' : 'Get Started'}
          </button>
        </main>
      </div>
    </div>
  );
}