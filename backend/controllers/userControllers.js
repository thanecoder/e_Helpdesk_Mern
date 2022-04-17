const Users = require('../models/userModel');

const getUsers = async (req, res, next)=>{
    try{
        const txns = await Users.find();
        res.status(200).json({
            status:'success',
            count:txns.length,
            data:txns
        });
    }
    catch(error){
        res.status(500).json({
            status:'failed',
            error:error
        });
    }
} 

const registerUser = async (req, res, next)=>{
    res.send("Register Users");
    const { text, amount } = req.body;
    try{
        const txn = await Users.create(req.body);
        res.status(201).json({
            status:'success',
            data:txn
        })
    }
    catch(error){
        res.status(500).json({
            status:'failed',
            error:error
        });
    }
} 

const loginUser = async (req, res, next)=>{
    res.send("Login Users");
    try{
        // Login Code here
    }
    catch(error){
        res.status(500).json({
            status:'failed',
            error:error
        });
    }
} 

const deleteUser = async (req, res, next)=>{
    const txnId = req.params.id;
    try{
        const txn = await Users.findById(txnId);
        if(!txn){
            res.status(404).json({
                status:'Not Found',
                message:"User Not Found"
            })
        }
        else{
            await txn.remove();
            res.status(200).json({
                status:'success',
            })
        }
    }
    catch(error){
        res.status(500).json({
            status:'failed',
            error:error
        });
    }
}

module.exports = {
    getUsers,
    registerUser,
    loginUser,
    deleteUser
}