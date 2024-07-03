const express = require('express');
const router = express.Router();
const authController = require('../controller/ticket');
const verifyToken = require("../middlewares/verifyAuth");

router.post('/create', verifyToken, authController.createTicket )
router.delete('/delete/:id', verifyToken, authController.deleteTicket )
router.patch('/update/:id', verifyToken, authController.updateTicket )
router.get('/getAllTickets', verifyToken, authController.getAllTickets)

router.get('/getTicket/:userId', verifyToken, authController.getTicketByUserId);
router.patch('/updateTicket/:ticketId', verifyToken, authController.updateTicketByTicketId);

// this endpoint is for share option
router.get('/share/:ticketId', verifyToken, authController.getTicketByTicketId);

module.exports = router;
