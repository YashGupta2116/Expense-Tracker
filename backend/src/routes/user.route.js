import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getHomePage, createNewExpense , getRecentExpenses , getGroupedExpenses , getTotalExpense } from '../controllers/user.controller.js';  

const router = express.Router();

router.post("/dashboard" , protectRoute , getHomePage);
router.post("/create-expense", protectRoute, createNewExpense);
router.post("/expenses", protectRoute, getRecentExpenses);
router.post("/grouped-expenses", protectRoute, getGroupedExpenses);
router.post("/total-expense", protectRoute, getTotalExpense);

export default router;