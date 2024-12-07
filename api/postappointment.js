const mongoose = require('mongoose');
const User = require('../models/userModel'); // Adjust the path as per your project structure

mongoose.connect(process.env.MONGODB_ATLAS_URL, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, phonenum, date, time, msg } = req.body;
        const user = new User({ name, email, phonenum, date, time, msg });
        await user.save();
        return res.status(200).json({ message: "Form Submission Successful" });
    }
    return res.status(405).json({ error: "Method Not Allowed" });
}
