const express = require('express');
const ebookController = require('../controllers/ebookController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes publiques
router.get('/', ebookController.getAllEbooks);
router.get('/featured', ebookController.getFeaturedEbooks);
router.get('/new-releases', ebookController.getNewReleases);
router.get('/categories', ebookController.getCategories);
router.get('/category/:category', ebookController.getEbooksByCategory);
router.get('/ebook/:ebookId', ebookController.getEbookByEbookId);
router.get('/:id', ebookController.getEbook);

// Routes protégées (admin uniquement)
router.use(protect);
router.use(restrictTo('admin'));

router.post('/', ebookController.createEbook);
router.patch('/:id', ebookController.updateEbook);
router.delete('/:id', ebookController.deleteEbook);
router.post('/import', ebookController.importEbooksFromJson);

module.exports = router;
