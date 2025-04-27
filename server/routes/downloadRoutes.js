const express = require('express');
const downloadController = require('../controllers/downloadController');
const { protect, isOwnerOrAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Route publique pour valider et télécharger via token unique
router.get('/validate/:token', downloadController.validateDownloadToken);
router.get('/download/:token', downloadController.downloadEbook);

// Routes protégées (utilisateur connecté)
router.use(protect);

router.post('/', downloadController.createDownloadLink);
router.get('/my-downloads', downloadController.getUserDownloads);
router.get('/:id', isOwnerOrAdmin, downloadController.getDownload);
router.patch('/:id/disable', isOwnerOrAdmin, downloadController.disableDownload);
router.post('/regenerate/:orderId', downloadController.regenerateDownloadLinks);

module.exports = router;
