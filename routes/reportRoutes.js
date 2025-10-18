const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// GET semua laporan transaksi
router.get('/', reportController.getReport);

// GET filter laporan berdasarkan tanggal
router.get('/filter', reportController.filterReport);

module.exports = router;
