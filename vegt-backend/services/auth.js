const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

var authService = {
  signUser: function (user) {
    const token = jwt.sign(
      {
        userId: user._id,
        isAdmin: user.isAdmin,
        isFarmer: user.isFarmer
      },
      'veggieTales',
      {
        expiresIn: '1h'
      }
    );
    return token;
  },
  verifyUser: function (token) {
    try {
      let decoded = jwt.verify(token, 'veggieTales');
      return User.findById(decoded.userId);
    } catch (err) {    
      return null;
    }
  },
  hashPassword: function (plainTextPassword) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(plainTextPassword, salt);
    return hash;
  },
  comparePasswords: function (plainTextPassword, hashedPassword) {
    //returns a Boolean result; true if matching
    return bcrypt.compareSync(plainTextPassword, hashedPassword);
  }

}

module.exports = authService;