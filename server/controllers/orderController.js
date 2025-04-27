const Order = require('../models/orderModel');
const Ebook = require('../models/ebookModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const Email = require('../utils/email');

// Créer une nouvelle commande
exports.createOrder = async (req, res, next) => {
  try {
    const { orderItems, paymentInfo } = req.body;

    // Vérifier que les éléments de la commande sont fournis
    if (!orderItems || orderItems.length === 0) {
      return next(new AppError('Aucun élément dans la commande', 400));
    }

    // Vérifier que les informations de paiement sont fournies
    if (!paymentInfo || !paymentInfo.id || !paymentInfo.status || !paymentInfo.paymentMethod) {
      return next(new AppError('Informations de paiement incomplètes', 400));
    }

    // Récupérer les détails de chaque ebook et calculer le prix total
    let totalPrice = 0;
    const orderItemsWithDetails = [];

    for (const item of orderItems) {
      const ebook = await Ebook.findById(item.ebook);
      if (!ebook) {
        return next(new AppError(`Ebook non trouvé avec l'ID: ${item.ebook}`, 404));
      }

      // Utiliser le prix avec remise s'il existe
      const price = ebook.discountPrice || ebook.price;
      totalPrice += price * (item.quantity || 1);

      orderItemsWithDetails.push({
        ebook: ebook._id,
        title: ebook.title,
        price: price,
        quantity: item.quantity || 1,
      });
    }

    // Créer la commande
    const order = await Order.create({
      user: req.user.id,
      orderItems: orderItemsWithDetails,
      paymentInfo,
      totalPrice,
    });

    // Envoyer un email de confirmation
    const user = await User.findById(req.user.id);
    const orderInfo = {
      orderId: order._id,
      items: orderItemsWithDetails.map(item => ({
        title: item.title,
        price: item.price,
      })),
      total: totalPrice,
    };

    const url = `${req.protocol}://${req.get('host')}/orders/${order._id}`;
    await new Email(user, url).sendOrderConfirmation(orderInfo);

    // Générer les liens de téléchargement pour chaque ebook
    const downloadController = require('./downloadController');
    const downloads = [];

    for (const item of orderItemsWithDetails) {
      req.body = {
        orderId: order._id,
        ebookId: item.ebook,
      };

      // Appeler directement la fonction pour créer les liens de téléchargement
      // sans passer par les routes Express
      const downloadResult = await downloadController.createDownloadLink(
        { user: req.user, body: req.body, protocol: req.protocol, get: req.get.bind(req) },
        { 
          status: function(code) { 
            return { 
              json: function(data) { 
                return data; 
              } 
            }; 
          } 
        },
        function(err) { 
          if (err) console.error(err); 
        }
      );

      if (downloadResult && downloadResult.data && downloadResult.data.download) {
        downloads.push(downloadResult.data.download);
      }
    }

    // Répondre avec les détails de la commande et les liens de téléchargement
    res.status(201).json({
      status: 'success',
      data: {
        order,
        downloads,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Obtenir toutes les commandes d'un utilisateur
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort('-createdAt');

    res.status(200).json({
      status: 'success',
      results: orders.length,
      data: {
        orders,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Obtenir une commande spécifique
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new AppError('Commande non trouvée', 404));
    }

    // Vérifier que l'utilisateur est autorisé à voir cette commande
    if (order.user.id !== req.user.id && req.user.role !== 'admin') {
      return next(
        new AppError('Vous n\'êtes pas autorisé à accéder à cette commande', 403)
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Obtenir toutes les commandes (admin uniquement)
exports.getAllOrders = async (req, res, next) => {
  try {
    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    // Filtrage par statut
    const filter = {};
    if (req.query.status) {
      filter.orderStatus = req.query.status;
    }

    // Recherche par ID d'utilisateur
    if (req.query.user) {
      filter.user = req.query.user;
    }

    // Compter le nombre total de commandes pour la pagination
    const total = await Order.countDocuments(filter);

    // Exécuter la requête
    const orders = await Order.find(filter)
      .skip(skip)
      .limit(limit)
      .sort('-createdAt');

    res.status(200).json({
      status: 'success',
      results: orders.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: {
        orders,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Mettre à jour le statut d'une commande (admin uniquement)
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!status) {
      return next(new AppError('Le statut de la commande est requis', 400));
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new AppError('Commande non trouvée', 404));
    }

    order.orderStatus = status;
    await order.save();

    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Vérifier le statut de paiement (webhook pour les systèmes de paiement)
exports.checkPaymentStatus = async (req, res, next) => {
  try {
    const { paymentId, paymentStatus } = req.body;

    // Trouver la commande par ID de paiement
    const order = await Order.findOne({ 'paymentInfo.id': paymentId });

    if (!order) {
      return next(new AppError('Commande non trouvée', 404));
    }

    // Mettre à jour le statut du paiement
    order.paymentInfo.status = paymentStatus;

    // Si le paiement est réussi, mettre à jour le statut de la commande
    if (paymentStatus === 'succeeded' || paymentStatus === 'completed') {
      order.orderStatus = 'Completed';
    } else if (paymentStatus === 'failed' || paymentStatus === 'cancelled') {
      order.orderStatus = 'Failed';
    }

    await order.save();

    // Si le paiement est réussi, générer les liens de téléchargement
    if (order.orderStatus === 'Completed') {
      // Le code pour générer les liens de téléchargement serait ici
      // (similaire à ce qui est fait dans createOrder)
    }

    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Obtenir des statistiques sur les commandes (admin uniquement)
exports.getOrderStats = async (req, res, next) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: '$orderStatus',
          count: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);

    // Calculer les totaux
    const totalOrders = stats.reduce((acc, stat) => acc + stat.count, 0);
    const totalRevenue = stats.reduce((acc, stat) => acc + stat.totalSales, 0);

    // Grouper par mois pour voir l'évolution des ventes
    const monthlySales = await Order.aggregate([
      {
        $match: {
          orderStatus: 'Completed',
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
      {
        $sort: { '_id.year': -1, '_id.month': -1 },
      },
      {
        $limit: 12, // 12 derniers mois
      },
    ]);

    // Livres les plus vendus
    const topSellingBooks = await Order.aggregate([
      {
        $match: {
          orderStatus: 'Completed',
        },
      },
      {
        $unwind: '$orderItems',
      },
      {
        $group: {
          _id: '$orderItems.ebook',
          title: { $first: '$orderItems.title' },
          totalSold: { $sum: '$orderItems.quantity' },
          revenue: { $sum: { $multiply: ['$orderItems.price', '$orderItems.quantity'] } },
        },
      },
      {
        $sort: { totalSold: -1 },
      },
      {
        $limit: 10, // Top 10
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        totalOrders,
        totalRevenue,
        ordersByStatus: stats,
        monthlySales,
        topSellingBooks,
      },
    });
  } catch (err) {
    next(err);
  }
};
