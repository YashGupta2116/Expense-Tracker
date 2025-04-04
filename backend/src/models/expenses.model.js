import mongoose from 'mongoose';

const expenseItemSchema = new mongoose.Schema({
  category: {type: String, required: true}, // Category of the expense
  description: {type: String, default: 'Miscellaneous'}, // Optional description
  amount: {type: Number, required: true}, // Expense amount
  date: {type: Date, default: Date.now}, // Date of the expense
});

const expenseSchema = new mongoose.Schema(
  {
    expenses: [expenseItemSchema],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {timestamps: true}
);

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
