import mongoose , {Schema} from 'mongoose';


const incomeSchema = new Schema({
    monthlyIncome: {
        type: Number,
        requried: true,
        default: 0,
    },
    savingGoal: {
        type: Number,
        default: 0 ,
    },
    occupation: {
        type: String,
        default: "",
    }
} , {timestamps: true});


const Income = mongoose.model("Income" , incomeSchema);

export default Income;