// types/surah.ts
export interface Surah {
  surah_number: string;
  surah_name: string;
  total_ayahs: number;
  bangla_name: string;
  english_name: string;
}

export interface AyahData {
  img: string;
  audio: string;
}

export interface SurahData {
  surah_number: string;
  surah_name: string;
  total_ayahs: number;
  ayah: AyahData[];
}
