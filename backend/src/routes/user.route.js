import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getHomePage } from '../controllers/user.controller.js';


const router = express.Router();

router.post("/home" , protectRoute , getHomePage);


export default router;