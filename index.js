const express = require("express");
const app = express();
const uploadRouter = require("./routes/upload"); // Impor router upload
const port = 3000;

// Gunakan route upload di aplikasi Express
app.use("/upload", uploadRouter); // <-- Pastikan ini benar

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
