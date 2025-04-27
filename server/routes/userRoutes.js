const express = require('express');
const authController = require('../controllers/authController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes publiques
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Routes protégées (utilisateur connecté)
router.use(protect);

router.get('/me', authController.getMe);
router.patch('/updateMyPassword', authController.updatePassword);

module.exports = router;
