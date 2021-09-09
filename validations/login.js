const Validator = require('validator');
const checkIsEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.email = !checkIsEmpty(data.email) ? data.email : '';
    data.password = !checkIsEmpty(data.password) ? data.password : '';

    //Check Email Type
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    //Check Email
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    //Check Password
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid: checkIsEmpty(errors)
    };
};
