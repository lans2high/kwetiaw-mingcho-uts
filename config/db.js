const mysql = require('mysql2');
require('dotenv').config();

// Buat koneksi ke MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Coba koneksi
db.connect((err) => {
  if (err) {
    console.error('❌ Gagal koneksi ke MySQL:', err.message);
  } else {
    console.log('✅ Berhasil terkoneksi ke database MySQL');
  }
});

module.exports = db;
