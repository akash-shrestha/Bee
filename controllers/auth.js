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


exports.signinAdmin = (req, res, next) => {
  const userName = req.body.userName;
  const password = req.body.password;
  let adminPassword;
  Admin.findAll(
    {where: { userName: userName },
    attributes: ['password'],
    raw: true
   })
    .then(passwordResult => {
      if (passwordResult.length <= 0) {
        const error = new Error('Admin with this user name could not be found !');
        error.statusCode = 401;
        throw error;
      }
      adminPassword = passwordResult[0].password;
      return bcrypt.compare(password, adminPassword);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong user name or password !');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          userName: userName.toString()
        },
        'somesupersecretsecret',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, userName: userName.toString() });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
