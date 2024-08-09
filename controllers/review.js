import Review from '../models/review.js';

export async function addReview(req, res) {
    try {
        const { user_id } = req.user;
        const book_id = req.params.id;
        const { review_text } = req.body;

        const foundReview = await Review.findOne({ userId: user_id, bookId: book_id });

        if (foundReview) {
            await Review.updateOne({ userId: user_id, bookId: book_id }, { review_text });
            return res.json({ message: 'Review updated successfully!' });
        }

        const newReview = new Review({ userId: user_id, bookId: book_id, review_text });
        await newReview.save();

        res.status(201).json({ message: 'Review added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!!' });
    }
}

export async function getReview(req, res) {
    try {
        const { id } = req.params;

        const bookReviews = await Review.find({ bookId: id }).select('review_text');

        if (bookReviews.length === 0) {
            return res.json({ message: 'No review found for this book!' });
        }

        res.json({ message: 'Reviews found for this book', bookReviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!!' });
    }
}

export async function deleteReview(req, res) {
    try {
        const { user_id } = req.user;
        const { id } = req.params;

        const result = await Review.deleteOne({ userId: user_id, bookId: id });

        if (result.deletedCount === 0) {
            return res.json({ message: 'No review found for this user to delete!' });
        }

        res.json({ message: 'Review deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!!' });
    }
}
