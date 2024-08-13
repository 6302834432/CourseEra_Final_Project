import dotenv from "dotenv";
import { mongoose } from 'mongoose'
import { books } from "../data/data.js";
import Book from "../models/book.js";
import Review from "../models/review.js";
import User from "../models/user.js";
dotenv.config();

export  const connectDB =async () => {
        try {
            mongoose.connect(process.env.DTABASEURI);
            await seedBooks()
            const books=await Book.find({})
            // console.log(books);
            const users = await User.insertMany([
                { username: 'John Doe', email: 'john@example.com', password: 'password123' },
                { username: 'Jane Smith', email: 'jane@example.com', password: 'password123' }
            ]);
            await Review.insertMany([
                { review_text: ['Great book!'], user: users[0]._id, bookId: books[0]._id },
                { review_text: ['Not my favorite.'], user: users[1]._id, bookId: books[1]._id },
                { review_text: ['Interesting read.'], user: users[0]._id, bookId: books[1]._id },
            ]);
            console.log('connect successfully---');
        } catch (error) {
            console.log(error);
        }
    }

async function seedBooks() {
    const BooksCount = await Book.countDocuments();
    if (BooksCount > 0) {
        console.log('Books seed is already done!');
        return;
    }

    for (let book of books) {

        await Book.create(user);
    }

    console.log('Books seed is done!');
}
