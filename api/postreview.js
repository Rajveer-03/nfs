import mongoose from 'mongoose';
import Review from './models/reviewModel.js';

mongoose.connect(process.env.MONGODB_ATLAS_URL, {  });

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, rating, review } = req.body;
        try {
            const rev = new Review({ name, email, rating, review });
            await rev.save();
            return res.status(200).sendFile(path.join(process.cwd(), 'public', 'formsubmited.html'));
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    }
    return res.status(405).json({ error: "Method Not Allowed" });
}
