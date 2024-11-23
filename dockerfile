# Menggunakan Node.js sebagai base image
FROM node:16

# Set working directory dalam container
WORKDIR /usr/src/app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh file aplikasi ke dalam container
COPY . .

# Expose port yang digunakan oleh aplikasi
EXPOSE 8080  

# Jalankan aplikasi saat container dimulai
CMD ["node", "index.js"]
