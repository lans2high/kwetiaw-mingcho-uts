const db = require('../config/db');

/**
 * GET /report
 * Ambil semua transaksi
 */
exports.getReport = (req, res) => {
  const query = `
    SELECT o.id, o.customer_name, m.nama AS menu, o.qty, o.total, o.order_date
    FROM orders o
    JOIN ms_menu m ON o.menu_id = m.id
    ORDER BY o.order_date DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Gagal mengambil laporan');
    }
    res.json(results);
  });
};

/**
 * GET /report/filter?start=YYYY-MM-DD&end=YYYY-MM-DD
 * Filter laporan berdasarkan tanggal
 */
exports.filterReport = (req, res) => {
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).send('Tanggal mulai dan akhir wajib diisi');
  }

  const query = `
    SELECT o.id, o.customer_name, m.nama AS menu, o.qty, o.total, o.order_date
    FROM orders o
    JOIN ms_menu m ON o.menu_id = m.id
    WHERE DATE(o.order_date) BETWEEN ? AND ?
    ORDER BY o.order_date DESC
  `;

  db.query(query, [start, end], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Gagal memfilter laporan');
    }
    res.json(results);
  });
};
