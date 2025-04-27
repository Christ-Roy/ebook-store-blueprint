const mongoose = require('mongoose');

const ebookSchema = new mongoose.Schema(
  {
    ebookId: {
      type: String,
      required: [true, 'Un ebook doit avoir un identifiant'],
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Un ebook doit avoir un titre'],
      trim: true,
    },
    fileName: {
      type: String,
      required: [true, 'Un ebook doit avoir un nom de fichier'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Un ebook doit avoir un auteur'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Un ebook doit avoir une description'],
    },
    price: {
      type: Number,
      required: [true, 'Un ebook doit avoir un prix'],
    },
    discountPrice: {
      type: Number,
    },
    coverImage: {
      type: String,
      required: [true, 'Un ebook doit avoir une image de couverture'],
    },
    filePath: {
      type: String,
      required: [true, 'Un ebook doit avoir un chemin de fichier'],
    },
    fileSize: {
      type: String,
    },
    pages: {
      type: Number,
    },
    format: {
      type: String,
      enum: ['PDF', 'EPUB', 'MOBI', 'PDF, EPUB', 'PDF, MOBI', 'EPUB, MOBI', 'PDF, EPUB, MOBI'],
      default: 'PDF',
    },
    language: {
      type: String,
      default: 'Français',
    },
    datePublished: {
      type: Date,
    },
    isbn: {
      type: String,
    },
    category: {
      type: String,
      required: [true, 'Un ebook doit avoir une catégorie'],
    },
    tags: [String],
    isActive: {
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

// Virtual property for effective price (discount or regular)
ebookSchema.virtual('effectivePrice').get(function() {
  return this.discountPrice || this.price;
});

// Index for faster searches
ebookSchema.index({ title: 'text', description: 'text', author: 'text', tags: 'text' });

const Ebook = mongoose.model('Ebook', ebookSchema);

module.exports = Ebook;