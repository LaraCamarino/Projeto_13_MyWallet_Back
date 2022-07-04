import { Router } from "express";
import { getTransactions, createNewTransaction, deleteTransaction } from "../controllers/transactionsController.js";
import validateNewTransaction from "../middlewares/validateNewTransaction.js";
import validateToken from "../middlewares/validateToken.js";

const router = Router();

router.post("/transactions", validateToken, validateNewTransaction, createNewTransaction);
router.get("/transactions", validateToken, getTransactions);
router.delete("/transactions/:id", deleteTransaction);

export default router;

