const Tickets = require('../models/ticketModel');

const getTickets = async (req, res, next)=>{
    try{
        const txns = await Tickets.find();
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

const addTicket = async (req, res, next)=>{
    // res.send("ADD POST Tickets");
    const { text, amount } = req.body;
    try{
        const txn = await Tickets.create(req.body);
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

const deleteTicket = async (req, res, next)=>{
    const txnId = req.params.id;
    try{
        const txn = await Tickets.findById(txnId);
        if(!txn){
            res.status(404).json({
                status:'Not Found',
                message:"Ticket Not Found"
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
    getTickets,
    addTicket,
    deleteTicket
}