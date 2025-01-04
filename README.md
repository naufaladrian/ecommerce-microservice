# E-commerce Microservices

Proyek ini adalah aplikasi e-commerce yang dibangun dengan arsitektur microservices menggunakan Node.js, Express, PostgreSQL, dan SvelteKit. Aplikasi ini terdiri dari beberapa layanan, termasuk layanan produk, keranjang, pesanan, dan API Gateway.

## Daftar Isi

- [Fitur](#fitur)
- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Penggunaan](#penggunaan)
- [Struktur Proyek](#struktur-proyek)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

## Fitur

- Menambahkan, melihat, dan mengelola produk.
- Menambahkan item ke keranjang.
- Membuat pesanan dari keranjang.
- Antarmuka pengguna yang responsif menggunakan SvelteKit.

## Prasyarat

Sebelum memulai, pastikan Anda memiliki hal berikut:

- [Node.js](https://nodejs.org/) (versi 16 atau lebih baru)
- [Docker](https://www.docker.com/) dan [Docker Compose](https://docs.docker.com/compose/)
- [PostgreSQL](https://www.postgresql.org/) (jika tidak menggunakan Docker)

## Instalasi

1. **Clone Repository**:

   ```bash
   git clone https://github.com/USERNAME/ecommerce-microservices.git
   cd ecommerce-microservices
   ```

2. Menjalankan Layanan dengan Docker:

Pastikan Anda berada di direktori proyek dan jalankan perintah berikut untuk membangun dan menjalankan semua layanan:

```bash
docker-compose up --build
```

Ini akan menjalankan semua layanan (produk, keranjang, pesanan, API Gateway) di dalam kontainer Docker.

3. Menjalankan Frontend Secara Terpisah:

Jika Anda ingin menjalankan frontend SvelteKit secara terpisah, navigasi ke folder frontend dan jalankan:

```bash
cd frontend
npm install
npm run dev
```

Frontend akan berjalan di http://localhost:5173.
