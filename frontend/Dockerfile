# Menggunakan image Node.js
FROM node:16

# Set working directory
WORKDIR /app

# Menyalin package.json dan package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Menginstal dependensi
RUN npm install

# Menyalin semua file
COPY . .

# Menjalankan aplikasi dalam mode pengembangan
CMD ["npm", "run", "dev", "--", "--host"]