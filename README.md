# LayarFilm

LayarFilm adalah platform streaming film dan serial TV modern dengan antarmuka yang elegan, cepat, dan responsif. Dirancang dengan estetika Premium Dark Mode dan Glassmorphism untuk memberikan pengalaman menonton bioskop dari rumah Anda.

---

## Fitur Unggulan

- Pencarian Cerdas: Temukan ribuan film dan serial dengan pencarian instan.
- Detail Lengkap: Metadata akurat termasuk Sinopsis, Rating, Daftar Pemain (Cast), hingga Sutradara.
- Multi-Server Player: Pilihan berbagai server streaming (P2P, TurboVIP, dll) untuk memastikan kelancaran pemutaran.
- Responsive Design: Nyaman diakses dari perangkat mobile, tablet, maupun desktop.
- Scraper Tangguh: Terintegrasi dengan mirror terbaru (tv3.lk21online.mom) menggunakan logika JSON-LD parsing untuk data yang lebih valid.

---

## Teknologi (Tech Stack)

### Frontend
- React 19 & TypeScript
- Vite (Build Tool super cepat)
- TailwindCSS (Modern Styling)
- Lucide React (Icons)
- SWR (Data Fetching & Caching)

### Backend (lk21-api)
- Node.js & Express
- Cheerio (High-performance HTML parsing)
- TypeScript (Type-safe codebase)
- Native Fetch API (Reliable network requests)

---

## Cara Menjalankan Project

### 1. Prasyarat
Pastikan Anda sudah menginstal Node.js.

### 2. Menjalankan Backend (API)
```bash
cd lk21-api
npm install
npm start
```
*API akan berjalan di http://localhost:3000*

### 3. Menjalankan Frontend
```bash
# Kembali ke folder root
npm install
npm run dev
```
*Aplikasi akan berjalan di http://localhost:5174*

---

## Struktur Project

```text
LayarFilm/
├── lk21-api/          # Backend Node.js API
│   ├── src/
│   │   ├── scrapers/  # Logika ekstraksi data LK21
│   │   └── controllers/
│   └── dist/          # Build output
├── src/               # Frontend React Source
│   ├── components/
│   ├── pages/
│   └── services/      # API Integration
└── public/            # Static Assets
```

---

## Catatan Sampingan
Proyek ini dibuat untuk tujuan edukasi. Seluruh konten film bersumber dari pihak ketiga melalui metode web scraping.

Dibuat oleh: uznbt (Senior Frontend Engineer)

Copyright 2026 LayarFilm. All rights reserved.