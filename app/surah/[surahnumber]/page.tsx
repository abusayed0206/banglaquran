"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image"; // Import Next.js Image component

// Define the AyahData and SurahData types to match your API structure
interface AyahData {
  img: string;
  audio: string;
}

interface SurahData {
  surahName: string;
  surahNumber: number;
  totalAyahs: number;
  ayah: AyahData[];
}

// SurahPage Component
const SurahPage = ({ params }: { params: { surahnumber: string } }) => {
  const surahNumber = parseInt(params.surahnumber, 10);

  // States for storing Surah data and loading states
  const [surah, setSurah] = useState<SurahData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentAyahIndex, setCurrentAyahIndex] = useState<number>(0);

  // Fetch Surah data
  useEffect(() => {
    const fetchSurahData = async () => {
      try {
        const response = await fetch(
          `/api/${surahNumber}`
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
        // Play the current Ayah audio and move through all Ayahs
        const ayahAudio = new Audio(surah.ayah[currentAyahIndex].audio);
        audioRef.current = ayahAudio;
        await ayahAudio.play();
        ayahAudio.onended = () => {
          if (currentAyahIndex < surah.ayah.length - 1) {
            setCurrentAyahIndex(currentAyahIndex + 1);
            handlePlayPause(); // Automatically play the next Ayah after current ends
          } else {
            setIsPlaying(false); // Stop when all Ayahs have been played
          }
        };
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
            <h2 className="text-2xl font-bold">{surah.surahName}</h2>
            <p className="text-lg text-gray-600">সূরা নম্বর: {surah.surahNumber}</p>
            <p className="text-lg text-gray-600">আয়াত সংখ্যা: {surah.totalAyahs}</p>
          </div>

          <div className="bg-gray-200 text-black p-4 rounded mb-5 flex flex-col items-center justify-center w-full max-w-md">
            <button
              onClick={handlePlayPause}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mt-2"
            >
              {isPlaying ? "বন্ধ করুন" : "শুনুন"}
            </button>
          </div>

          <div className="w-full max-w-md">
            {surah.ayah.map((ayah, index) => (
              <div
                key={index}
                className="bg-white text-black p-4 rounded-lg shadow-md mb-4"
              >
                {/* Use Next.js Image component for better optimization */}
                <Image
                  src={ayah.img}
                  alt={`Ayah ${index + 1}`}
                  width={500} // Set a consistent width for all images
                  height={300} // Set a numeric height value
                  className="w-full h-auto rounded mb-2"
                />
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
