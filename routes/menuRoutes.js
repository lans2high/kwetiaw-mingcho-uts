const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// GET semua menu
router.get('/list', menuController.getAllMenu);

// Tambah menu (POST)
router.post('/add', menuController.addMenu);

// Update menu (POST)
router.post('/update/:id', menuController.updateMenu);

// Hapus menu (GET)
router.get('/delete/:id', menuController.deleteMenu);

module.exports = router;
