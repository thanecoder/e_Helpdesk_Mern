const Users = require('../models/userModel');
const Tickets = require('../models/ticketModel');
const { constants } = require('../constants');

const getAllTickets = async (req, res, next)=>{
    // Check if user is valid
    const user = await Users.findById(req.user.id);
    if(!user){
        res.status(401).json({
            status:constants.FAIL,
            message:constants.NOT_FOUND_USER
        });  
    }
    try{
        const tickets = await Tickets.find({user:req.user.id});
        res.status(200).json({
            status:constants.SUCCESS,
            count:tickets.length,
            data:tickets
        });
    }
    catch(error){
        res.status(500).json({
            status:constants.FAIL,
            error:error
        });
    }
} 

const getTicket = async (req, res, next)=>{
    // Check if user is valid
    const user = await Users.findById(req.user.id);
    if(!user){
        res.status(401).json({
            status:constants.FAIL,
            message:constants.NOT_FOUND_USER
        });  
    }
    try{
        const ticketId = req.params.id;
        const ticket = await Tickets.findById(ticketId); 
        if(!ticket){
            res.status(404).json({
                status:constants.FAIL,
                message:constants.NOT_FOUND_TICKET
            }); 
        }
        if(ticket.user.toString() != req.user.id.toString()){
            res.status(401).json({
                status:constants.FAIL,
                message:constants.UNAUTHORIZED
            });
        }
        res.status(200).json({
            status:constants.SUCCESS,
            data:ticket
        });
    }
    catch(error){
        res.status(500).json({
            status:constants.FAIL,
            message:error
        });
    }
} 

const addTicket = async (req, res, next)=>{
    // Check if user is valid
    const user = await Users.findById(req.user.id);
    if(!user){
        res.status(401).json({
            status:constants.FAIL,
            message:constants.NOT_FOUND_USER
        });  
    }
    try{
        const { product, description } = req.body;
        // Check if ticket data is valid
        if(!product || !description){
            res.status(500).json({
                status:constants.FAIL,
                message:constants.INCOMPLETE_TICKET_DETAILS
            });
        }
        const ticket = await Tickets.create({
            product, 
            description,
            user:req.user.id,
            status:constants.TICKET_STATUS.NEW
        });
        res.status(201).json({
            status:constants.SUCCESS,
            data:ticket,
            message:constants.TICKET_CREATE_SUCCESS
        })
    }
    catch(error){
        res.status(500).json({
            status:constants.FAIL,
            error:error,
            message:constants.TICKET_CREATE_FAILED
        });
    }
} 

const updateTicket = async (req, res, next)=>{
    // Check if user is valid
    const user = await Users.findById(req.user.id);
    if(!user){
        res.status(401).json({
            status:constants.FAIL,
            message:constants.NOT_FOUND_USER
        });  
    }
    try{
        const ticketId = req.params.id;
        const ticket = await Tickets.findById(ticketId); 
        if(!ticket){
            res.status(404).json({
                status:constants.FAIL,
                message:constants.NOT_FOUND_TICKET
            })
        }
        else{
            // new:true means create a new ticket if tht ticket does not exist
            const updatedTicket = await Tickets.findByIdAndUpdate(ticketId, req.body);
            res.status(200).json({
                status:constants.SUCCESS,
                message:constants.TICKET_UPDATE_SUCCESS,
                data:updatedTicket
            })
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            status:constants.FAIL,
            error:error,
            message:constants.TICKET_UPDATE_FAILED
        });
    }
} 

const deleteTicket = async (req, res, next)=>{
    // Check if user is valid
    const user = await Users.findById(req.user.id);
    if(!user){
        res.status(401).json({
            status:constants.FAIL,
            message:constants.NOT_FOUND_USER
        });  
    }
    try{
        const ticketId = req.params.id;
        const ticket = await Tickets.findById(ticketId);
        if(!ticket){
            res.status(404).json({
                status:constants.FAIL,
                message:constants.NOT_FOUND_TICKET
            })
        }
        else{
            if(!ticket){
                res.status(401).json({
                    status:constants.FAIL,
                    message:constants.NOT_FOUND_TICKET
                }); 
            }
            if(ticket.user.toString() != req.user.id.toString()){
                res.status(401).json({
                    status:constants.FAIL,
                    message:constants.UNAUTHORIZED
                });
            }
            await ticket.remove();
            res.status(200).json({
                status:constants.SUCCESS,
                message:constants.TICKET_DELETE_SUCCESS
            })
        }
    }
    catch(error){
        res.status(500).json({
            status:constants.FAIL,
            error:error,
            message:constants.TICKET_DELETE_FAILED
        });
    }
}

module.exports = {
    getAllTickets,
    getTicket,
    addTicket,
    updateTicket,
    deleteTicket
}