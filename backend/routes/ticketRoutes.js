const express = require("express");
const router = express.Router();
const ticketControllers = require("../controllers/ticketControllers");
const authMiddleWare = require('../middlewares/authMiddleware');

router.get("/", authMiddleWare.verifyJSONToken, ticketControllers.getAllTickets)
router.get("/:id", authMiddleWare.verifyJSONToken, ticketControllers.getTicket)
router.post("/addTicket", authMiddleWare.verifyJSONToken, ticketControllers.addTicket);
router.put("/:id", authMiddleWare.verifyJSONToken, ticketControllers.updateTicket);
router.delete("/:id", authMiddleWare.verifyJSONToken, ticketControllers.deleteTicket);

module.exports = router;
