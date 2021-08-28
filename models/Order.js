const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderMenu: [
    {
      food: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  restaurantId: { type: String, required: true },
  restaurantName: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: [
      'placed',
      'canceled',
      'processing',
      'inRoute',
      'delivered',
      'received',
    ],
    default: 'placed',
  },
  totalAmount: { type: Number, required: true },
  restaurantOwner: { type: Object, required: true },
  user: {
    email: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  detailStatus: {
    type: Schema.Types.ObjectId,
    ref: 'orderStatus',
  },
});

module.exports = mongoose.model('order', orderSchema);
