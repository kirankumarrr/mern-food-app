const commonFields = require('./commonFields');

const expressValidator = require('express-validator');

const type = expressValidator
  .check('type')
  .notEmpty()
  .withMessage('type cannot be empty');

module.exports = restaurantsValidator = () => [
  commonFields.name,
  commonFields.description,
  type,
];
