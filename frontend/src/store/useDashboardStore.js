import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import {toast} from 'react-hot-toast'

export const useDashboardStore = create((set) => ({
    isGettingDashboard: false,

    getDashboard: async () => {

        set({ isGettingDashboard: true });

        try {
            const response = await axiosInstance.post("/user/dashboard");
    
            if (!response) return toast.error("Couldn't load the dashboard" , {
                style: {
    
                }
            });
    
            // want to return it here    
            return response.data;     

        } catch (error) {
            console.log("Error in getDashboard" , error.message);
            return toast.error("Internal Server error: Couldnt load the dashboard");
        } finally {
            set({ isGettingDashboard: false })
        }
    }
    
})) 