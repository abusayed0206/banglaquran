import { NextResponse } from "next/server";

const QURAN_API_BASE = "https://api.alquran.cloud/v1/surah";

export async function GET(
  request: Request,
  { params }: { params: { surahNumber: string } }
) {
  const { surahNumber } = params;

  // Validate surah number
  const surahNum = parseInt(surahNumber);
  if (surahNum < 1 || surahNum > 114) {
    return NextResponse.json(
      { error: "Invalid Surah number" },
      { status: 400 }
    );
  }

  try {
    // Fetch Surah data from external API
    const response = await fetch(`${QURAN_API_BASE}/${surahNumber}/bn.bengali`);
    const surahData = await response.json();

    if (surahData.code !== 200) {
      return NextResponse.json({ error: "Surah not found" }, { status: 404 });
    }

    // Construct the audio links for each ayah
    interface Ayah {
      number: number;
      text: string;
      numberInSurah: number;
    }

    const ayahsWithAudio = surahData.data.ayahs.map((ayah: Ayah) => ({
      number: ayah.number,
      text: ayah.text,
      audio: `/audio/bangla/${surahNumber}-${ayah.numberInSurah}.mp3`,
    }));

    // Respond with the Surah name and Ayahs with Audio links
    const responseData = {
      surahName: surahData.data.englishName,
      surahNumber: surahData.data.number,
      numberofAyahs: surahData.data.numberOfAyahs,
      revelationType: surahData.data.revelationType,
      ayahs: ayahsWithAudio,
    };

    return NextResponse.json(responseData);
  } catch {
    return NextResponse.json(
      { error: "An error occurred while fetching data" },
      { status: 500 }
    );
  }
}
