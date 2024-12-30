const User = require('../models/Usermodel.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signupController = async(req,res) => {

    const { name, email,phone, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        
        //hashing password
        const hashedPassward = await bcrypt.hash(password,8)

        // Create a new user (storing password in plain text)
        const userDoc = await User.create({
            name,
            phone,
            email,
            password: hashedPassward
         });

        res.status(201).json(userDoc);
    } catch (error) {
        res.status(400).json({ msg: 'Error creating user', error });
    }
};

exports.signinController = async (req,res) => {
    
    const {email,password} = req.body;

    try {
        // Check if the user exists
        const userDoc = await User.findOne({ email });
        if (!userDoc) return res.status(400).json("Invalid credentials");

        //Comparing HashedPassword with original Password
        const isMatch = await bcrypt.compare( password, userDoc.password);
        
        // Compare password
        if (isMatch) {
            // Generate JWT token
            const payload = { id: userDoc._id, email: userDoc.email };
          
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                if (err) throw err;

                // Set token in cookie and send response
                res.cookie('token', token, { httpOnly: true }).json({
                    id: userDoc._id,
                    email: userDoc.email,
                    name: userDoc.name,
                });
            });
        } else {
            res.status(400).json("Invalid credentials");
        }
    } catch (error) {
        res.status(400).json("An error occurred during login");
    }
}
    
