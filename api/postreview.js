const mongoose = require('mongoose');
const Review = require('../models/reviewModel'); // Adjust the path as per your project structure

mongoose.connect(process.env.MONGODB_ATLAS_URL, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, rating, review } = req.body;
        try {
            const rev = new Review({ name, email, rating, review });
            await rev.save();
            return res.status(200).json({ message: "Review Submission Successful" });
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
    return res.status(405).json({ error: "Method Not Allowed" });
}
