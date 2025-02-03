import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './DB/db.js';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

// routes

app.use("/api/auth" , authRoutes);

app.listen(PORT , () => {
    console.log("App is listening on port:"+PORT || 8000);
    connectDB();
})

