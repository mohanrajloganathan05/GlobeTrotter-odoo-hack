const express = require('express');
const router = express.Router();
const { hashPassword } = require('../../utils/hashUtils');
const { checkUserExists, insertUser } = require('../../db/userDB');

router.post('/',async (req, res) => {
     try {
        const { name, email, password } = req.body;

        // Check existing user
        const exists = await checkUserExists(email);
        if (exists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Insert user
        await insertUser(name, email, hashedPassword);

        res.status(201).json({ message: 'Signup successful' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
