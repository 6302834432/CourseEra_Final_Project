import mongoose from 'mongoose';

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
  review:{
    type:Array,
    default:[]
  }
});
const Book = mongoose.model('Book', bookSchema);

export default Book;
