import mongoose , {Schema} from 'mongoose'


const incomeSchema = new Schema(
    {
        occupation: {
            type: String,
            default: "",
            required: true,
        },
        monthlyIncome: {
            type: Number,
            requried: true,
            default: 0,
        },
        savingGoal: {
            type: Number,
            default: 0 ,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    } , 
    { timestamps: true }
);

const Income = mongoose.model("Income" , incomeSchema);

export default Income;