import { Schema as User, model } from 'mongoose';

export const UserSchema = new User({
  firstName: {
    type: String,
    required: 'First name is required',
    minLength: 3,
    maxLength: 40,
    match: /^[a-zа-яёї][a-zа-яёї ]{0,}$/i
  },
  lastName: {
    type: String,
    required: 'Last name is required',
    minLength: 3,
    maxLength: 40,
    match: /^[a-zа-яёї][a-zа-яёї ]{0,}$/i
  },
  gender: Boolean,
  age: {
    type: Number,
    min: 0,
    max: 100
  },
  phone: {
    type: String,
    unique: true,
    required: 'Phone number is required',
    match: /^(?!\b(0)\1+\b)(\+?\d{1,3}[. -]?)?\(?\d{3}\)?([. -]?)\d{3}\3\d{4}$/gm
  }
}, {
  timestamps: true,
});

export default model('User', UserSchema);