# Quran Audio in Bangla 🎧📖

> [!WARNING]
> ## 🚧 This repository is archived
>
> This project is no longer actively maintained.
>
> I have redesigned the backend, and the new API is available at **https://quran.sayed.app/docs**.
>
> **Android, macOS, and Linux builds are on the way.**
>
> ### Microsoft Store
>
> <a href="https://apps.microsoft.com/detail/9n3gsz7v18zp?referrer=appbadge&mode=full" target="_blank" rel="noopener noreferrer">
>   <img src="https://get.microsoft.com/images/en-us%20light.svg" width="200"/>
> </a>


Welcome to the **Quran Audio in Bangla** project! This repository is created to help you listen to the Quran in Bangla without needing to go to YouTube every time. Enjoy the divine words of Allah with ease and convenience!

## Features 🌟

- 🎧 Listen to Quranic verses in Bangla
- 📱 Easy access through simple API endpoints
- 📝 Audio and text data sourced from reliable platforms

## API Endpoints 📡

### Get Ayah Audio

- **Endpoint:** `/api/[surahnumber]`
- **Example Request:** `/api/1`
- **Example Response:**

```json
{
  "surah_number": "1",
  "surah_name": "আল ফাতিহা",
  "total_ayahs": 7,
  "ayah": [
    { "img": "/imgs/bangla/1-1.png", "audio": "/audio/bangla/1-1.mp3" },
    { "img": "/imgs/bangla/1-2.png", "audio": "/audio/bangla/1-2.mp3" },
    { "img": "/imgs/bangla/1-3.png", "audio": "/audio/bangla/1-3.mp3" },
    { "img": "/imgs/bangla/1-4.png", "audio": "/audio/bangla/1-4.mp3" },
    { "img": "/imgs/bangla/1-5.png", "audio": "/audio/bangla/1-5.mp3" },
    { "img": "/imgs/bangla/1-6.png", "audio": "/audio/bangla/1-6.mp3" },
    { "img": "/imgs/bangla/1-7.png", "audio": "/audio/bangla/1-7.mp3" }
  ]
}
```

## Acknowledgments 🙏

- **Audio and Images from:** [Quran.Gov.BD](http://www.quran.gov.bd/)
  
A heartfelt thank you to those who made this content available. **Jazakallahu Khair!**

## Support 🤲

Please pray for me; it would be the best donation for my efforts.

## Windows Store version
 <a href="https://apps.microsoft.com/detail/9n3gsz7v18zp?referrer=appbadge&mode=direct">
	<img src="https://get.microsoft.com/images/en-us%20dark.svg" width="200"/>
</a>
