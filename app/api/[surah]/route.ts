import { NextResponse } from "next/server";
import surahData from "@/public/data/surah.json";

interface Ayah {
  img: string;
  audio: string;
}

interface Surah {
  surah_number: string;
  surah_name: string;
  total_ayahs: number;
  ayah: Ayah[];
}

export async function GET(
  req: Request,
  context: { params: { surah: string } }
) {
  // Ensure that params is awaited and processed correctly
  const surah_number = context.params.surah;

  // Find the surah based on the requested surah number
  const surah = surahData.find((s) => s.surah_number === surah_number);

  if (!surah) {
    return NextResponse.json({ error: "Surah not found" }, { status: 404 });
  }

  // Generate the ayah data with image and audio for each ayah
  const ayahData: Ayah[] = [];

  for (let i = 1; i <= surah.total_ayahs; i++) {
    const imgPath = `/imgs/bangla/${surah_number}-${i}.png`;
    const audioPath = `/audio/bangla/${surah_number}-${i}.mp3`;

    // Add the Ayah data directly without nesting
    ayahData.push({
      img: imgPath,
      audio: audioPath,
    });
  }

  // Return the Surah details along with ayah data
  const response: Surah = {
    surah_number: surah.surah_number,
    surah_name: surah.surah_name,
    total_ayahs: surah.total_ayahs,
    ayah: ayahData,
  };

  return NextResponse.json(response);
}
