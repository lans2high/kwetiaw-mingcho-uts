const db = require('../config/db');

/**
 * GET /menu/list
 * Ambil semua data menu
 */
exports.getAllMenu = (req, res) => {
  const query = 'SELECT * FROM ms_menu';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Gagal mengambil data menu');
    }
    res.json(results);
  });
};

/**
 * POST /menu/add
 * Tambah menu baru
 */
exports.addMenu = (req, res) => {
  const { nama, harga, kategori } = req.body;

  if (!nama || !harga || !kategori) {
    return res.status(400).send('Semua field wajib diisi');
  }

  const query = 'INSERT INTO ms_menu (nama, harga, kategori) VALUES (?, ?, ?)';
  db.query(query, [nama, harga, kategori], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Gagal menambahkan menu');
    }
    res.send('✅ Menu berhasil ditambahkan');
  });
};

/**
 * POST /menu/update/:id
 * Update data menu
 */
exports.updateMenu = (req, res) => {
  const { id } = req.params;
  const { nama, harga, kategori } = req.body;

  if (!nama || !harga || !kategori) {
    return res.status(400).send('Semua field wajib diisi');
  }

  const query = 'UPDATE ms_menu SET nama = ?, harga = ?, kategori = ? WHERE id = ?';
  db.query(query, [nama, harga, kategori, id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Gagal mengupdate menu');
    }
    res.send('✅ Menu berhasil diperbarui');
  });
};

/**
 * GET /menu/delete/:id
 * Hapus menu
 */
exports.deleteMenu = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM ms_menu WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Gagal menghapus menu');
    }
    res.send('✅ Menu berhasil dihapus');
  });
};
