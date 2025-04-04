import {create} from 'zustand';
import {axiosInstance} from '../lib/axios';
import toast from 'react-hot-toast';

export const incomeStore = create((set) => ({
  userIncome: null,
  isSettingIncomeInfo: false,

  setIncomeInfo: async (data) => {
    set({isSettingIncomeInfo: true});

    try {
      const response = await axiosInstance.post('/auth/signup/income', data);
      set({userIncome: response.data});

      toast.success('Information added Successfully', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } finally {
      set({isSettingIncomeInfo: false});
    }
  },
}));
