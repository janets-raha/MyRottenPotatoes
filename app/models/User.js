const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The name is mandatory'],
  },
  email: {
    type: String,
    required: [true, 'The email is mandatory'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'The password is mandatory'],
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
  }],
  role: {
    type: String,
    default: 'user'
  }
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)