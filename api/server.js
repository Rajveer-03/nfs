// require('dotenv').config();
// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const http = require('http');
// const port = 3020;

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.urlencoded({ extended: true }))

// mongoose.connect(process.env.MONGODB_ATLAS_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((err) => console.error('Connection error:', err));

// const User = require('./models/userModel');
// const Review = require('./models/reviewModel');
// const path = require('path');

// app.get('/booka', (req, res) => {
//     res.sendFile('public/booka.html');
// });

// app.get('/cusreview', (req, res) => {
//     res.sendFile('public/cusreview.html');
// });


// app.post('/api/postappointment', async (req, res) => {
//     const {name , email , phonenum , date, time , msg } = req.body
//     const user = new User({
//         name,
//         email,
//         phonenum,
//         date,
//         time,
//         msg,
//     })
//     await user.save()
//     res.send("Form Submission Successful")
// })


// app.post('/api/postreview', async (req, res) => {
//     const {name , email , rating, review} = req.body
//     const rev = new Review({
//         name,
//         email,
//         rating,
//         review
//     })
//     await rev.save()
//     res.sendFile(path.join(__dirname, 'public/formsubmitted.html'));
// })



// app.listen(port, () => {
//     console.log("Server started")
// })


require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const appointmentRoutes = require('./routes/appointmentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
const port = process.env.PORT || 3020;

// Connect to database
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api', appointmentRoutes);
app.use('/api', reviewRoutes);

// Static file endpoints
app.get('/booka', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/booka.html'));
});

app.get('/cusreview', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/cusreview.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
