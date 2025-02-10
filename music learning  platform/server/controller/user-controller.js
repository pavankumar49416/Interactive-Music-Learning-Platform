import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import Token from '../model/token.js';
import User from '../model/user.js';

dotenv.config();

// Signup User
export const signupUser  = async (request, response) => {
    try {
        // Check if the email already exists
        const existingUser  = await User.findOne({ email: request.body.email });
        if (existingUser ) {
            return response.status(400).json({ msg: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        // Create a new user object
        const user = {
            username: request.body.username,
            name: request.body.name,
            email: request.body.email, // Ensure email is included
            password: hashedPassword,
            role: request.body.role, // Include role if needed
            interest: request.body.interest // Include interest if needed
        };

        // Create a new user instance
        const newUser  = new User(user);
        
        // Save the user to the database
        await newUser .save();

        return response.status(201).json({ msg: 'Signup successful' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return response.status(500).json({ msg: 'Error while signing up user' });
    }
}

// Login User
export const loginUser  = async (request, response) => {
    try {
        const { email, password } = request.body; // Use email instead of username

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return response.status(400).json({ msg: 'Invalid email or password' });
        }

        // Compare the password
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            // Generate access and refresh tokens
            const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
            const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET_KEY);
            
            // Store the refresh token in the database
            const newToken = new Token({ token: refreshToken });
            await newToken.save();
        
            // Respond with tokens and user info
            response.status(200).json({
                accessToken,
                refreshToken,
                name: user.name,
                username: user.username,
                email: user.email // Include email in the response
            });
        } else {
            response.status(400).json({ msg: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        response.status(500).json({ msg: 'Error while logging in the user' });
    }
}

// Logout User
export const logoutUser  = async (request, response) => {
    try {
        const token = request.body.token;
        await Token.deleteOne({ token });

        response.status(204).json({ msg: 'Logout successful' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        response.status(500).json({ msg: 'Error while logging out' });
    }
}