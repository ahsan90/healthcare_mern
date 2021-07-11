const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route POST api/users
// @desc Test route
// @access Public
router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').not().isEmpty(),
        check('password', 'Please enter a password that has 6 or more characters').isLength({min: 6})
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }

            const avatar = gravatar.url({
                s: 200,
                r: 'pg',
                d: 'mm'
            });

            user = new User({
                name,
                email,
                avatar,
                password
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();
            // Get users gravatar

            // Encrypt password

            // Return jsonwebtoken

            res.send('User registered');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
        }

        
});

module.exports = router