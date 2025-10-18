const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login (POST)
router.post('/login', authController.login);

// Logout (GET)
router.get('/logout', authController.logout);

// Route register admin
router.post('/register', authController.register);

module.exports = router;
