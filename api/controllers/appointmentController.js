const User = require('../models/userModel');

exports.postAppointment = async (req, res) => {
    const { name, email, phonenum, date, time, msg } = req.body;
    try {
        const user = new User({ name, email, phonenum, date, time, msg });
        await user.save();
        res.status(200).send("Form Submission Successful");
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
