import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import { generateToken } from '../utils/jwt.util.js';

export const signup = async (req , res) => {
    
        try {
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
                profilePic: newUser.profilePic,
            });
        } catch (error) {
            console.log("Error in Signup controller" , error.message);
            res.status(500).json({message: "Internal server error"});
        }
   
};

export const login = async (req , res) => {
    try {
        const {email , password} = req.body;
    
        const user = await User.findOne({email});
        // if user doesnt exist give invalid credentials 
        if (!user) {
            return res.status(401).json({message: "Invalid Credentials"});
        }
        // if user exist check password 
        const isPasswordCorrect = await bcrypt.compare(password , user.password);
    
        if (!isPasswordCorrect) {
            return res.status(401).json({message: "Invalid Credentials"});
        }
    
        generateToken(user._id , res);
    
        res.status(201).json({
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            monthlyIncome: user.monthlyIncome,
            profilePic: user.profilePic,
        })
    } catch (error) {
        console.log("Error in Login controller" , error.message);
        res.status(500).json({message: "Internal server error"});
    }
};


export const logout = async (req , res) => {
    try {
        res.cookie("jwt" , "" , {maxAge: 0});
        res.status(200).json({message: "Logged Out Successfully"});
    } catch (error) {
        console.log("Error in Logout controller" , error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};


// upload feature will be added later

// export const updateProfile = async (req , res) => {
//     const { profilePic , monthlyIncome } = req.body;

//     const userId = req.user._id;

//     if (!profilePic) {
//         return res.status(400).json({message: "Profile Pic is required"});
//     }

// }
