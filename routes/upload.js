require("dotenv").config(); // Memuat variabel lingkungan dari .env file
const express = require("express");
const multer = require("multer");
const { uploadImage } = require("../controllers/uploadController");
const router = express.Router();

// Konfigurasi multer untuk menyimpan file dalam memori
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Maksimum 10MB
});

// Route untuk upload gambar
router.post("/", upload.single("image"), uploadImage);

module.exports = router;
