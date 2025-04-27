const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Une commande doit appartenir à un utilisateur'],
    },
    orderItems: [
      {
        ebook: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Ebook',
          required: [true, 'Une commande doit contenir au moins un ebook'],
        },
        title: String,
        price: Number,
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    paymentInfo: {
      id: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      paymentMethod: {
        type: String,
        required: true,
        enum: ['card', 'paypal'],
      },
      paymentDate: {
        type: Date,
        default: Date.now,
      },
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    orderStatus: {
      type: String,
      required: true,
      default: 'Processing',
      enum: ['Processing', 'Completed', 'Failed'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Populate user and ebooks when querying
orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name email',
  }).populate({
    path: 'orderItems.ebook',
    select: 'title author coverImage',
  });
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;