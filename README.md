# Quran Audio in Bangla 🎧📖

Welcome to the **Quran Audio in Bangla** project! This repository is created to help you listen to the Quran in Bangla without needing to go to YouTube every time. Enjoy the divine words of Allah with ease and convenience!

## Features 🌟

- Listen to Quranic verses in Bangla
- Easy access through simple API endpoints
- Audio and text data sourced from reliable platforms

## API Endpoints 📡

1. **Get Ayah Audio**

   - Endpoint: `/api/[surahnumber][ayahnumber]`
   - Example Request: `/api/1/4`
   - Example Response:

   ```json
   {
     "surahName": "Al-Faatiha",
     "surahNumber": 1,
     "revelationType": "Meccan",
     "ayahNumber": 4,
     "text": "যিনি বিচার দিনের মালিক।",
     "audio": "/audio/bangla/1-4.mp3"
   }
   ```

2. **Get Surah Details**
   - Endpoint: `/api/surah/[surahnumber]`
   - Example Request: `/api/surah/114`
   - Example Response:
   ```json
   {
     "surahName": "Al-Faatiha",
     "surahNumber": 1,
     "numberofAyahs": 7,
     "revelationType": "Meccan",
     "ayahs": [
       {
         "number": 1,
         "text": "শুরু করছি আল্লাহর নামে যিনি পরম করুণাময়, অতি দয়ালু।",
         "audio": "/audio/bangla/1-1.mp3"
       },
       // More ayahs here...
       {
         "number": 7,
         "text": "সে সমস্ত লোকের পথ, যাদেরকে তুমি নেয়ামত দান করেছ। তাদের পথ নয়, যাদের প্রতি তোমার গজব নাযিল হয়েছে এবং যারা পথভ্রষ্ট হয়েছে।",
         "audio": "/audio/bangla/1-7.mp3"
       }
     ]
   }
   ```

## Acknowledgments 🙏

- Audio from: [Quran.Gov.BD](http://www.quran.gov.bd/)
- Text from: [Al-Quran Cloud API](https://alquran.cloud/api)

A heartfelt thank you to those who made this content available. Jazakallahu Khair!

## Support 🤲

Please pray for me; it would be the best donation for my efforts.
