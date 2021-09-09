const commonFields = require('./commonFields');

const expressValidator = require('express-validator');

const orderMenu = expressValidator
    .check('orderMenu')
    .notEmpty()
    .withMessage('orderMenu cannot be empty');

const restaurantId = expressValidator
    .check('restaurantId')
    .notEmpty()
    .withMessage('restaurantId cannot be empty');

module.exports = OrderValidator = () => [orderMenu, restaurantId];
