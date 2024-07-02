const Ticket = require('../models/ticket')

const createTicket = async(req, res, next)=>{
    try {
        const {title, priority, checklist, dueDate, todo, backlog, progress, done,} =req.body;
        
        if(!title || !priority || !checklist ){
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        const currentUserId = req.currentUserId;
        const userTicket = new Ticket({
            title, priority, checklist, dueDate, todo, backlog, progress, done,
             refUserId: currentUserId,
        });

        await userTicket.save();
        res.json({ message: "ticket created successfully"})

    } catch (error){
        next(error);
    }
}

// update ticket
const updateTicket = async(req, res, next)=>{
    try {
        const {id} = req.params;
        const { title, priority, checklist, dueDate, todo, backlog, progress, done,} =req.body;
        
        const isExistTicket = await Ticket.findByIdAndUpdate(id, {title, priority, checklist, dueDate, todo, backlog, progress, done,},{new: true})

        if(!isExistTicket){
            return res.status(409).json({
                errorMessage: "ticket does not Exist",
            });
        }
            // await isExistTicket.updateTicket({title:title},{ priority: priority }, { checklist: checklist }, {dueDate:dueDate});
            res.status(200).json({ message: "ticket details updated successfully"})

    } catch (error){
        next(error);
    }
}

const deleteTicket =async(req, res, next) => {
    try{
        const {id} = req.params;
        const isExistTicket = await Ticket.findByIdAndDelete(id)
        
        if (!isExistTicket) {
            return res.status(404).json({ message: 'Ticket not found' });
          }

        res.status(200).json({ message: "ticket deleted successfully"})
    }catch (error){
        next(error);
    }
}

// get all jobs
const getAllTickets = async(req, res, next) => {
    try {
        const tickets = await Ticket.find({});
        res.json({data:tickets});
    } catch (error) {
        next(error);
    }
}

// send user Id to get that person tickets
const getTicketByUserId = async (req, res, next) => {
    try{
        const {userId} = req.params;
        const tickets = await Ticket.find({});
        
        const userTickets = tickets.filter(ticket => ticket.refUserId?.toString() === userId);

        if (userTickets.length === 0) {
            return res.status(404).json({
                errorMessage: "No tickets found for the given user",
            });
        }

        res.json({ tickets: userTickets });
    }
    catch (error){
        next(error);
    }
}

const updateTicketByUserId = async (req, res, next) => {
    try {
        const { ticketId } = req.params;
        const { title, priority, checklist, dueDate, todo, backlog, progress, done } = req.body;
        
        const isExistTicket = await Ticket.findOne({ _id: ticketId });

        if (!isExistTicket) {
            return res.status(409).json({
                errorMessage: "Ticket does not exist",
            });
        }

        // Update the ticket
        const updatedTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            {
                $set: { title, priority, checklist, dueDate, todo, backlog, progress, done },
            },
            { new: true }
        );

        res.status(200).json({ message: "Ticket details updated successfully", data: updatedTicket });
    } catch (error) {
        next(error);
    }
};

const getTicketByTicketId = async (req, res, next) => {
    try {
        const { ticketId } = req.params;
        const ticket = await Ticket.findById(ticketId);
        
        if (!ticket) {
            return res.status(404).json({
                errorMessage: "Ticket not found",
            });
        }
        res.json({ data: ticket });
        
    } catch (error) {
        next(error);
    }
}


module.exports = {
    createTicket,
    updateTicket,
    deleteTicket,
    getAllTickets,
    getTicketByUserId,
    updateTicketByUserId,
    getTicketByTicketId,
}