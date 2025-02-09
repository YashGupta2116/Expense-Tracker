//TODO: add the agregation pipelines when expense page is made 

import React, { useEffect, useState } from "react";
import { useDashboardStore } from "../store/useDashboardStore";

const HomePage = () => {
  const [dashboardInfo, setDashboardInfo] = useState({
    totalBalance: "0",
    motnhlyExpense: "0",
    savings: "0",
  });

  const { getDashboard } = useDashboardStore();

  try {
    useEffect(() => {
      const fetchDashboard = async () => {
        const data = await getDashboard();

        if (!data) {
          return toast.error("Cannot fetch data");
        }

        console.log("Dashboard data :", data);

        const newSavings = totalExpenses;

        setDashboardInfo({ ...dashboardInfo, savings: newSavings });
      };

      fetchDashboard();
    }, []);
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="min-h-screen bg-indigo-900 pt-20 p-6">
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
            <p className="text-2xl font-bold text-blue-600">$4,280.00</p>
            <p className="text-sm text-green-500">+12% from last month</p>
          </div>

          {/* Monthly Expenses Card */}
          <div className="card bg-white shadow-lg p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800">
              Monthly Expenses
            </h2>
            <p className="text-2xl font-bold text-red-600">$2,150.00</p>
            <p className="text-sm text-gray-500">Last 30 days</p>
          </div>

          {/* Savings Card */}
          <div className="card bg-white shadow-lg p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800">Savings</h2>
            <p className="text-2xl font-bold text-green-600">$2,130.00</p>
            <p className="text-sm text-gray-500">Available to invest</p>
          </div>
        </div>

        {/* Expense Breakdown Section */}
        {/* <div className="mt-10 bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Expense Breakdown</h2>
          <ul>
            <li className="flex justify-between text-gray-700">
              <span>Housing</span>
              <span>$850.00 (40%)</span>
            </li>
            <li className="flex justify-between text-gray-700">
              <span>Food & Groceries</span>
              <span>$450.00 (21%)</span>
            </li>
            <li className="flex justify-between text-gray-700">
              <span>Transportation</span>
              <span>$300.00 (14%)</span>
            </li>
            <li className="flex justify-between text-gray-700">
              <span>Entertainment</span>
              <span>$200.00 (9%)</span>
            </li>
          </ul>
        </div> */}

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
