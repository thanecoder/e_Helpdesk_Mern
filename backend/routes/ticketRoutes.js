const express = require("express");
const router = express.Router();
const {
  getTickets,
  addTicket,
  deleteTicket,
} = require("../controllers/ticketControllers");

router.route("/").get(getTickets).post(addTicket);

router.route("/:id").delete(deleteTicket);

module.exports = router;
