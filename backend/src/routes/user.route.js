import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getHomePage, createNewExpense , getRecentExpenses } from '../controllers/user.controller.js';  

const router = express.Router();

router.post("/dashboard" , protectRoute , getHomePage);
router.post("/create-expense", protectRoute, createNewExpense);
router.post("/expenses", protectRoute, getRecentExpenses);

export default router;