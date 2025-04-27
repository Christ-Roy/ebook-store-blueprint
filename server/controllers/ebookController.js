const fs = require('fs');
const path = require('path');
const Ebook = require('../models/ebookModel');
const AppError = require('../utils/appError');

// HELPERS
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// Obtenir tous les ebooks (avec filtres, tri et pagination)
exports.getAllEbooks = async (req, res, next) => {
  try {
    // Construction de la requête
    let query = Ebook.find({ isActive: { $ne: false } });

    // 1) Filtrage
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Filtres avancés (price[gte]=25)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    query = query.find(JSON.parse(queryStr));

    // Recherche texte
    if (req.query.search) {
      query = query.find({
        $text: { $search: req.query.search },
      });
    }

    // Filtrage par catégorie
    if (req.query.category) {
      query = query.find({ category: req.query.category });
    }

    // 2) Tri
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // 3) Projection des champs
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // 4) Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 12;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    // Compter le nombre total de documents pour la pagination
    const total = await Ebook.countDocuments({ isActive: { $ne: false } });

    // Exécuter la requête
    const ebooks = await query;

    res.status(200).json({
      status: 'success',
      results: ebooks.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: {
        ebooks,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Obtenir un ebook spécifique par ID
exports.getEbook = async (req, res, next) => {
  try {
    const ebook = await Ebook.findById(req.params.id);

    if (!ebook || ebook.isActive === false) {
      return next(new AppError('Aucun ebook trouvé avec cet ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        ebook,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Obtenir un ebook par son identifiant personnalisé
exports.getEbookByEbookId = async (req, res, next) => {
  try {
    const ebook = await Ebook.findOne({ ebookId: req.params.ebookId });

    if (!ebook || ebook.isActive === false) {
      return next(new AppError('Aucun ebook trouvé avec cet identifiant', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        ebook,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Créer un nouvel ebook (admin uniquement)
exports.createEbook = async (req, res, next) => {
  try {
    // Vérifier si l'identifiant de l'ebook existe déjà
    const existingEbook = await Ebook.findOne({ ebookId: req.body.ebookId });
    if (existingEbook) {
      return next(
        new AppError('Un ebook avec cet identifiant existe déjà', 400)
      );
    }

    const newEbook = await Ebook.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        ebook: newEbook,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Mettre à jour un ebook (admin uniquement)
exports.updateEbook = async (req, res, next) => {
  try {
    // Filtrer les champs non autorisés
    const filteredBody = filterObj(
      req.body,
      'title',
      'author',
      'description',
      'price',
      'discountPrice',
      'coverImage',
      'category',
      'tags',
      'isActive',
      'format',
      'pages',
      'language',
      'isbn'
    );

    const updatedEbook = await Ebook.findByIdAndUpdate(
      req.params.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedEbook) {
      return next(new AppError('Aucun ebook trouvé avec cet ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        ebook: updatedEbook,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Désactiver un ebook (soft delete) (admin uniquement)
exports.deleteEbook = async (req, res, next) => {
  try {
    const ebook = await Ebook.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      {
        new: true,
      }
    );

    if (!ebook) {
      return next(new AppError('Aucun ebook trouvé avec cet ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

// Obtenir tous les ebooks d'une catégorie
exports.getEbooksByCategory = async (req, res, next) => {
  try {
    const ebooks = await Ebook.find({
      category: req.params.category,
      isActive: { $ne: false },
    });

    res.status(200).json({
      status: 'success',
      results: ebooks.length,
      data: {
        ebooks,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Obtenir toutes les catégories disponibles
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Ebook.aggregate([
      { $match: { isActive: { $ne: false } } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({
      status: 'success',
      results: categories.length,
      data: {
        categories: categories.map((cat) => ({
          category: cat._id,
          count: cat.count,
        })),
      },
    });
  } catch (err) {
    next(err);
  }
};

// Obtenir les ebooks en vedette
exports.getFeaturedEbooks = async (req, res, next) => {
  try {
    const ebooks = await Ebook.find({
      featured: true,
      isActive: { $ne: false },
    }).limit(6);

    res.status(200).json({
      status: 'success',
      results: ebooks.length,
      data: {
        ebooks,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Obtenir les nouveautés
exports.getNewReleases = async (req, res, next) => {
  try {
    const ebooks = await Ebook.find({
      newRelease: true,
      isActive: { $ne: false },
    }).limit(6);

    res.status(200).json({
      status: 'success',
      results: ebooks.length,
      data: {
        ebooks,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Import des ebooks depuis le fichier JSON
exports.importEbooksFromJson = async (req, res, next) => {
  try {
    // Chemin vers le fichier JSON des métadonnées des ebooks
    const metadataPath = path.resolve(
      __dirname,
      '../../assets/ebooks/metadata/ebooks.json'
    );

    // Lecture du fichier JSON
    const ebooksData = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

    // Vérification que le fichier contient un tableau d'ebooks
    if (!ebooksData.ebooks || !Array.isArray(ebooksData.ebooks)) {
      return next(
        new AppError(
          'Format de fichier de métadonnées incorrect. Un tableau d\'ebooks est attendu.',
          400
        )
      );
    }

    // Créer ou mettre à jour les ebooks dans la base de données
    const operations = ebooksData.ebooks.map((bookData) => {
      return {
        updateOne: {
          filter: { ebookId: bookData.id },
          update: {
            $set: {
              ebookId: bookData.id,
              title: bookData.title,
              fileName: bookData.fileName,
              author: bookData.author,
              description: bookData.description,
              price: bookData.price,
              discountPrice: bookData.discountPrice,
              coverImage: bookData.coverImage,
              filePath: bookData.filePath,
              fileSize: bookData.fileSize,
              pages: bookData.pages,
              format: bookData.format,
              language: bookData.language,
              datePublished: bookData.datePublished,
              isbn: bookData.isbn,
              category: bookData.category,
              tags: bookData.tags,
              isActive: true,
            },
          },
          upsert: true,
        },
      };
    });

    // Exécuter les opérations en masse
    const result = await Ebook.bulkWrite(operations);

    res.status(200).json({
      status: 'success',
      message: 'Ebooks importés avec succès',
      data: {
        matched: result.matchedCount,
        modified: result.modifiedCount,
        upserted: result.upsertedCount,
      },
    });
  } catch (err) {
    next(err);
  }
};
