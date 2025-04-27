const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const Email = require('../utils/email');

// Créer et signer un token JWT
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Envoyer le token JWT avec des cookies
const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  // Options de cookie
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Ne peut pas être accédé ou modifié par le navigateur
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https', // Seulement en HTTPS
  };

  // Envoyer le cookie
  res.cookie('jwt', token, cookieOptions);

  // Supprimer le mot de passe de la sortie
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// Inscription d'un nouvel utilisateur
exports.signup = async (req, res, next) => {
  try {
    // Création du nouvel utilisateur
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role === 'admin' ? 'user' : req.body.role, // Empêcher la création directe d'admins
    });

    // URL pour rediriger l'utilisateur après inscription
    const url = `${req.protocol}://${req.get('host')}/`;

    // Envoyer l'email de bienvenue
    await new Email(newUser, url).sendWelcome();

    // Créer et envoyer le token
    createSendToken(newUser, 201, req, res);
  } catch (err) {
    next(err);
  }
};

// Connexion d'un utilisateur
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1) Vérifier si l'email et le mot de passe existent
    if (!email || !password) {
      return next(
        new AppError('Veuillez fournir un email et un mot de passe', 400)
      );
    }

    // 2) Vérifier si l'utilisateur existe et si le mot de passe est correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Email ou mot de passe incorrect', 401));
    }

    // 3) Si tout est ok, envoyer le token
    createSendToken(user, 200, req, res);
  } catch (err) {
    next(err);
  }
};

// Déconnexion
exports.logout = (req, res) => {
  // Remplacer le cookie JWT par un cookie vide qui expire immédiatement
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: 'success' });
};

// Demande de réinitialisation du mot de passe
exports.forgotPassword = async (req, res, next) => {
  try {
    // 1) Trouver l'utilisateur par email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(
        new AppError('Aucun utilisateur trouvé avec cette adresse email', 404)
      );
    }

    // 2) Générer un token de réinitialisation aléatoire
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Stocker une version hashée du token dans la base de données
    user.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Le token expire dans 10 minutes
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    // 3) Envoyer le token à l'utilisateur par email
    try {
      const resetURL = `${req.protocol}://${req.get(
        'host'
      )}/reset-password/${resetToken}`;

      await new Email(user, resetURL).sendPasswordReset();

      res.status(200).json({
        status: 'success',
        message: 'Un email de réinitialisation a été envoyé',
      });
    } catch (err) {
      // En cas d'erreur, supprimer les champs de réinitialisation
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return next(
        new AppError(
          'Une erreur est survenue lors de l\'envoi de l\'email. Veuillez réessayer plus tard.',
          500
        )
      );
    }
  } catch (err) {
    next(err);
  }
};

// Réinitialisation du mot de passe
exports.resetPassword = async (req, res, next) => {
  try {
    // 1) Récupérer l'utilisateur basé sur le token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // 2) Si le token n'est pas expiré et qu'il y a un utilisateur, définir le nouveau mot de passe
    if (!user) {
      return next(
        new AppError('Le token est invalide ou a expiré', 400)
      );
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // 3) Mettre à jour la propriété passwordChangedAt (fait dans le middleware du modèle)

    // 4) Connecter l'utilisateur, envoyer le JWT
    createSendToken(user, 200, req, res);
  } catch (err) {
    next(err);
  }
};

// Mise à jour du mot de passe pour un utilisateur connecté
exports.updatePassword = async (req, res, next) => {
  try {
    // 1) Récupérer l'utilisateur
    const user = await User.findById(req.user.id).select('+password');

    // 2) Vérifier si le mot de passe actuel est correct
    if (
      !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
      return next(new AppError('Votre mot de passe actuel est incorrect', 401));
    }

    // 3) Mettre à jour le mot de passe
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    // 4) Connecter l'utilisateur, envoyer le JWT
    createSendToken(user, 200, req, res);
  } catch (err) {
    next(err);
  }
};

// Obtenir l'utilisateur actuel
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
