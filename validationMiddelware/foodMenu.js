const commonFields = require('./commonFields');

const expressValidator = require('express-validator');

const price = expressValidator
  .check('price')
  .notEmpty()
  .withMessage('price cannot be empty');

module.exports = foodMenuValidator = () => [
  commonFields.name,
  commonFields.description,
  price,
];
