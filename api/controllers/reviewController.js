const Review = require('../models/reviewModel');
const path = require('path');

exports.postReview = async (req, res) => {
    const { name, email, rating, review } = req.body;
    try {
        const rev = new Review({ name, email, rating, review });
        await rev.save();
        res.sendFile(path.join(__dirname, '../../public/formsubmitted.html'));
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
