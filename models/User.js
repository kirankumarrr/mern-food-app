const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
    enum: ['user', 'owner'],
    default: 'user',
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  cart: {
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: 'restaurants',
    },
    items: [
      {
        foodId: {
          type: Schema.Types.ObjectId,
          ref: 'foodMenu',
          required: true,
        },
        name: {
          type: String,
          require: true,
        },
        price: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        restaurantId: {
          type: String,
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});
UserSchema.methods.addToCart = function async(food) {
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.foodId.toString() === food._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    const collectFoodItemDetails = {
      foodId: food,
      name: food.name,
      price: food.price,
      description: food.description,
      quantity: newQuantity,
      restaurantId: food.restaurantId,
    };
    updatedCartItems.push(collectFoodItemDetails);
  }
  const updatedCart = {
    restaurantId: food.restaurantId,
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

UserSchema.methods.removeFromCart = function (foodId) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.foodId.toString() !== foodId._id.toString();
  });
  if (updatedCartItems.length === 0) {
    this.cart.restaurantId = null;
  }
  this.cart.items = updatedCartItems;
  return this.save();
};

UserSchema.methods.clearCart = function () {
  this.cart.items = [];
  this.cart.restaurantId = null;
  return this.save();
};
module.exports = User = mongoose.model('users', UserSchema);
