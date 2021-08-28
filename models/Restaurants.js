const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const RestaurantSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
  user: {
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
  },
});

module.exports = User = mongoose.model('restaurants', RestaurantSchema);
