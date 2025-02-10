import React, { useEffect, useState } from "react";
import { useDashboardStore } from "../store/useDashboardStore";
import { useExpenseStore } from "../store/useExpenseStore";
import toast from "react-hot-toast";
import {IndianRupee, Percent} from "lucide-react"

const HomePage = () => {
  const [dashboardInfo, setDashboardInfo] = useState({
    totalBalance: "0",
    monthlyExpense: "0",
    savings: "0",
  });

  const [expenseBreakdown, setExpenseBreakdown] = useState([]);

  const { getDashboard } = useDashboardStore();
  const { isFetchingGroupedExpense, fetchGroupedExpense , getTotalExpense , isGettingTotalExpense} = useExpenseStore();

  
  useEffect(() => {
    const fetchDashboard = async () => {
      const data = await getDashboard();
      const totalExpense = await getTotalExpense();
      if (!data) {
        return toast.error("Cannot fetch data");
      }
      if (!totalExpense) {
        return toast.error("Cannot fetch totalExpense");
      }

      console.log("Dashboard data :", data);
      console.log("totalExpene : ", totalExpense.totalAmount)
      
      const balance = data.monthlyIncome - totalExpense.totalAmount;

      const saved = balance * 20 / 100; 
      
      console.log(balance , saved , totalExpense)
      setDashboardInfo({ ...dashboardInfo , savings: saved , totalBalance: balance , monthlyExpense: totalExpense.totalAmount})

    };

    fetchDashboard();

    const fetchExpenseBreakdown = async () => {
      const data = await fetchGroupedExpense();

      if (!data) {
        toast.error("cannot fetch expense breakdown ")
      }
      setExpenseBreakdown(data);
    }

    fetchExpenseBreakdown();
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-800 pt-20 p-6">
      <section className="max-w-7xl mx-auto">
        {/* Financial Dashboard Header */}
        <div className="text-center mb-8 text-white">
          <h1 className="text-4xl font-bold">Financial Dashboard</h1>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Balance Card */}
          <div className="card bg-white shadow-lg p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800">
              Total Balance
            </h2>
            <p className="text-2xl font-bold text-blue-600">{ dashboardInfo.totalBalance }</p>
            <p className="text-sm text-green-500"></p>
          </div>

          {/* Monthly Expenses Card */}
          <div className="card bg-white shadow-lg p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800">
              Monthly Expenses
            </h2>
            <p className="text-2xl font-bold text-red-600">{ dashboardInfo.monthlyExpense }</p>
            <p className="text-sm text-gray-500">Last 30 days</p>
          </div>

          {/* Savings Card */}
          <div className="card bg-white shadow-lg p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800">Available To Invest</h2>
            <p className="text-2xl font-bold text-green-600">{ dashboardInfo.savings }</p>
            <p className="text-sm text-gray-500">Available to invest</p>
          </div>
        </div>

        {/* Expense Breakdown Section */}
        <div className="mt-10 bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Expense Breakdown</h2>
          {isFetchingGroupedExpense ? (<span>loading....</span>) : (<ul>
            {expenseBreakdown.map((expense, index) =>
            (<li key={index} className="flex justify-between text-gray-700 font-bold text-xl">
              
              <span>{expense.category}</span>
              <div className="flex items-center">
                <IndianRupee size={14} className="mr-1" />
                <span>{expense.totalAmount}</span>
              </div>
              
            </li>
              
              ))}
          </ul>) }
          
        </div>

        {/* Investment Recommendations Section */}
        {/* <div className="mt-10 bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Investment Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-100 rounded-lg">
              <h3 className="text-lg font-bold text-blue-800">Mutual Funds</h3>
              <p className="text-gray-700">
                Low-risk investment option with diversified portfolio
              </p>
              <p className="text-sm text-gray-500">Average return: 8-12% annually</p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg">
              <h3 className="text-lg font-bold text-green-800">Fixed Deposits</h3>
              <p className="text-gray-700">
                Secure investment with guaranteed returns
              </p>
              <p className="text-sm text-gray-500">Fixed return: 5-8% annually</p>
            </div>
          </div>
        </div> */}
      </section>
    </div>
  );
};

export default HomePage;
