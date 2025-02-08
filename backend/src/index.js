import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './DB/db.js';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js'

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
// routes


app.use("/api/auth" , authRoutes);
app.use("/api/user" , userRoutes);

app.listen(PORT , () => {
    console.log("App is listening on port:"+PORT || 8000);
    connectDB();
})

