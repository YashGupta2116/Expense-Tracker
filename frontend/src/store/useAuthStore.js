import {create} from 'zustand';
import {axiosInstance} from '../lib/axios';
import {toast} from 'react-hot-toast';

export const useAuthstore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');

      set({authUser: res.data});
    } catch (error) {
      console.log('Error in checkAuth', error);
      set({authUser: null});
    } finally {
      set({isCheckingAuth: false});
    }
  },

  signup: async (data) => {
    set({isSigningUp: true});

    try {
      const res = await axiosInstance.post('/auth/signup', data);

      set({authUser: res.data});

      toast.success('Account Created Successfully', {
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
      set({isSigningUp: false});
    }
  },

  logout: async (res) => {
    try {
      await axiosInstance.post('/auth/logout');
      set({authUser: null});
      toast.success('Logged out successfully', {
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
    }
  },

  login: async (data) => {
    set({isLoggingIn: true});
    try {
      const res = await axiosInstance.post('/auth/login', data);
      set({authUser: res.data});
      toast.success('Logged in Successfully', {
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
      set({isLoggingIn: false});
    }
  },
}));
