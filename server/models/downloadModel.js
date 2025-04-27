const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const downloadSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Un téléchargement doit être associé à un utilisateur'],
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: [true, 'Un téléchargement doit être associé à une commande'],
    },
    ebook: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ebook',
      required: [true, 'Un téléchargement doit être associé à un ebook'],
    },
    downloadToken: {
      type: String,
      default: () => nanoid(32), // Génère un token unique de 32 caractères
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: [true, 'Un téléchargement doit avoir une date d\'expiration'],
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
    maxDownloads: {
      type: Number,
      default: 3, // Limite par défaut à 3 téléchargements
    },
    ipAddresses: {
      type: [String],
      default: [],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Ajouter un index TTL sur le champ expiresAt
downloadSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Virtual property pour vérifier si le lien est expiré
downloadSchema.virtual('isExpired').get(function () {
  return this.expiresAt < new Date();
});

// Virtual property pour vérifier si le nombre max de téléchargements est atteint
downloadSchema.virtual('limitReached').get(function () {
  return this.downloadCount >= this.maxDownloads;
});

// Virtual property pour vérifier si le lien est valide
downloadSchema.virtual('isValid').get(function () {
  return this.active && !this.isExpired && !this.limitReached;
});

// Méthode pour incrémenter le compteur de téléchargements et enregistrer l'IP
downloadSchema.methods.registerDownload = async function (ipAddress) {
  this.downloadCount += 1;
  
  // Enregistrer l'adresse IP si elle n'est pas déjà présente
  if (!this.ipAddresses.includes(ipAddress)) {
    this.ipAddresses.push(ipAddress);
  }
  
  return this.save();
};

const Download = mongoose.model('Download', downloadSchema);

module.exports = Download;