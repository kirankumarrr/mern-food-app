const Validator = require('validator');
const checkIsEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !checkIsEmpty(data.name) ? data.name : '';
  data.role = !checkIsEmpty(data.role) ? data.role : 'user';
  data.email = !checkIsEmpty(data.email) ? data.email : '';
  data.password = !checkIsEmpty(data.password) ? data.password : '';
  data.password2 = !checkIsEmpty(data.password2) ? data.password2 : '';

  /**
   * Mandatory Validations START
   */
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  if (Validator.isEmpty(data.role)) {
    errors.username = 'role field is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }
  /**
   * Mandatory Validations END
   */

  /**
   * Field Validations Lengths START
   */
  // Set Name length

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 to 30 characters';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be atleast 6 characters';
  }

  /**
   * Field Validations Lengths End
   */

  /**
   * Field Pattern Check START
   */
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  // Check password2 to be same as password
  if (data.password !== data.password2) {
    errors.password2 = 'Password must match';
  }
  /**
   * Field Pattern Check END
   */

  return {
    errors,
    isValid: checkIsEmpty(errors),
  };
};
