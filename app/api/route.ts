import { NextResponse } from "next/server";
import surahData from "@/public/data/surah.json";

interface SurahListItem {
  surah_number: string;
  surah_name: string;
  total_ayahs: number;
}

export async function GET(req: Request) {
  // Build a clean, lightweight list: just surah number, name, and ayah count
  const surahList: SurahListItem[] = surahData.map((s) => ({
    surah_number: s.surah_number,
    surah_name: s.surah_name,
    total_ayahs: s.total_ayahs,
  }));

  const response = {
    total_surahs: surahList.length,
    surahs: surahList,
  };

  const nextResponse = NextResponse.json(response);

  // Set CORS headers for cross-origin requests
  nextResponse.headers.set("Access-Control-Allow-Origin", "*"); // Use a specific origin in production for security
  nextResponse.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  nextResponse.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // Handle preflight OPTIONS requests
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: nextResponse.headers,
    });
  }

  return nextResponse;
}

export const runtime = "edge";
