const db = require('../config/db');

/**
 * POST /auth/login
 */
exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username dan password wajib diisi');
  }

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Terjadi kesalahan pada server');
    }

    if (results.length === 0) {
      return res.status(401).send('Username atau password salah');
    }

    const user = results[0];

    // Simpan user ke session
    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role
    };

    // Arahkan ke halaman admin utama
    res.redirect('/admin/main.html');
  });
};

/**
 * GET /auth/logout
 */
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin/login.html');
  });
};

exports.register = (req, res) => {
    const { username, password, role } = req.body;
  
    if (!username || !password) {
      return res.status(400).send('Username dan password wajib diisi');
    }
  
    const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    const userRole = role || 'admin'; // default admin
  
    db.query(query, [username, password, userRole], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Gagal menambahkan user');
      }
      res.send('✅ Akun admin baru berhasil ditambahkan');
    });
  };
  
