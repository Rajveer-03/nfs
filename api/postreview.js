import mongoose from 'mongoose';
import path from 'path';
import Review from './models/reviewModel.js';

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_ATLAS_URL, {})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Handler function
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, rating, review } = req.body;

        try {
            // Save the review in the database
            const rev = new Review({ name, email, rating, review });
            await rev.save();

            // Serve the formsubmitted.html file
            const filePath = path.resolve('public', 'formsubmitted.html');
            return res.status(200).sendFile(filePath);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    }

    // Handle unsupported HTTP methods
    return res.status(405).json({ error: "Method Not Allowed" });
}
