import React, { useEffect, useState } from 'react'
import { useExpenseStore } from '../store/useExpenseStore';
import toast from 'react-hot-toast';

const ExpensePage = () => {

    const [ formData , setFormData ] = useState({
        amount: 0,
        description: '',
        category: ''
    });

    const {
        isCreatingExpense,
        newExpense,
        recentExpenses,
        getRecentExpenses,
        isGettingRecentExpenses
    } = useExpenseStore();

    const handleSubmit = (e) => {
        e.preventDefault();

        const success = validateForm();

        if (success) {
            newExpense(formData).catch((err) => toast.error("Something went wrong"));
        }
    }

    const validateForm = () => {
        if (formData.amount === "") {
            return toast.error("Amount cannot be empty");
        }
        
        if (formData.category === "") {
            return toast.error("category cannot be empty");
        }

        return true;
    }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-20">
    {/* Page Header */}
    <div className="mb-8">
      <h1 className="text-3xl font-bold">Manage Your Expenses</h1>
      <p className="text-gray-400">Keep track of your spending effortlessly</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Add Expense Section */}
      <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Add Expense</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={(e) => setFormData({...formData , amount: e.target.value})}
              placeholder="Enter amount"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData , description: e.target.value})}
              placeholder="Enter description"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          {/* Category Input */}
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={(e) => setFormData({...formData , category: e.target.value})}
              placeholder="Enter category"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg focus:outline-none transition"
            disabled={isCreatingExpense}
          >
            {isCreatingExpense ? "Adding..." : "Add Expense"}
          </button>
        </form>
      </div>

      {/* Recent Expenses Section */}
      {/* <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Recent Expenses</h2>
        {isGettingRecentExpenses ? (
          <p className="text-gray-400">Loading...</p>
        ) : recentExpenses.length === 0 ? (
          <p className="text-gray-400">No recent expenses</p>
        ) : (
          <div className="space-y-4">
            {recentExpenses.map((expense, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-gray-700 rounded-lg"
              >
                <div>
                  <p className="text-lg font-medium">{expense.description}</p>
                  <p className="text-sm text-gray-400">
                    {expense.category} - ₹{expense.amount}
                  </p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(expense.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div> */}
    </div>
  </div>
  )
}

export default ExpensePage