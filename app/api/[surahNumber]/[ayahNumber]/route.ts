import { NextResponse } from "next/server";

export const runtime = "edge";
const AYAH_API_BASE = "https://api.alquran.cloud/v1/ayah";

export async function GET(
  request: Request,
  { params }: { params: { surahNumber: string; ayahNumber: string } }
) {
  const { surahNumber, ayahNumber } = params;

  // Validate the surah and ayah numbers
  const surahNum = parseInt(surahNumber);

  if (surahNum < 1 || surahNum > 114) {
    return NextResponse.json(
      { error: "Invalid Surah number" },
      { status: 400 }
    );
  }

  try {
    // Fetch Ayah data from the external API
    const response = await fetch(
      `${AYAH_API_BASE}/${surahNumber}:${ayahNumber}/bn.bengali`
    );
    const ayahData = await response.json();

    if (ayahData.code !== 200) {
      return NextResponse.json({ error: "Ayah not found" }, { status: 404 });
    }

    // Construct the audio link for the ayah
    const ayahWithAudio = {
      surahName: ayahData.data.surah.englishName,
      surahNumber: ayahData.data.surah.number,
      revelationType: ayahData.data.surah.revelationType,
      ayahNumber: ayahData.data.number,
      text: ayahData.data.text,
      audio: `/audio/bangla/${surahNumber}-${ayahData.data.numberInSurah}.mp3`,
    };

    return NextResponse.json(ayahWithAudio);
  } catch {
    return NextResponse.json(
      { error: "An error occurred while fetching data" },
      { status: 500 }
    );
  }
}
