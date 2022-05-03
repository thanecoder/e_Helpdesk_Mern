const { constants } = require('../constants');
const Users = require('../models/userModel');
// Below module added so that we can throw the exceptions in async functions.
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(
    async (req, res, next) => {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                res.status(400).json({ message: 'Please include all fields' });
            }
            else {
                const userExists = await Users.findOne({ email });
                if (userExists) {
                    res.status(400).json({ status: constants.FAIL, message: constants.USER_ALREADY_EXISTS });
                }
                else {
                    const saltRounds = 10;
                    bcrypt.hash(password, saltRounds, async (err, hash) => {
                        if (!err) {
                            const user = await Users.create({ name, email, password: hash });
                            if (user) {
                                let token = await generateToken(user.email);
                                res.status(201).json({
                                    status: 'success',
                                    data: user,
                                    token: token
                                })
                            } else {
                                res.status(500).json({
                                    status: 'fail',
                                    message: 'Error occurred in user creation',
                                    error: error
                                });
                            }
                        }
                        else {
                            res.status(500).json({
                                status: 'fail',
                                message: 'Error occurred in user creation',
                                error: err
                            });
                        }
                    })
                }
            }
        }
        catch (error) {
            res.status(500).json({
                status: 'fail',
                message: 'Error occurred in user creation',
                error: error.message
            });
        }
    }
);

const loginUser = asyncHandler(
    async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const userExists = await Users.findOne({ email });
            if (userExists) {
                const passwordMatch = await bcrypt.compare(password, userExists.password);
                if (userExists && passwordMatch) {
                    let token = await generateToken(userExists.email);
                    res.status(200).json({
                        status: 'success',
                        _id: userExists._id,
                        name: userExists.name,
                        email: userExists.email,
                        token: token
                    })
                }
                else {
                    res.status(401).json({ status: 'fail', message: 'Invalid Credentials' });
                }
            }
            else {
                res.status(404).json({ status: 'fail', message: 'User does not exist' });
            }
        }
        catch (error) {
            res.status(500).json({
                status: 'fail',
                message: 'Error occurred in user creation',
                error: error.message
            });
        }
    }
);

const generateToken = async (userEmail) => {
    const token = await jwt.sign({ userEmail }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
    return token;
}

module.exports = {
    registerUser,
    loginUser,
}