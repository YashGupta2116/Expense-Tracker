import { Briefcase,  ChevronDown,  HandCoins, IndianRupee, Loader2, MoveRight } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BlurText from '../components/BlurText/BlurText'
import {incomeStore} from '../store/useIncomeStore'
import toast from 'react-hot-toast'

const IncomeInfoPage = () => {

    const navigate = useNavigate();

    const { setIncomeInfo , isSettingIncomeInfo } = incomeStore();

    const [ formData , setFormData ] = useState({
        monthlyIncome: '' ,
        savingGoal: '' ,
        occupation: '' ,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const success = validateForm();

        if (success === true) {
            setIncomeInfo(formData).then(() => navigate("/")).catch((err) => {
                console.error("Information updation error:", err);
                toast.error("Income information update failed. Please try again.");
            });
        }
    }

    const validateForm = () => {
        if (formData.monthlyIncome <= 1000) return toast.error("Monthly income should be greater than 1000" , 
            {
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            });

        const options = ['enginner' , 'doctor' , 'teacher' , 'student' , 'other'];
            
        if (!options.includes(formData.occupation.trim().toLowerCase())) return toast.error("Occupation is required" , 
            {
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            });

        if (!formData.savingGoal.trim() > 1000) return toast.error("Saving Goal is required" , 
            {
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            });

        if (formData.monthlyIncome <= formData.savingGoal) return toast.error("Saving Goal cannot be greater than income" , 
            {
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            });
        return true;
    }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="hidden lg:block relative overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-48 left-20 text-white ">
          <BlurText text='Tell us about yourself' className='text-4xl font-bold mb-6'/>
          <p className="text-lg text-white/80 ml-8">Smart decisions begin with clear insights</p>
        </div>
      </div>

      {/* right side */}

      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">

            <form onSubmit={handleSubmit} className='space-y-6'>
                <div className="form-control">
                    <label className="label mb-3">
                        <span className="label-text font-medium text-white">Monthly Income</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <IndianRupee className="size-5 text-base-content/40" />
                        </div>
                        <input
                            type="number"
                            className={`input input-bordered w-full pl-10 py-8`}
                            placeholder="eg: 10000"
                            value={formData.monthlyIncome}
                            onChange={(e) => setFormData({...formData , monthlyIncome: e.target.value}) }
                        />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label mb-3">
                        <span className="label-text font-medium text-white">Occupation</span>
                    </label>
                    <div className="relative">
                        {/* Icon for Occupation */}
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase className="size-5 text-base-content/40" />
                        </div>
                        {/* Occupation Select Dropdown */}
                        <select
                            name="occupation"
                            className="input input-bordered w-full pl-10 py-8"
                            defaultValue="" // Use defaultValue to set the initial value
                            value={formData.occupation}
                            onChange={(e) => setFormData({...formData , occupation: e.target.value})}
                        >
                            <option value="" disabled>
                                Select your occupation
                            </option>
                            <option value="engineer">Engineer</option>
                            <option value="doctor">Doctor</option>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                            <option value="other">Other</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <ChevronDown className="size-5 text-base-content/40" />
                        </div>
                    </div>
                </div>

                <div className="form-control">
                    <label className="label mb-3">
                        <span className="label-text font-medium text-white">Saving Goal</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <HandCoins className='size-5 text-base-content/40' />
                        </div>
                        <input
                            type="number"
                            className={`input input-bordered w-full pl-10 py-8`}
                            placeholder="eg: 5000"
                            value={formData.savingGoal}
                            onChange={(e) => setFormData({...formData , savingGoal: e.target.value})}
                        />
                    </div>
                </div>

                <div className="ml-40">
                    <button 
                        className="btn btn-soft btn-sm sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl rounded-xl flex items-center justify-center gap-2"
                        type='submit'
                        disabled={isSettingIncomeInfo}
                    >
                        {isSettingIncomeInfo ? (
                    <>
                    <Loader2 className="size-5 animate-spin" />
                    Loading...
                    </>
                ) : <>
                        <span className="mb-1">next </span>
                        <MoveRight className='size-5 text-base-content/40' />
                    </>}
                    </button>
                </div>
            </form>

            

        </div>

      </div>
    </div>
  )
}

export default IncomeInfoPage