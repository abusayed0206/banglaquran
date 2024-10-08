"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";

// Define the AyahData and SurahData types to match your API structure
interface AyahData {
  number: number;
  text: string;
  audio: string;
}

interface SurahData {
  surahName: string;
  surahNumber: number;
  numberofAyahs: number;
  revelationType: string;
  ayahs: AyahData[];
}

interface SurahName {
  surah_number: number;
  surah_name: string;
}

// SurahPage Component
const SurahPage = ({ params }: { params: { surahnumber: string } }) => {
  const surahNumber = parseInt(params.surahnumber, 10);

  // States for storing Surah data and loading states
  const [surah, setSurah] = useState<SurahData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [surahs, setSurahs] = useState<SurahName[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Fetch Surah names
  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch("/data/surah.json");
        if (!response.ok) {
          throw new Error("Failed to fetch Surah names");
        }
        const data: SurahName[] = await response.json();
        setSurahs(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSurahs();
  }, []);

  // Fetch Surah data
  useEffect(() => {
    const fetchSurahData = async () => {
      try {
        const response = await fetch(
          `https://banglaquran.pages.dev/api/surah/${surahNumber}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Surah data");
        }
        const data: SurahData = await response.json();
        setSurah(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSurahData();
  }, [surahNumber]);

  // Function to handle play/pause functionality
  const handlePlayPause = async () => {
    if (surah) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        for (let i = 0; i < surah.ayahs.length; i++) {
          audioRef.current = new Audio(surah.ayahs[i].audio);
          await audioRef.current.play();
          await new Promise((resolve) => {
            audioRef.current!.onended = resolve;
          });
        }
        setIsPlaying(true);
      }
    }
  };

  // Stop audio on component unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    };
  }, []);

  // Function to convert English numbers to Bengali numbers
  const translateToBengaliNumbers = (num: number): string => {
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num
      .toString()
      .split("")
      .map((digit) => bengaliDigits[parseInt(digit)])
      .join("");
  };

  // Loading and error handling
  if (loading) return <div className="text-center">লোড হচ্ছে...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-50">
      <Link href="/" className="mb-4 text-blue-500 hover:underline">
        বাড়ি
      </Link>
      {surah && (
        <>
          <div className="bg-white text-black shadow-md rounded-lg mb-5 p-4 w-full max-w-md text-center">
            <h2 className="text-2xl font-bold">
              {surahs.find((s) => s.surah_number === surah.surahNumber)
                ?.surah_name || surah.surahName}
            </h2>
            <p className="text-lg text-gray-600">
              সূরা নম্বর: {translateToBengaliNumbers(surah.surahNumber)}
            </p>
            <p className="text-lg text-gray-600">
              প্রকাশের ধরন: {surah.revelationType}
            </p>
            <p className="text-lg text-gray-600">
              আয়াত সংখ্যা: {translateToBengaliNumbers(surah.numberofAyahs)}
            </p>
          </div>

          <div className="bg-gray-200 text-black p-4 rounded mb-5 flex flex-col items-center justify-center w-full max-w-md">
            <p className="text-lg text-center">
              بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
            </p>
            <button
              onClick={handlePlayPause}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mt-2"
            >
              {isPlaying ? "বন্ধ করুন" : "শুনুন"}
            </button>
          </div>

          <div className="w-full max-w-md">
            {surah.ayahs.map((ayah, index) => (
              <div
                key={index}
                className="bg-white text-black p-4 rounded-lg shadow-md mb-4"
              >
                <p className="text-lg mb-2">{ayah.text}</p>
                <p className="text-sm text-gray-600 mt-2">
                  আয়াত নম্বর: {translateToBengaliNumbers(ayah.number)}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Specify that this component should run in the Edge runtime
export const runtime = "edge";

export default SurahPage;
