import User from '../models/user.js';
import { hashPassword, compare_hashed_passwords } from '../utils/hashing.js';
import { createToken } from '../utils/tokens.js';

export async function register(req, res) {
    try {
        const { username,email, password } = req.body;

        // Check if the username is already taken
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(400).json({ message: 'This user is already registered!' });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create the new user
        const newUser = new User({ username,email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Internal Server Error!!' });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Find the registered user
        const registeredUser = await User.findOne({ email });
        if (!registeredUser) {
            return res.status(401).json({ message: 'Invalid Credentials!' });
        }

        // Check password matching
        const isMatched = await compare_hashed_passwords(password, registeredUser.password);
        if (!isMatched) {
            return res.status(401).json({ message: 'Invalid Credentials!' });
        }

        // Create a token
        const token = createToken(registeredUser._id, email);

        res.json({ message: 'User logged in successfully!', token });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Internal Server Error!!' });
    }
}
