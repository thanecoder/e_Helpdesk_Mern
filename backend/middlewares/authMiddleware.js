const { constants } = require('../constants');
const Users = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const verifyJSONToken = asyncHandler(
    async (req, res, next) => {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            try{
                // Get token
                token = req.headers.authorization.split(' ')[1];
                // Verify token 
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                console.log(decoded.userEmail);
                // Get user from token and verify with DB minus the password
                req.user = await Users.findOne({email:decoded.userEmail}).select('-password');
                req.user ={
                    id:req.user._id,
                    ...req.user
                }
                next();
            }
            catch(error){
                console.log(error);
                res.status(401).json({
                    error:error.message,
                    message:constants.UNAUTHORIZED
                });
            }
        }
        else{
            res.status(401).json({
                error:error.message,
                message:constants.UNAUTHORIZED
            });
        }
    }
)

module.exports = { 
    verifyJSONToken 
}