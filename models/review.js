import mongoose from 'mongoose';

// Import user and book models to reference them
import User from './user.js';
import Book from './book.js';

const reviewSchema = new mongoose.Schema({
  review_text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Book,
    required: true,
  },
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
