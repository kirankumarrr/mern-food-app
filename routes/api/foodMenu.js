const express = require('express');
const router = express.Router();
//Load User Model
// const Restaurants = require('../../models/Restaurants');
const { protect } = require('../../middlewares/auth');
const foodMenuValidator = require('../../validationMiddelware/foodMenu');
const {
    createFoodMenu,
    fetchFoodMenu
    // updateCards,
} = require('../controllers/Restaurants/FoodMenu/FoodMenu');
//Protecting all below routes
router.use(protect);
router.get('/:id/foodMenu', fetchFoodMenu);
router.post('/:id/foodMenu', foodMenuValidator(), createFoodMenu);

// router.get('/', fetchRestaurants);
// router.route('/cards').post(createCards);
// router.route('/cards').get(fetchCards);
// router.route('/cards/:id').put(updateCards);

module.exports = router;
