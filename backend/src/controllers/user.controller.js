import Income from "../models/income.model.js";
import Expense from "../models/expenses.model.js";

export const getHomePage = async (req , res) => {
    try {
        const user = req.user ;
    
        const userInfo = await Income.findOne({userId: user._id});
    
        if(!userInfo) return res.status(400).json({ error: "User income info not found" });
    
        return res.status(200).json(userInfo);
    } catch (error) {
        console.error("Error in getHomePage:", error);
        return res.status(500).json({ message: error.message });
    }
};


export const createNewExpense = async (req, res) => {
    try {
        const user = req.user;

        const { amount , description, date , category } = req.body;

        let userExpenses = await Expense.findOne({ userId: user._id });

        if (!userExpenses) {
          // If no document exists for the user, create one
          userExpenses = new Expense({
            userId: user._id,
            expenses: [{amount , description, date , category}],
          });
        } else {
            // Add the new expense to the array
            userExpenses.expenses.push({ category, description, amount, date });
        }
    
        // Save the updated document
        await userExpenses.save();
    
        res.status(201).json({
          success: true,
          message: "Expense added successfully"
        });

    } catch (error) {
        console.log("error in the createNewExpense");
        res.status(500).json({ message: "Internal Server Error" });
    }

}


export const getRecentExpenses = async (req, res) => {
    try {
        const userId = req.user._id;

        const allExpenses = await Expense.findOne({ userId });

        if (!allExpenses) {
            return res.status(400).json({ message: "Cant get allExpenses in getRecentExpenses" });
        }

        return res.status(200).json({ success: true , message: "All expenses fetched" , data: allExpenses });

    } catch (error) {
        console.log("error in getRecentExpenses: ", error.message);

    }
}