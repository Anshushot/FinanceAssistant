import React, { useState } from 'react';

const Goals = () => {
  const [goals, setGoals] = useState([
    { id: 1, name: 'Emergency Fund', target: 10000, current: 5000, progress: 50, deadline: '2024-12-31' },
    { id: 2, name: 'Vacation Fund', target: 5000, current: 2000, progress: 40, deadline: '2024-08-15' },
    { id: 3, name: 'New Car', target: 25000, current: 5000, progress: 20, deadline: '2025-06-30' },
  ]);

  const [newGoal, setNewGoal] = useState({ name: '', target: '', deadline: '' });

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoal.name || !newGoal.target || !newGoal.deadline) return;

    const goal = {
      id: goals.length + 1,
      name: newGoal.name,
      target: parseFloat(newGoal.target),
      current: 0,
      progress: 0,
      deadline: newGoal.deadline,
    };

    setGoals([...goals, goal]);
    setNewGoal({ name: '', target: '', deadline: '' });
  };

  const handleUpdateProgress = (id, amount) => {
    setGoals(goals.map(goal => {
      if (goal.id === id) {
        const newCurrent = Math.min(goal.current + amount, goal.target);
        const newProgress = (newCurrent / goal.target) * 100;
        return { ...goal, current: newCurrent, progress: newProgress };
      }
      return goal;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Add New Goal Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-900">Add New Goal</h2>
        <form onSubmit={handleAddGoal} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">Goal Name</label>
              <input
                type="text"
                value={newGoal.name}
                onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., New House"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">Target Amount</label>
              <input
                type="number"
                value={newGoal.target}
                onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 50000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">Deadline</label>
              <input
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Goal
          </button>
        </form>
      </div>

      {/* Goals List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-900">Your Financial Goals</h2>
        <div className="space-y-6">
          {goals.map(goal => (
            <div key={goal.id} className="bg-blue-600 rounded-lg p-6 text-white">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{goal.name}</h3>
                  <p className="text-blue-100">Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">₹{goal.current.toFixed(2)}</p>
                  <p className="text-blue-100">of ₹{goal.target.toFixed(2)}</p>
                </div>
              </div>
              <div className="w-full bg-blue-500 rounded-full h-3 mb-4">
                <div
                  className="bg-white h-3 rounded-full transition-all duration-500"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdateProgress(goal.id, 100)}
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
                >
                  Add ₹100
                </button>
                <button
                  onClick={() => handleUpdateProgress(goal.id, 500)}
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
                >
                  Add ₹500
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Goals;
