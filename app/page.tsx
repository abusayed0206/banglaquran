"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Surah {
  surah_number: number;
  surah_name: string;
}

const HomePage: React.FC = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch("/data/surah.json"); // Fetching from public directory
        if (!response.ok) {
          throw new Error("Failed to fetch Surah name");
        }
        const data = await response.json();
        setSurahs(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSurahs();
  }, []);

  return (
    <div className="min-h-screen text-gray-800 bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 flex flex-col items-center justify-center p-6 md:p-12">
      {/* First Section: Surah Selection */}
      <div className="bg-white rounded-lg shadow-xl p-6 mb-12 w-full max-w-2xl mx-auto">
      <h2 className="text-3xl text-center sm:text-4xl font-semibold text-blue-800 mb-4">বাংলা কোরআন অডিও🎧📖</h2>
        <h1 className="text-center text-2xl sm:text-2xl font-bold text-blue-700 mb-5">কোরআনের সূরা নির্বাচন করুন</h1>

        <div className="mb-5">
          <label htmlFor="surah-select" className="block text-lg font-semibold text-center text-gray-700 mb-2">
            সূরা সংখ্যা ও নাম নির্বাচন করুন:
          </label>
          <select
            id="surah-select"
            value={selectedSurah || ""}
            onChange={(e) => setSelectedSurah(parseInt(e.target.value, 10))}
            className="border-2 text-center border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg w-full"
          >
            <option value="">-- সূরা নির্বাচন করুন --</option>
            {surahs.map((surah) => (
              <option key={surah.surah_number} value={surah.surah_number}>
                {surah.surah_number} - {surah.surah_name}
              </option>
            ))}
          </select>
        </div>

        {selectedSurah && (
          <Link
            href={`/surah/${selectedSurah}`}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition mt-4 block text-center"
          >
            দেখুন
          </Link>
        )}
      </div>

    </div>
  );
};

export default HomePage;
