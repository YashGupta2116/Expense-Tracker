import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import { generateToken } from '../utils/jwt.util.js';

export const signup = async (req , res) => {
    
        const 
        { 
            email , 
            fullName , 
            password , 
            monthlyIncome , 
            profilePic , 
            savingGoal , 
            phoneNumber , 
            occupation 
        } = req.body;
    
        if(!(password && email && fullName && monthlyIncome)) {
            return res.status(400).json({message: "All fields are required"});
        }
    
        // check if user exist 
    
        const user = await User.findOne({email});
    
        if(user) {
            return res.status(400).json({message: "User with email already exist"});
        }

        if (password.length < 6) {
            return res.status(400).json({message: "Password must be more than 6 characters long !"});
        }

        // hash the password
    
        const salt = await bcrypt.genSalt(10);
    
        const hashedPass = await bcrypt.hash(password , salt);
    
        const newUser = new User({
            email,
            fullName,
            monthlyIncome,
            password: hashedPass,
            profilePic , 
            savingGoal , 
            phoneNumber , 
            occupation ,
        });
         
        if (!newUser) {
            return res.status(400).json("Invalid User data");
        }
    
        generateToken(newUser._id , res);
    
        await newUser.save();
    
        res.status(201).json({
            _id: newUser._id,
            email: newUser.email,
            fullName: newUser.fullName,
            monthlyIncome: newUser.monthlyIncome,
        });
   
};

export const login = async (req , res) => {

};

export const logout = async (req , res) => {

};