import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        profilePic: {
            type: String,
            default: "",
        },
        monthlyIncome: {
            type: Number,
            requried: true,
            default: 0,
        },
        savingGoal: {
            type: Number,
            default: 0 ,
        },
        phoneNumber: {
            type: Number,
            default: 0 ,
        } ,
        occupation: {
            type: String,
            default: "",
        }
    } , 
    {timestamps: true}
);


const User = mongoose.model("User" , userSchema); 


export default User;