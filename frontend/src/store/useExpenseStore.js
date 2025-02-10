import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useExpenseStore = create((set) => ({
    
    isCreatingExpense: false,

    newExpense: async (data) => {
        set({ isCreatingExpense: true });
        
        try {
            const response = axiosInstance.post("/user/create-expense", data);
    
            if (!response) {
                return toast.error("Error in creating new expense");
            }
    
            return toast.success("New Expense added");
        } catch (error) {
            console.log("Error in creating expense: " , error.message);
            return toast.error("Error in creating new expense");
        } finally {
            set({ isCreatingExpense: false });
        }

    },

    recentExpenses: null,
    isGettingRecentExpenses: false,

    getRecentExpenses: async () => {
        set({ isGettingRecentExpense: true });
        try {
            const response = await axiosInstance.post("/user/expenses");
    
            console.log("API Response:", response);
    
            const today = new Date();
            const thirtyDays = new Date();
            thirtyDays.setDate(today.getDate() - 30);
    
            const data = response.data.data.expenses.filter((expense) => {
                const expenseDate = new Date(expense.date);
                console.log("Expense Date Parsed:", expenseDate, "Thirty Days Ago:", thirtyDays);
    
                return expenseDate >= thirtyDays && expenseDate <= today;
            });
    
            console.log("Filtered Recent Expenses:", data);
    
            if (!data || data.length === 0) {
                return toast.error("No recent expenses found");
            }
    
            set({ recentExpenses: data });
        } catch (error) {
            console.error("Error fetching expenses:", error);
            toast.error(error.message || "An error occurred");
        } finally {
            set({ isGettingRecentExpense: false });
        }
    }
}))