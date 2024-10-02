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
       "code": 200,
       "status": "OK",
       "data": {
           "number": 114,
           "name": "سُورَةُ النَّاسِ",
           "englishName": "An-Naas",
           "englishNameTranslation": "Mankind",
           "revelationType": "Meccan",
           "numberOfAyahs": 6,
           "ayahs": [
               {
                   "number": 6231,
                   "text": "বলুন, আমি আশরাফ গরহানে করিতেছি মানুষের পালানকর্তা।",
                   "numberInSurah": 1,
                   "juz": 30,
                   "manzil": 7,
                   "page": 604,
                   "ruku": 556,
                   "hizbQuarter": 240,
                   "sajda": false
               },
               // More ayahs here...
           ],
           "edition": {
               "identifier": "bn.bengali",
               "language": "bn",
               "name": "মুহিউদ্দীন খান",
               "englishName": "Muhiuddin Khan",
               "format": "text",
               "type": "translation",
               "direction": "ltr"
           }
       }
   }
   ```

## Acknowledgments 🙏

- Audio from: [Quran.Gov.BD](http://www.quran.gov.bd/)
- Text from: [Al-Quran Cloud API](https://alquran.cloud/api)

A heartfelt thank you to those who made this content available. Jazakallahu Khair! 

## Support 🤲

Please pray for me; it would be the best donation for my efforts.