import Review from '../models/review.js';
import User from '../models/user.js';

export async function addReview(req, res) {
    const { user_id } = req.user; 
    const { id: bookId } = req.params;  
    const { review_text } = req.body;

    try {
        // Check if the user exists
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(400).json({ message: "You are not a registered user. Please register." });
        }

        // Check if a review already exists
        let foundReview = await Review.findOne({ user: user_id, bookId: bookId });

        if (foundReview) {
            // If a review exists, push the new text to the existing review_text array
            foundReview.review_text.push(...review_text);
            await foundReview.save();
            return res.json({ message: 'Review updated successfully!', review_text: foundReview.review_text });
        }

        // If no review exists, create a new one
        const newReview = new Review({ user: user_id, bookId: bookId, review_text });
        await newReview.save();

        res.status(201).json({ message: 'Review added successfully!', review_text: newReview.review_text });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}
export async function deleteReview(req, res) {
    try {
        const { user_id } = req.user;
        const { id } = req.params;

        const result = await Review.deleteOne({ user: user_id, bookId: id });
        console.log(result)
        if (result.deletedCount === 0) {
            return res.json({ message: 'No review found for this user to delete!' });
        }

        res.json({ message: 'Review deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!!' });
    }
}
export async function getReview(req, res) {
    try {
        const { id } = req.params;

        const bookReviews = await Review.find({ bookId: id }).select('review_text');

        if (!bookReviews || bookReviews.length === 0) {
            return res.status(404).json({ message: 'No review found for this book!' });
        }

        const reviewTexts = bookReviews.map(review => review.review_text);

        res.json({ message:"Reviews found for this book ",reviewTexts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
}