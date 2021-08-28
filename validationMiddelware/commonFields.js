const expressValidator = require('express-validator');
const name = expressValidator
  .check('name')
  .notEmpty()
  .withMessage('name cannot be empty');
const description = expressValidator
  .check('description')
  .notEmpty()
  .withMessage('description cannot be empty');
const type = expressValidator
  .check('type')
  .notEmpty()
  .withMessage('type cannot be empty');

module.exports = {
  name,
  description,
  type,
};
