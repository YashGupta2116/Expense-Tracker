import mongoose from "mongoose";

const expenseSchema = mongoose.Schema(
  {
    expense: {
      required: true,
      type: Number,
      default: 0,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,    
        default: "Miscelaneous",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;