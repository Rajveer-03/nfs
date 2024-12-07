import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
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

            // Resolve the file path
            const filePath = path.resolve('public', 'formsubmitted.html');

            // Read and send the HTML file
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error("File read error:", err);
                    return res.status(500).json({ error: "Failed to load the confirmation page." });
                }
                res.setHeader('Content-Type', 'text/html');
                res.status(200).send(data);
            });
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    } else {
        // Handle unsupported HTTP methods
        return res.status(405).json({ error: "Method Not Allowed" });
    }
}
