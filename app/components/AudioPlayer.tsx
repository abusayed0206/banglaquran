import { Play, Pause, SkipBack, SkipForward, Volume2, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface AudioPlayerProps {
    isPlaying: boolean;
    currentAyah: number;
    totalAyahs: number;
    surahNumber: string;
    volume: number;
    onPlayPause: () => void;
    onPrevious: () => void;
    onNext: () => void;
    onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AudioPlayer = ({
    isPlaying,
    currentAyah,
    totalAyahs,
    surahNumber,
    volume,
    onPlayPause,
    onPrevious,
    onNext,
    onVolumeChange,
}: AudioPlayerProps) => {
    const nextSurahNumber = parseInt(surahNumber) + 1;
    const prevSurahNumber = parseInt(surahNumber) - 1;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-50">
            <div className="max-w-7xl mx-auto px-4 py-1">
                <div className="grid grid-cols-3 items-center gap-4 md:gap-8">

                    {/* Volume Control - Left Side */}
                    <div className="flex items-center gap-2 col-span-3 md:col-span-1 justify-start">
                        <Volume2 className="w-5 h-5 text-gray-600" />
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={onVolumeChange}
                            className="w-full md:w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    {/* Main Controls - Centered on Desktop */}
                    <div className=" text-black flex items-center justify-center gap-4 col-span-3 md:col-span-1">
                        <button
                            onClick={onPrevious}
                            className="p-2 hover:bg-gray-100 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={currentAyah === 0}
                        >
                            <SkipBack className="w-5 h-5" />
                        </button>
                        <button
                            onClick={onPlayPause}
                            className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition"
                        >
                            {isPlaying ? (
                                <Pause className="w-6 h-6" />
                            ) : (
                                <Play className="w-6 h-6" />
                            )}
                        </button>
                        <button
                            onClick={onNext}
                            className="p-2 hover:bg-gray-100 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={currentAyah === totalAyahs - 1}
                        >
                            <SkipForward className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Surah Navigation - Right Side */}
                    <div className=" text-black flex flex-col md:flex-row items-center justify-end gap-4 col-span-3 md:col-span-1">
                        <div className="md:flex hidden flex-row items-center gap-2">
                            {prevSurahNumber > 0 && (
                                <Link
                                    href={`/surah/${prevSurahNumber}`}
                                    className="p-2 hover:bg-gray-100 rounded-full transition flex items-center gap-1"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                    <span className="text-sm">পূর্ববতী সূরা</span>
                                </Link>
                            )}
                            {nextSurahNumber <= 114 && (
                                <Link
                                    href={`/surah/${nextSurahNumber}`}
                                    className="p-2 hover:bg-gray-100 rounded-full transition flex items-center gap-1"
                                >
                                    <span className="text-sm">পরবর্তী সূরা</span>
                                    <ChevronRight className="w-5 h-5" />
                                </Link>
                            )}
                        </div>

                        {/* For mobile devices */}
                        <div className="md:hidden flex flex-row items-center justify-center gap-2">
                            {prevSurahNumber > 0 && (
                                <Link
                                    href={`/surah/${prevSurahNumber}`}
                                    className="p-2 hover:bg-gray-100 rounded-full transition flex items-center gap-1"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                    <span className="text-sm">পূর্ববতী সূরা</span>
                                </Link>
                            )}
                            {nextSurahNumber <= 114 && (
                                <Link
                                    href={`/surah/${nextSurahNumber}`}
                                    className="p-2 hover:bg-gray-100 rounded-full transition flex items-center gap-1"
                                >
                                    <span className="text-sm">পরবর্তী সূরা</span>
                                    <ChevronRight className="w-5 h-5" />
                                </Link>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
