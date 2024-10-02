"use client"; // Ensure that this component runs on the client side

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
    <div className="min-h-screen text-black flex flex-col items-center justify-center bg-gray-50 p-10">
      <h1 className="text-3xl font-bold mb-5">কোরআনের সূরা নির্বাচন করুন</h1>

      <div className="mb-5">
        <label htmlFor="surah-select" className="block text-lg mb-2">
          সূরা সংখ্যা ও নাম নির্বাচন করুন:
        </label>
        <select
          id="surah-select"
          value={selectedSurah || ""}
          onChange={(e) => setSelectedSurah(parseInt(e.target.value, 10))}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
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
          href={`/surah/${selectedSurah}`} // Direct link to Surah page
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          দেখুন
        </Link>
      )}
    </div>
  );
};

export default HomePage;
