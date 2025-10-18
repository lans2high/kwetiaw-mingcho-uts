require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

// Middleware parsing body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session (kalau kamu pakai login)
app.use(session({
  secret: process.env.SESSION_SECRET || 'rahasia',
  resave: false,
  saveUninitialized: false
}));

// 1️⃣ Serve static assets (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// 2️⃣ Serve file HTML public (ini potongan yang kamu kirim)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'public', 'index.html'));
});

app.get('/menu.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'public', 'menu.html'));
});

app.get('/order.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'public', 'order.html'));
});

app.get('/about.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'public', 'about.html'));
});

app.get('/contact.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'public', 'contact.html'));
});

// === Serve halaman Admin ===
app.get('/admin/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin', 'login.html'));
});

app.get('/admin/main.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin', 'main.html'));
});

app.get('/admin/master-menu.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin', 'master-menu.html'));
});

app.get('/admin/orders-admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin', 'orders-admin.html'));
});

app.get('/admin/report.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin', 'report.html'));
});

// 3️⃣ (Optional) Routes backend (Auth, Menu, Report)
app.use('/auth', require('./routes/authRoutes'));
app.use('/menu', require('./routes/menuRoutes'));
app.use('/report', require('./routes/reportRoutes'));

// 4️⃣ Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
