import Income from "../models/income.model.js";
import Expense from "../models/expenses.model.js";


export const getHomePage = async (req , res) => {
    try {
        const user = req.user ;
    
        const userInfo = await Income.findOne({userId: user._id});
    
        if(!userInfo) return res.status(400).json({ error: "User income info not found" });
    
        const { monthlyIncome, savingGoal } = userInfo;

        return res.status(200).json({ monthlyIncome , savingGoal });
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

const getGroupedExpensesByCategory = async (userId) => {

    try {
        const groupedData = await Expense.aggregate([
            { $match: { userId } },
            { $unwind: "$expenses" },
            {
                $group: {
                    _id: "$expenses.category",
                    totalAmount: { $sum: "$expenses.amount" },
                    expenses: { $push: "$expenses" },
                },
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    totalAmount: 1,
                    expenses: 1,
                },
            },
            {
                $sort: { totalAmount: -1 },
            }
            
        ]);

        return groupedData;
    } catch (error) {
        throw new Error(`Error fetching grouped expenses: ${error.message}`);
    }
}


export const getGroupedExpenses = async (req, res) => {
    const userId = req.user._id; // Get the userId from the request params
    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        const groupedExpenses = await getGroupedExpensesByCategory(userId);
        res.status(200).json(groupedExpenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export const getTotalExpense = async (req, res) => {
    const userId = req.user._id;

    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30); // Get date 30 days ago

        const totalExpense = await Expense.aggregate([
            { $match: { userId } }, // Match user expenses
            { $unwind: "$expenses" }, // Unwind the expenses array
            { 
                $match: { "expenses.date": { $gte: thirtyDaysAgo } } // Filter last 30 days
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$expenses.amount" } // Sum of expenses
                }
            },
            {
                $project: {
                    _id: 0,
                    totalAmount: 1
                }
            }
        ]);

        res.status(200).json(totalExpense[0] || { totalAmount: 0 });
    } catch (error) {
        res.status(500).json({ error: `Error calculating total expenses: ${error.message}` });
    }
};
