"use client";
import React, { useRef } from "react";

interface AyahProps {
  ayahNumber: number;
  text: string;
  audio: string;
}

const Ayah: React.FC<AyahProps> = ({ ayahNumber, text, audio }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Optional: Automatically play audio when the component mounts (if desired)
  // You can uncomment this if you want to play audio immediately when the Ayah renders
  // useEffect(() => {
  //   if (audioRef.current) {
  //     audioRef.current.play();
  //   }
  // }, []);

  return (
    <div className="bg-white text-black p-5 rounded-lg shadow-md mb-5 flex justify-between items-center">
      <div className="flex-1">
        <p className="text-lg mb-2">{text}</p>
        <p className="text-sm text-gray-600 mt-2">আয়াত নম্বর: {ayahNumber}</p>
        <audio ref={audioRef} src={audio} />
      </div>
      {/* The audio button is removed */}
    </div>
  );
};

export default Ayah;
