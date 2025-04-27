const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const moment = require('moment');
const Download = require('../models/downloadModel');
const Order = require('../models/orderModel');
const Ebook = require('../models/ebookModel');
const Email = require('../utils/email');
const AppError = require('../utils/appError');
const readFileAsync = promisify(fs.readFile);
const statAsync = promisify(fs.stat);

// Créer un nouveau lien de téléchargement après un achat validé
exports.createDownloadLink = async (req, res, next) => {
  try {
    const { orderId, ebookId } = req.body;

    // Vérifier si la commande existe et appartient à l'utilisateur connecté
    const order = await Order.findById(orderId);
    if (!order) {
      return next(new AppError('Commande non trouvée', 404));
    }

    if (order.user.id !== req.user.id && req.user.role !== 'admin') {
      return next(
        new AppError('Vous n\'êtes pas autorisé à accéder à cette commande', 403)
      );
    }

    // Vérifier si la commande contient l'ebook demandé
    const orderItem = order.orderItems.find(
      (item) => item.ebook.id === ebookId
    );
    if (!orderItem) {
      return next(
        new AppError('Cet ebook ne fait pas partie de la commande', 400)
      );
    }

    // Vérifier si l'ebook existe
    const ebook = await Ebook.findById(ebookId);
    if (!ebook) {
      return next(new AppError('Ebook non trouvé', 404));
    }

    // Calculer la date d'expiration (48h par défaut ou à partir de la configuration)
    const expiryDuration = process.env.DOWNLOAD_LINK_EXPIRY || '48h';
    const expiresAt = moment().add(
      parseInt(expiryDuration),
      expiryDuration.endsWith('h') ? 'hours' : 'days'
    );

    // Créer le lien de téléchargement
    const download = await Download.create({
      user: req.user.id,
      order: orderId,
      ebook: ebookId,
      expiresAt: expiresAt.toDate(),
      maxDownloads: parseInt(process.env.MAX_DOWNLOADS) || 3,
    });

    // Construire l'URL complète pour le téléchargement
    const downloadUrl = `${process.env.FRONTEND_URL}/download/${download.downloadToken}`;

    // Envoyer un email avec le lien de téléchargement
    const downloadInfo = {
      bookTitle: ebook.title,
      expiryDate: expiresAt.format('DD/MM/YYYY à HH:mm'),
      maxDownloads: download.maxDownloads,
    };

    await new Email(req.user, downloadUrl).sendDownloadLink(downloadInfo);

    res.status(201).json({
      status: 'success',
      data: {
        download: {
          id: download.id,
          downloadToken: download.downloadToken,
          expiresAt: download.expiresAt,
          maxDownloads: download.maxDownloads,
          downloadUrl,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

// Vérifier la validité d'un lien de téléchargement
exports.validateDownloadToken = async (req, res, next) => {
  try {
    const { token } = req.params;

    // Rechercher le téléchargement par token
    const download = await Download.findOne({ downloadToken: token }).populate({
      path: 'ebook',
      select: 'title author filePath fileSize coverImage',
    });

    if (!download) {
      return next(new AppError('Lien de téléchargement invalide', 404));
    }

    // Vérifier si le lien est toujours valide
    if (!download.isValid) {
      let message = 'Lien de téléchargement expiré';
      if (download.limitReached) {
        message = 'Nombre maximum de téléchargements atteint';
      } else if (!download.active) {
        message = 'Lien de téléchargement désactivé';
      }
      return next(new AppError(message, 410)); // 410 Gone
    }

    // Renvoyer les informations sur l'ebook et le téléchargement
    res.status(200).json({
      status: 'success',
      data: {
        download: {
          id: download.id,
          expiresAt: download.expiresAt,
          downloadCount: download.downloadCount,
          maxDownloads: download.maxDownloads,
          ebook: {
            id: download.ebook.id,
            title: download.ebook.title,
            author: download.ebook.author,
            fileSize: download.ebook.fileSize,
            coverImage: download.ebook.coverImage,
          },
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

// Télécharger un ebook
exports.downloadEbook = async (req, res, next) => {
  try {
    const { token } = req.params;

    // Rechercher le téléchargement par token
    const download = await Download.findOne({ downloadToken: token }).populate({
      path: 'ebook',
      select: 'title filePath',
    });

    if (!download) {
      return next(new AppError('Lien de téléchargement invalide', 404));
    }

    // Vérifier si le lien est toujours valide
    if (!download.isValid) {
      let message = 'Lien de téléchargement expiré';
      if (download.limitReached) {
        message = 'Nombre maximum de téléchargements atteint';
      } else if (!download.active) {
        message = 'Lien de téléchargement désactivé';
      }
      return next(new AppError(message, 410)); // 410 Gone
    }

    // Construire le chemin complet vers le fichier
    const ebookPath = path.resolve(
      __dirname,
      '..',
      '..',
      download.ebook.filePath.replace(/^\//, '')
    );

    // Vérifier si le fichier existe
    try {
      await statAsync(ebookPath);
    } catch (err) {
      return next(new AppError('Fichier introuvable', 404));
    }

    // Incrémenter le compteur de téléchargements et enregistrer l'IP
    const clientIp = req.ip || req.connection.remoteAddress;
    await download.registerDownload(clientIp);

    // Générer un nom de fichier pour le téléchargement
    const fileName = `${download.ebook.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;

    // Définir les headers pour le téléchargement
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/pdf');

    // Envoyer le fichier
    const fileStream = fs.createReadStream(ebookPath);
    fileStream.pipe(res);
  } catch (err) {
    next(err);
  }
};

// Obtenir tous les téléchargements d'un utilisateur
exports.getUserDownloads = async (req, res, next) => {
  try {
    const downloads = await Download.find({ user: req.user.id })
      .populate({
        path: 'ebook',
        select: 'title author coverImage',
      })
      .sort('-createdAt');

    res.status(200).json({
      status: 'success',
      results: downloads.length,
      data: {
        downloads,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Obtenir les détails d'un téléchargement spécifique
exports.getDownload = async (req, res, next) => {
  try {
    const download = await Download.findById(req.params.id).populate({
      path: 'ebook',
      select: 'title author coverImage filePath fileSize',
    });

    if (!download) {
      return next(new AppError('Téléchargement non trouvé', 404));
    }

    // Vérifier si l'utilisateur est autorisé à accéder à ce téléchargement
    if (
      download.user.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return next(
        new AppError(
          'Vous n\'êtes pas autorisé à accéder à ce téléchargement',
          403
        )
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        download,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Désactiver un lien de téléchargement (pour les admins ou le propriétaire)
exports.disableDownload = async (req, res, next) => {
  try {
    const download = await Download.findById(req.params.id);

    if (!download) {
      return next(new AppError('Téléchargement non trouvé', 404));
    }

    // Vérifier si l'utilisateur est autorisé à désactiver ce téléchargement
    if (
      download.user.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return next(
        new AppError(
          'Vous n\'êtes pas autorisé à désactiver ce téléchargement',
          403
        )
      );
    }

    download.active = false;
    await download.save();

    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

// Générer de nouveaux liens de téléchargement pour tous les ebooks d'une commande
exports.regenerateDownloadLinks = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    // Vérifier si la commande existe et appartient à l'utilisateur connecté
    const order = await Order.findById(orderId);
    if (!order) {
      return next(new AppError('Commande non trouvée', 404));
    }

    if (order.user.id !== req.user.id && req.user.role !== 'admin') {
      return next(
        new AppError('Vous n\'êtes pas autorisé à accéder à cette commande', 403)
      );
    }

    // Désactiver tous les liens de téléchargement existants pour cette commande
    await Download.updateMany(
      { order: orderId },
      { active: false }
    );

    // Créer de nouveaux liens pour chaque ebook de la commande
    const downloads = [];
    const expiryDuration = process.env.DOWNLOAD_LINK_EXPIRY || '48h';
    const expiresAt = moment().add(
      parseInt(expiryDuration),
      expiryDuration.endsWith('h') ? 'hours' : 'days'
    );

    for (const item of order.orderItems) {
      const ebook = await Ebook.findById(item.ebook);
      if (ebook) {
        const download = await Download.create({
          user: req.user.id,
          order: orderId,
          ebook: item.ebook,
          expiresAt: expiresAt.toDate(),
          maxDownloads: parseInt(process.env.MAX_DOWNLOADS) || 3,
        });

        // Construire l'URL complète pour le téléchargement
        const downloadUrl = `${process.env.FRONTEND_URL}/download/${download.downloadToken}`;

        // Envoyer un email avec le lien de téléchargement
        const downloadInfo = {
          bookTitle: ebook.title,
          expiryDate: expiresAt.format('DD/MM/YYYY à HH:mm'),
          maxDownloads: download.maxDownloads,
        };

        await new Email(req.user, downloadUrl).sendDownloadLink(downloadInfo);

        downloads.push({
          id: download.id,
          downloadToken: download.downloadToken,
          expiresAt: download.expiresAt,
          maxDownloads: download.maxDownloads,
          downloadUrl,
          ebook: {
            id: ebook.id,
            title: ebook.title,
          },
        });
      }
    }

    res.status(200).json({
      status: 'success',
      results: downloads.length,
      data: {
        downloads,
      },
    });
  } catch (err) {
    next(err);
  }
};