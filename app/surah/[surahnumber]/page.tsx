"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { SurahData } from "@/app/types/surah";
import AyahView from "@/app/components/AyahView";
import AudioPlayer from "@/app/components/AudioPlayer";

const SurahPage = ({ params }: { params: { surahnumber: string } }) => {
  const surahNumber = params.surahnumber;
  const [surah, setSurah] = useState<SurahData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentAyahIndex, setCurrentAyahIndex] = useState<number>(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const fetchSurahData = async () => {
      try {
        const response = await fetch(`/api/${surahNumber}`);
        if (!response.ok) throw new Error("Failed to fetch Surah data");
        const data: SurahData = await response.json();
        setSurah(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchSurahData();
  }, [surahNumber]);

  const playAyah = async (index: number) => {
    if (!surah) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    setCurrentAyahIndex(index);
    const ayahAudio = new Audio(surah.ayah[index].audio);
    audioRef.current = ayahAudio;
    ayahAudio.volume = volume;

    ayahAudio.onended = () => {
      if (index < surah.ayah.length - 1) {
        playAyah(index + 1);
      } else {
        setIsPlaying(false);
      }
    };

    await ayahAudio.play();
    setIsPlaying(true);

    // Scroll the ayah into view (handled by AyahView)
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      playAyah(currentAyahIndex);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    };
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-xl text-gray-600">লোড হচ্ছে...</div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-xl text-red-600">{error}</div>
    </div>
  );

  if (!surah) return null;

  function convertToBengaliNumerals(surah_number: string): string {
    const bnNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return surah_number
      .split('')
      .map(digit => bnNumerals[parseInt(digit, 10)])
      .join('');
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 bg-white shadow-md z-10 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-blue-500 hover:text-blue-600 transition px-4 py-2 rounded-lg hover:bg-blue-50"
          >
            বাড়ি
          </Link>
          <div className="text-center">
            <h1 className="text-3xl text-black font-bold mb-1">{surah.surah_name}</h1>
            <div className="text-black">
              সূরা নং {convertToBengaliNumerals(surah.surah_number.toString())} |আয়াত সংখ্যাঃ{convertToBengaliNumerals(surah.total_ayahs.toString())}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 mb-24">
        <div className="space-y-8">
          {surah.ayah.map((ayah, index) => (
            <AyahView
              key={index}
              ayahData={ayah}
              ayahNumber={index + 1}
              isPlaying={isPlaying && currentAyahIndex === index}
              isActive={currentAyahIndex === index}
              onPlay={() => playAyah(index)}
            />
          ))}
        </div>
      </main>

      {/* Audio Player */}
      <AudioPlayer
        isPlaying={isPlaying}
        currentAyah={currentAyahIndex}
        totalAyahs={surah.total_ayahs}
        surahNumber={surah.surah_number}
        volume={volume}
        onPlayPause={handlePlayPause}
        onPrevious={() => currentAyahIndex > 0 && playAyah(currentAyahIndex - 1)}
        onNext={() => currentAyahIndex < surah.total_ayahs - 1 && playAyah(currentAyahIndex + 1)}
        onVolumeChange={handleVolumeChange}
      />
    </div>
  );
};

export const runtime = "edge";

export default SurahPage;
