import mongoose from 'mongoose';
import User from './models/userModel.js'; 

mongoose.connect(process.env.MONGODB_ATLAS_URL, { });

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, phonenum, date, time, msg } = req.body;
        try {
            const user = new User({ name, email, phonenum, date, time, msg });
            await user.save();
            return res.status(200).sendFile('../public/formsubmitted.html');
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    }
    return res.status(405).json({ error: "Method Not Allowed" });
}
