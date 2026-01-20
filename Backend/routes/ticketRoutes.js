import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  getAllTickets,
  getMyTickets,
  createTicket,
  updateTicket,
  deleteTicket
} from "../controllers/ticketController.js";

const router = express.Router();

// GET /api/gettickets - all tickets (maybe admin only)
router.get("/gettickets", authenticate, getAllTickets);

// GET /api/tickets/my - logged-in user's tickets
router.get("/my", authenticate, getMyTickets);

// POST /api/createtickets - create new ticket
router.post("/createtickets", authenticate, createTicket);

// PUT /api/tickets/update:id - update ticket
router.put("/update:id", authenticate, updateTicket);

// DELETE /api/tickets/delete:id - delete ticket
router.delete("/delete:id", authenticate, deleteTicket);

export default router;
