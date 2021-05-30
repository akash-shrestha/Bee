const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');

exports.signupAdmin = (req, res, next) => {
  const userName = req.body.userName;
  const fullName = req.body.fullName;
  const password = req.body.password;

  Admin.findAll({
    where: {userName: userName}
  })
  .then(result => {
    if (result.length > 0) {
      const error = new Error('Username exists !');
      error.statusCode = 422;
      throw error;
    }
    return result
  })
  .then(result => {
    return bcrypt
      .hash(password, 12)
  })
  .then(hashedPw => {
    return Admin.create({
      fullName: fullName,
      password: hashedPw,
      userName: userName        
    })
  })
  .then(result => {
    res.status(201).json({ message: 'Admin created!', userName: userName });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  })
   
}


exports.login = (req, res, next) => {
  const userName = req.body.userName;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        'somesupersecretsecret',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
