import Book from '../models/book.js';

export async function getAllBooks(req, res) {
    try {
        const books = await Book.find(); // Get all books
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error!' });
    }
}

export async function addBook(req, res) {
    try {
        const { ISBN, title, author } = req.body;

        // Check if the book already exists
        const foundBook = await Book.findOne({ ISBN });
        if (foundBook) {
            return res.status(400).json({ message: 'Book Already Exists!' });
        }

        // Create a new book
        const newBook = new Book({ ISBN, title, author });
        await newBook.save();

        res.status(201).json({ message: 'Book Added Successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error!' });
    }
}

export async function getBooksByISBN(req, res) {
    try {
        const { ISBN } = req.params; 
        console.log(ISBN)
        if (!ISBN) {
            return res.status(400).json({ message: 'Please, provide a valid ISBN Code!' });
        }

        const foundBook = await Book.findOne({ ISBN }); // Use findOne for a single book
        if (foundBook) {
            return res.json({ message: 'Book Found!', foundBook });
        }

        res.status(404).json({ message: 'No book found with this ISBN Code!' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error!' });
    }
}

export async function getBooksByTitle(req, res) {
    try {
        const { title } = req.params; 

        if (!title) {
            return res.status(400).json({ message: 'Please, provide a valid title!' });
        }

        const foundBooks = await Book.find({ title:title }); // Use find for multiple books
        if (foundBooks.length) {
            return res.json({ message: 'Books Found!', foundBooks });
        }

        res.status(404).json({ message: 'No book found with this title!' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error!' });
    }
}

export async function getBooksByAuthor(req, res) {
    try {
        const { author } = req.params; 
        console.log(author);

        if (!author) {
            return res.status(400).json({ message: 'Please, provide a valid author name!' });
        }

        const foundBooks = await Book.find({ author:author }); 

        console.log(foundBooks)
        if (foundBooks) {
            return res.json({ message: 'Books Found!', foundBooks });
        }

        res.status(404).json({ message: 'No book found with this author name!' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error!' });
    }
}
