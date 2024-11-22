require("dotenv").config(); // Memuat variabel lingkungan dari .env file
const { Storage } = require("@google-cloud/storage");

// Menggunakan kredensial yang benar
const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, // Menggunakan variabel lingkungan
});

const bucketName = "item-uploaded-bucket"; // Ganti dengan nama bucket Anda

const uploadImage = async (req, res) => {
  console.log(req.file); // Cek apakah file diterima
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  try {
    const bucket = storage.bucket(bucketName);
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on("error", (err) => {
      console.error("Error uploading file:", err); // Menampilkan pesan error yang lebih spesifik
      return res.status(500).send("Error uploading file: " + err.message);
    });

    blobStream.on("finish", () => {
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
      return res.status(200).send({
        message: "File uploaded successfully",
        url: publicUrl,
      });
    });

    blobStream.end(req.file.buffer); // Upload file ke bucket
  } catch (error) {
    console.error("Error uploading file:", error); // Menampilkan pesan error yang lebih spesifik
    return res.status(500).send("Error uploading file: " + error.message);
  }
};

module.exports = { uploadImage };
