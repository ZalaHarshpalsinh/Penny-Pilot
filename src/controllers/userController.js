import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Import the User model


export const registerUser = async (req, res) => {
    const { username, email, password, profilePhoto } = req.body;

    try {

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            username,
            email,
            password: await bcrypt.hash(password, 10), // Hash the password
            profilePhoto,
        });

        await user.save();

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};