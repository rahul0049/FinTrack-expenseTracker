import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { addMoneyToAccount, createAccount, getAccounts, deleteAccount } from "../controllers/accountController.js";
const router = express.Router()
router.get("/", authMiddleware, getAccounts);
router.post("/create", authMiddleware, createAccount);
router.put("/add-money/:id", authMiddleware, addMoneyToAccount);
router.delete("/:id", authMiddleware, deleteAccount);
export default router; 