const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodMenuSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: 'restaurants',
    required: true,
  },
});

module.exports = mongoose.model('foodMenu', foodMenuSchema);
