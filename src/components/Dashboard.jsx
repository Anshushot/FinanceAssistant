import React, { useState } from 'react';
import ExpensePieChart from './ExpensePieChart';

const Dashboard = () => {
  // State for financial summary
  const [financialSummary, setFinancialSummary] = useState({
    totalBalance: 2500.00,
    monthlyIncome: 3500.00,
    monthlyExpenses: 2800.00,
    savingsRate: 20,
  });

  // State for transactions
  const [transactions, setTransactions] = useState([
    { id: 1, description: 'Grocery Shopping', amount: -120.50, date: '2024-03-27', category: 'Food' },
    { id: 2, description: 'Salary Deposit', amount: 3500.00, date: '2024-03-26', category: 'Income' },
    { id: 3, description: 'Netflix Subscription', amount: -15.99, date: '2024-03-25', category: 'Entertainment' },
    { id: 4, description: 'Gas', amount: -45.00, date: '2024-03-24', category: 'Transportation' },
    { id: 5, description: 'Electricity Bill', amount: -85.00, date: '2024-03-23', category: 'Utilities' },
    { id: 6, description: 'Restaurant', amount: -65.00, date: '2024-03-22', category: 'Food' },
    { id: 7, description: 'Internet Bill', amount: -45.00, date: '2024-03-21', category: 'Utilities' },
    { id: 8, description: 'Movie Tickets', amount: -25.00, date: '2024-03-20', category: 'Entertainment' },
    { id: 9, description: 'Bus Pass', amount: -30.00, date: '2024-03-19', category: 'Transportation' },
    { id: 10, description: 'Shopping', amount: -150.00, date: '2024-03-18', category: 'Shopping' },
  ]);

  // State for financial goals
  const [goals, setGoals] = useState([
    { id: 1, name: 'Emergency Fund', target: 10000, current: 5000, progress: 50 },
    { id: 2, name: 'Vacation Fund', target: 5000, current: 2000, progress: 40 },
    { id: 3, name: 'New Car', target: 25000, current: 5000, progress: 20 },
  ]);

  // Handler for updating financial summary
  const handleSummaryChange = (field, value) => {
    setFinancialSummary(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  // Handler for updating transactions
  const handleTransactionChange = (id, field, value) => {
    setTransactions(prev => prev.map(transaction => {
      if (transaction.id === id) {
        return {
          ...transaction,
          [field]: field === 'amount' ? parseFloat(value) || 0 : value
        };
      }
      return transaction;
    }));
  };

  // Handler for updating goals
  const handleGoalChange = (id, field, value) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === id) {
        const newValue = parseFloat(value) || 0;
        const updatedGoal = {
          ...goal,
          [field]: newValue
        };
        if (field === 'current' || field === 'target') {
          updatedGoal.progress = Math.round((updatedGoal.current / updatedGoal.target) * 100);
        }
        return updatedGoal;
      }
      return goal;
    }));
  };

  // Filter expenses from transactions
  const expenses = transactions.filter(transaction => transaction.amount < 0);

  return (
    <div className="space-y-6">
      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-600 p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h3 className="text-blue-100 text-sm font-medium">Total Balance</h3>
          <input
            type="number"
            value={financialSummary.totalBalance}
            onChange={(e) => handleSummaryChange('totalBalance', e.target.value)}
            className="bg-transparent text-2xl font-bold text-white w-full border-none focus:outline-none"
          />
        </div>
        <div className="bg-blue-600 p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h3 className="text-blue-100 text-sm font-medium">Monthly Income</h3>
          <input
            type="number"
            value={financialSummary.monthlyIncome}
            onChange={(e) => handleSummaryChange('monthlyIncome', e.target.value)}
            className="bg-transparent text-2xl font-bold text-white w-full border-none focus:outline-none"
          />
        </div>
        <div className="bg-blue-600 p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h3 className="text-blue-100 text-sm font-medium">Monthly Expenses</h3>
          <input
            type="number"
            value={financialSummary.monthlyExpenses}
            onChange={(e) => handleSummaryChange('monthlyExpenses', e.target.value)}
            className="bg-transparent text-2xl font-bold text-white w-full border-none focus:outline-none"
          />
        </div>
        <div className="bg-blue-600 p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h3 className="text-blue-100 text-sm font-medium">Savings Rate</h3>
          <input
            type="number"
            value={financialSummary.savingsRate}
            onChange={(e) => handleSummaryChange('savingsRate', e.target.value)}
            className="bg-transparent text-2xl font-bold text-white w-full border-none focus:outline-none"
          />
        </div>
      </div>

      {/* Charts and Goals Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Distribution Chart */}
        <ExpensePieChart expenses={expenses} />

        {/* Financial Goals */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-900">Financial Goals</h2>
          <div className="space-y-4">
            {goals.map(goal => (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    value={goal.name}
                    onChange={(e) => handleGoalChange(goal.id, 'name', e.target.value)}
                    className="font-medium text-white bg-blue-600 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={goal.current}
                      onChange={(e) => handleGoalChange(goal.id, 'current', e.target.value)}
                      className="text-white bg-blue-600 w-24 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                    />
                    <span className="text-blue-700">/</span>
                    <input
                      type="number"
                      value={goal.target}
                      onChange={(e) => handleGoalChange(goal.id, 'target', e.target.value)}
                      className="text-white bg-blue-600 w-24 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                    />
                  </div>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-900">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-blue-100">
                <th className="text-left py-2 text-blue-700">Date</th>
                <th className="text-left py-2 text-blue-700">Description</th>
                <th className="text-left py-2 text-blue-700">Category</th>
                <th className="text-right py-2 text-blue-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id} className="border-b border-blue-100 hover:bg-blue-50">
                  <td className="py-2">
                    <input
                      type="date"
                      value={transaction.date}
                      onChange={(e) => handleTransactionChange(transaction.id, 'date', e.target.value)}
                      className="px-2 py-1 bg-blue-100 rounded-full text-sm text-blue-700 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="text"
                      value={transaction.description}
                      onChange={(e) => handleTransactionChange(transaction.id, 'description', e.target.value)}
                      className="px-2 py-1 bg-blue-100 rounded-full text-sm text-blue-700 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="text"
                      value={transaction.category}
                      onChange={(e) => handleTransactionChange(transaction.id, 'category', e.target.value)}
                      className="px-2 py-1 bg-blue-100 rounded-full text-sm text-blue-700 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="number"
                      value={transaction.amount}
                      onChange={(e) => handleTransactionChange(transaction.id, 'amount', e.target.value)}
                      className={`px-2 py-1 bg-blue-100 rounded-full text-sm border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-right w-32 ${
                        transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;