const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');

const keys = require('../../config/keys');

//Load User Model
const User = require('../../models/User');
const { protect } = require('../../middlewares/auth');
const { register, login, current } = require('../controllers/Users/users');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/current').get(protect, current);

module.exports = router;
