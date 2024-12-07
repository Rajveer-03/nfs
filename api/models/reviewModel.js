import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    name: String,
    email: String,
    rating: Number,
    review: String,
});

export const Review = mongoose.model('Review', reviewSchema);
