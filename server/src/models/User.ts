const { Schema, model } = require('mongoose');

const User = Schema;

const UserSchema = new User({
  firstName: {
    type: String,
    required: 'First name is required'
  },
  lastName: {
    type: String,
    required: 'Last name is required',
  },
  gender: String,
  age: Number,
  phone: {
    type: String,
    required: 'Phone number is required'
  }
}, {
  timestamps: true,
});

export default model('User', UserSchema);