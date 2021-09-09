const express = require('express');
const router = express.Router();
//Load User Model
// const Restaurants = require('../../models/Restaurants');
const { protect } = require('../../middlewares/auth');
// const foodMenu = require('./foodMenu');
const restaurantsValidator = require('../../validationMiddelware/restaurants');
const foodMenuValidator = require('../../validationMiddelware/foodMenu');
const foodMenu = require('./foodMenu');
const {
    createFoodMenu
    // fetchRestaurants,
    // updateCards,
} = require('../controllers/Restaurants/FoodMenu/FoodMenu');
const {
    createRestaurants,
    fetchRestaurants
    // updateCards,
} = require('../controllers/Restaurants/restaurants');

//Protecting all below routes
router.use(protect);
router.use('/', foodMenu);
router.post('/', restaurantsValidator(), createRestaurants);
router.get('/', fetchRestaurants);
// router.post('/:id/foodMenu', foodMenuValidator(), createFoodMenu);
// router.route('/cards').post(createCards);
// router.route('/cards').get(fetchCards);
// router.route('/cards/:id').put(updateCards);

module.exports = router;
