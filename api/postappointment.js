import mongoose from 'mongoose';
import User from './models/userModel.js';

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_ATLAS_URL, {})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Handler function
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, phonenum, date, time, msg } = req.body;

        try {
            // Save the user details in the database
            const user = new User({ name, email, phonenum, date, time, msg });
            await user.save();

            // Redirect to the confirmation page
            return res.redirect(302, '/formsubmited.html');
        } catch (error) {
            console.error("Error saving user data:", error);
            return res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    } else {
        // Handle unsupported HTTP methods
        return res.status(405).json({ error: "Method Not Allowed" });
    }
}
