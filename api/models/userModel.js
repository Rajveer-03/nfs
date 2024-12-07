import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phonenum: String,
    date: String,
    time: String,
    msg: String,
});

export const User = mongoose.model('User', userSchema);
