const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const validateRegisterInput = require('../../../validations/register');
const validateLoginInput = require('../../../validations/login');

const keys = require('../../../config/keys');

//Load User Model
const User = require('../../../models/User');
const asyncHandler = require('../../../middlewares/async');

exports.register = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json({ email: 'Email already Exists!!!' });
      } else {
        // Read data from request User then pass into Schema
        const avatar = gravatar.url(req.body.email, {
          s: '200', // Size
          r: 'pg', // Reading
          d: 'mm', // default
        });
        const { name, email, password, role } = req.body;
        const newUser = new User({
          name,
          email,
          avatar,
          password,
          role,
        });
        // why genSalt for: set password encryption length to 10
        bcrypt.genSalt(10, (err, salt) => {
          // Hashing the password using bcrypt
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (!err) {
              newUser.password = hash;
              newUser
                .save()
                .then((user) => {
                  return res.json(user);
                })
                .catch((err) => console.log(err));
            } else {
              throw err;
            }
          });
        });
      }
    });
  }
};
exports.login = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        errors.email = 'User not Found!!!';
        return res.status(404).json(errors);
      }
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const { id, name, avatar, role } = user;
          //Create JWT Payload : This payload which is user data set in client storage, which can be access using token
          const payload = { id, name, avatar, role };
          //SignIn Token
          //expiresIn : Seconds
          jwt.sign(
            payload,
            keys.secretKey,
            { expiresIn: 36000 },
            (err, token) => {
              res.json({
                success: true,
                token: `Bearer ${token}`,
              });
            }
          );
        } else {
          errors.password = 'Password Incorrect';
          return res.status(400).json(errors);
        }
      });
    })
    .catch((err) => {
      console.log('User Login Error', err);
    });
};
exports.current = asyncHandler(async (req, res) => {
  const { id, name, email } = req.user;
  res.json({
    id,
    name,
    email,
  });
});
