import React, {useEffect} from 'react';
import {User, Mail, Edit, IndianRupee, Loader2} from 'lucide-react';
import {useAuthstore} from '../store/useAuthStore';
import {useIncomeStore} from '../store/useIncomeStore';

const ProfilePage = () => {
  const {authUser} = useAuthstore();
  const {getUserIncome, isGettingUserIncome, userIncome} = useIncomeStore();

  useEffect(() => {
    getUserIncome();
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex justify-center items-center p-6'>
      <div className='max-w-lg w-full bg-white shadow-2xl rounded-3xl p-8 border border-gray-200'>
        {/* Profile Header */}
        <div className='flex flex-col items-center'>
          <div className='w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg'>
            <User size={50} />
          </div>
          <h1 className='text-3xl font-semibold text-gray-900 mt-4'>
            {authUser.fullName || 'Example'}
          </h1>
          <p className='text-gray-500 text-lg'>
            {userIncome?.occupation || 'Software Engineer'}
          </p>
        </div>

        {/* Profile Details */}
        <div className='mt-8 space-y-6'>
          <div className='p-4 bg-gray-100 rounded-lg shadow'>
            <span className='text-gray-500 font-bold block'>Email</span>
            <div className='flex items-center text-gray-700 mt-1'>
              <Mail className='mr-2 text-gray-500' size={18} />
              <span className='text-gray-800'>
                {authUser.email || 'example@example.com'}
              </span>
            </div>
          </div>

          {isGettingUserIncome ? (
            <div className='flex justify-center mt-4'>
              <Loader2 className='animate-spin text-blue-500' size={30} />
            </div>
          ) : (
            <>
              <div className='p-4 bg-gray-100 rounded-lg shadow'>
                <span className='text-gray-500 font-bold block'>
                  Monthly Income
                </span>
                <div className='flex items-center text-gray-700 mt-1'>
                  <IndianRupee className='mr-2 text-gray-500' size={18} />
                  <span className='text-gray-800'>
                    {userIncome?.monthlyIncome || 1000}
                  </span>
                </div>
              </div>

              <div className='p-4 bg-gray-100 rounded-lg shadow'>
                <span className='text-gray-500 font-bold block'>
                  Saving Goal
                </span>
                <div className='flex items-center text-gray-700 mt-1'>
                  <IndianRupee className='mr-2 text-gray-500' size={18} />
                  <span className='text-gray-800'>
                    {userIncome?.savingGoal}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Edit Profile Button */}
        <div className='mt-8 flex justify-center'>
          <button className='flex items-center px-5 py-3 bg-white bg-opacity-20 backdrop-blur-lg text-black font-bold rounded-lg shadow-md hover:bg-opacity-30 transition-all border border-white/30'>
            <Edit className='mr-2' size={18} color='black' />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
