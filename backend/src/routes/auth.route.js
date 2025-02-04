import express from 'express';
import {signup , login , logout} from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();


router.post("/signup" , signup);
router.post("/login" , login);
router.post("/logout" , logout);
// router.patch("/update-profile" , protectRoute , updateProfile) 
// update to be added later

export default router;