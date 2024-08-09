import Book from '../models/book.js';

export async function getAllBooks(req, res) {
    try {
        const books = await Book.find(); // Get all books
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error!!' });
    }
}

export async function addBook(req, res) {
    try {
        const { ISBN, title, author } = req.body;

        // Check if the book already exists
        const foundBook = await Book.findOne({ ISBN });
        if (foundBook) {
            return res.json({ message: 'Book Already Found!!' });
        }

        // Create a new book
        const newBook = new Book({ ISBN, title, author });
        await newBook.save();

        res.status(201).json({ message: 'Book Added Successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error!!' });
    }
}

export async function getBooksByISBN(req, res) {
    try {
        const { ISBN } = req.query; // Use req.query for GET parameters

        if (!ISBN) {
            return res.json({ message: 'Please, provide a valid ISBN Code!' });
        }

        const foundBooks = await Book.find({ ISBN });
        if (foundBooks.length) {
            return res.json({ message: 'Books are Found!!', foundBooks });
        }

        res.json({ message: 'No book found with this ISBN Code!' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error!!' });
    }
}

export async function getBooksByTitle(req, res) {
    try {
        const { title } = req.query; // Use req.query for GET parameters

        if (!title) {
            return res.json({ message: 'Please, provide a valid title!' });
        }

        const foundBooks = await Book.find({ title });
        if (foundBooks.length) {
            return res.json({ message: 'Books are Found!!', foundBooks });
        }

        res.json({ message: 'No book found with this title!' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error!!' });
    }
}

export async function getBooksByAuthor(req, res) {
    try {
        const { author } = req.query; // Use req.query for GET parameters

        if (!author) {
            return res.json({ message: 'Please, provide a valid author name!' });
        }

        const foundBooks = await Book.find({ author });
        if (foundBooks.length) {
            return res.json({ message: 'Books are Found!!', foundBooks });
        }

        res.json({ message: 'No book found with this author name!' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error!!' });
    }
}
