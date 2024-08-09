import mongoose from 'mongoose';

// Define the schema for a user
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create a model using the schema
const User = mongoose.model('User', userSchema);

export default User;
