import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['Blog Creator', 'Blog Reader'], // Roles based on your frontend
        default: 'Blog Reader' // Default role
    },
    interest: {
        type: String,
        required: true
    }
});

// Create the User model
const User = mongoose.model('User ', userSchema); // Removed extra space

export default User;