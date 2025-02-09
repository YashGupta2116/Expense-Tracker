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

            if (!response) {
                return toast.error("failed to get recent expenses");
            }

            set({ recentExpense: response.data });
        } catch (error) {
            return toast.error(error);
        } finally {
            set({ isGettingRecentExpense: false });
        }
    }
}))