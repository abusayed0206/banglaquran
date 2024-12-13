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

      {/* Second Section: Information About the App */}
      <div className="bg-white shadow-xl rounded-lg p-6 md:p-8 w-full mx-auto mb-12">
        <h2 className="text-3xl text-center sm:text-4xl font-semibold text-blue-800 mb-4">বাংলা কোরআন অডিও🎧📖</h2>
        <p className="text-lg sm:text-xl mb-6 text-gray-700">
          এটা বানাইছি শুধুমাত্র বাংলা ভাষায় কোরআন শরীফের অডিও শুনার জন্য। বারবার ইউটিউবে ঢুকে বাঙলা অডিও শুনতে হবে না। এটি একটি সহজ API এন্ডপয়েন্ট দিয়ে সহজেই অ্যাক্সেস করা যায়। ভবিষ্যতে এন্ড্রইয়েড এপ বানানোর ইচ্ছে আছে। 
        </p>

        <h3 className="text-2xl sm:text-3xl font-medium text-blue-600 mb-4">ফিচারসমূহ🌟</h3>
        <ul className="list-disc pl-6 mb-6 text-lg sm:text-xl text-gray-700">
          <li>বাঙলা তর্জমা দেখতে পারবেন এবং শুনতে পারবেন</li>
          <li>এপিআই এর মাধ্যমে যেকোন জায়গায় ব্যবহার করতে পারবেন</li>
          <li>কোন ধরনের এপিআই লিমিটেশন নেই</li>
          <li>সরকারি ওয়েবসাইট থেকে অডিও এবং তর্জমার ছবি সংগ্রহ করা হইছে</li>
        </ul>

        <p className="text-xl sm:text-2xl font-medium mb-4 text-gray-800">এপিআই উদাহরণ:</p>
        <p className="text-lg sm:text-xl mb-6 text-gray-600">
          Base URL: <span className="font-bold text-blue-600">https://banglaquran.pages.dev/</span>
        </p>
        উদাহরণ সূরার ইন্ডপয়েন্ট:
        <pre className="bg-gray-100 p-4 rounded-lg mb-6 text-sm sm:text-base overflow-x-auto">
          <code>{`api/1`}</code>
        </pre>
        <Link
          href="/api/1"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition mb-6 inline-block text-center"
        >
          Example Surah: /api/1
        </Link>

        <p className="text-lg sm:text-xl mb-6 text-gray-700">
          উদাহরণ সূরার তথ্য:
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg mb-6 text-sm sm:text-base overflow-x-auto">
          <code>{`{
    "surah_number": "1",
    "surah_name": "আল ফাতিহা",
    "total_ayahs": 7,
    "ayah": [
      {"img": "/imgs/bangla/1-1.png", "audio": "/audio/bangla/1-1.mp3"},
      {"img": "/imgs/bangla/1-2.png", "audio": "/audio/bangla/1-2.mp3"},
      {"img": "/imgs/bangla/1-3.png", "audio": "/audio/bangla/1-3.mp3"},
      {"img": "/imgs/bangla/1-4.png", "audio": "/audio/bangla/1-4.mp3"},
      {"img": "/imgs/bangla/1-5.png", "audio": "/audio/bangla/1-5.mp3"},
      {"img": "/imgs/bangla/1-6.png", "audio": "/audio/bangla/1-6.mp3"},
      {"img": "/imgs/bangla/1-7.png", "audio": "/audio/bangla/1-7.mp3"}
    ]
    }`}</code>
        </pre>

        <p className="text-lg sm:text-xl mb-4 text-gray-700">
          খুব শীঘ্রই এন্ড্রয়েড এপ আসবে ইনশাআল্লাহ।
        </p>

        <div className="flex items-center justify-center gap-4 mb-6">
          <img
            src="/fd.bmp"
            alt="FDroid Icon"
            width={100}
            className="rounded-sm"
          />
          <span className="text-lg sm:text-xl font-medium text-gray-800">এফড্রয়েড এ পাবেন খুব শীঘ্রই!</span>
        </div>

        {/* Acknowledgment Section */}
        <div className="  p-6 md:p-8 mb-12 w-full max-w-2xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-4">কৃতজ্ঞতা স্বীকার 🙏</h3>
          <p className="text-lg sm:text-xl text-gray-700 mb-6">
            অডীও ও তর্জমার ছবিঃ  <span className="font-semibold text-blue-500">quran.gov.bd</span>
          </p>

          <p className="text-xl sm:text-2xl font-medium text-gray-700">
            <span className="italic">Jazakallahu Khair!</span>
          </p>
        </div>
      </div>
    </div>


  );
};

export default HomePage;
