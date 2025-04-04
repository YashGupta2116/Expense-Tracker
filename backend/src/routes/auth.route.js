import express from 'express';
import {
  signup,
  login,
  logout,
  checkAuth,
  incomeInfo,
} from '../controllers/auth.controller.js';
import {protectRoute} from '../middlewares/auth.middleware.js';
import {upload} from '../middlewares/multer.middleware.js';
const router = express.Router();

router.post('/signup', upload.single('profilePic'), signup);
router.post('/signup/income', incomeInfo);
router.post('/login', login);
router.post('/logout', logout);
// router.patch("/update-profile" , protectRoute , updateProfile)
// update to be added later
router.get('/check', protectRoute, checkAuth);

export default router;
