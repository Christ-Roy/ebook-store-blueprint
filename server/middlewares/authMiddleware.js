const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

// Middleware pour protéger les routes nécessitant une authentification
exports.protect = async (req, res, next) => {
  try {
    // 1) Vérifier si le token existe
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        new AppError(
          'Vous n\'êtes pas connecté. Veuillez vous connecter pour accéder à cette ressource.',
          401
        )
      );
    }

    // 2) Vérifier si le token est valide
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Vérifier si l'utilisateur existe toujours
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          'L\'utilisateur associé à ce token n\'existe plus.',
          401
        )
      );
    }

    // 4) Vérifier si l'utilisateur a changé de mot de passe après l'émission du token
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError(
          'Vous avez récemment changé de mot de passe. Veuillez vous reconnecter.',
          401
        )
      );
    }

    // Accorder l'accès à la route protégée
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  } catch (err) {
    next(new AppError('Authentification invalide. Veuillez vous reconnecter.', 401));
  }
};

// Middleware pour restreindre l'accès en fonction du rôle
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'user']
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          'Vous n\'avez pas la permission d\'effectuer cette action.',
          403
        )
      );
    }

    next();
  };
};

// Middleware pour vérifier si l'utilisateur est l'acheteur ou un admin
exports.isOwnerOrAdmin = async (req, res, next) => {
  try {
    const downloadId = req.params.id || req.params.downloadId;
    const Download = require('../models/downloadModel');
    const download = await Download.findById(downloadId).populate('user');

    if (!download) {
      return next(new AppError('Téléchargement non trouvé', 404));
    }

    // Vérifier si l'utilisateur est l'acheteur ou un admin
    if (
      download.user.id !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return next(
        new AppError(
          'Vous n\'avez pas la permission d\'accéder à ce téléchargement.',
          403
        )
      );
    }

    // Stockez le téléchargement dans req pour y accéder plus tard
    req.download = download;
    next();
  } catch (err) {
    next(new AppError('Erreur lors de la vérification des droits d\'accès', 500));
  }
};