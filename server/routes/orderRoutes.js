const express = require('express');
const orderController = require('../controllers/orderController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

// Toutes les routes nécessitent une authentification
router.use(protect);

// Routes pour tous les utilisateurs connectés
router.post('/', orderController.createOrder);
router.get('/myOrders', orderController.getMyOrders);
router.get('/:id', orderController.getOrder);

// Routes pour les administrateurs uniquement
router.use(restrictTo('admin'));

router.get('/', orderController.getAllOrders);
router.patch('/:id', orderController.updateOrderStatus);
router.get('/stats/overview', orderController.getOrderStats);

// Webhook pour les systèmes de paiement (sécurisé différemment en production)
router.post('/webhook/payment', orderController.checkPaymentStatus);

module.exports = router;
