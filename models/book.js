import mongoose from 'mongoose';

// Define the schema for a book
const bookSchema = new mongoose.Schema({
  ISBN: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

// Create a model using the schema
const Book = mongoose.model('Book', bookSchema);

export default Book;
