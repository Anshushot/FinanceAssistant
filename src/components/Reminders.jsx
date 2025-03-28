import React, { useState } from 'react';

const Reminders = () => {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: 'Electricity Bill',
      amount: 85.50,
      dueDate: '2024-04-05',
      category: 'Utilities',
      isPaid: false,
      frequency: 'Monthly'
    },
    {
      id: 2,
      title: 'Netflix Subscription',
      amount: 15.99,
      dueDate: '2024-04-10',
      category: 'Entertainment',
      isPaid: false,
      frequency: 'Monthly'
    },
    {
      id: 3,
      title: 'Car Insurance',
      amount: 120.00,
      dueDate: '2024-04-15',
      category: 'Insurance',
      isPaid: false,
      frequency: 'Monthly'
    }
  ]);

  const [newReminder, setNewReminder] = useState({
    title: '',
    amount: '',
    dueDate: '',
    category: '',
    frequency: 'Monthly'
  });

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!newReminder.title || !newReminder.amount || !newReminder.dueDate || !newReminder.category) return;

    const reminder = {
      id: reminders.length + 1,
      ...newReminder,
      amount: parseFloat(newReminder.amount),
      isPaid: false
    };

    setReminders([...reminders, reminder]);
    setNewReminder({
      title: '',
      amount: '',
      dueDate: '',
      category: '',
      frequency: 'Monthly'
    });
  };

  const handleTogglePaid = (id) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id ? { ...reminder, isPaid: !reminder.isPaid } : reminder
    ));
  };

  const handleDeleteReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Add New Reminder Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-900">Add New Reminder</h2>
        <form onSubmit={handleAddReminder} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">Title</label>
              <input
                type="text"
                value={newReminder.title}
                onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Electricity Bill"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">Amount</label>
              <input
                type="number"
                value={newReminder.amount}
                onChange={(e) => setNewReminder({ ...newReminder, amount: e.target.value })}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 85.50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">Due Date</label>
              <input
                type="date"
                value={newReminder.dueDate}
                onChange={(e) => setNewReminder({ ...newReminder, dueDate: e.target.value })}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">Category</label>
              <select
                value={newReminder.category}
                onChange={(e) => setNewReminder({ ...newReminder, category: e.target.value })}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Insurance">Insurance</option>
                <option value="Rent">Rent</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">Frequency</label>
              <select
                value={newReminder.frequency}
                onChange={(e) => setNewReminder({ ...newReminder, frequency: e.target.value })}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
                <option value="One-time">One-time</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Reminder
          </button>
        </form>
      </div>

      {/* Reminders List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-900">Upcoming Bills</h2>
        <div className="space-y-4">
          {reminders.map(reminder => (
            <div
              key={reminder.id}
              className={`bg-blue-600 rounded-lg p-4 text-white ${
                reminder.isPaid ? 'opacity-75' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{reminder.title}</h3>
                  <p className="text-blue-100">
                    Due: {new Date(reminder.dueDate).toLocaleDateString()} | {reminder.frequency}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">₹{reminder.amount.toFixed(2)}</p>
                  <span className="px-2 py-1 bg-blue-500 rounded-full text-sm">
                    {reminder.category}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleTogglePaid(reminder.id)}
                  className={`px-4 py-2 rounded-lg transition ${
                    reminder.isPaid
                      ? 'bg-blue-500 text-white hover:bg-blue-400'
                      : 'bg-white text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {reminder.isPaid ? 'Mark as Unpaid' : 'Mark as Paid'}
                </button>
                <button
                  onClick={() => handleDeleteReminder(reminder.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reminders;
