import React, { useState } from 'react';
import {
  FaFire,
  FaExclamationTriangle,
  FaInfoCircle,
  FaPlus
} from 'react-icons/fa';

const PRIORITIES = ['High', 'Medium', 'Low'];
const PRIORITY_ICONS = {
  High: <FaFire />,
  Medium: <FaExclamationTriangle />,
  Low: <FaInfoCircle />
};

const EMPTY_TASK = {
  title: '',
  description: '',
  priority: 'Medium',
  dueDate: ''
};

const TaskForm = ({ onAdd }) => {
  const [task, setTask] = useState(EMPTY_TASK);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrioritySelect = (priority) => {
    setTask((prev) => ({ ...prev, priority }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) return;
    onAdd(task);
    setTask(EMPTY_TASK);
  };

  return (
    <div className="glass-card">
      <h2 className="form-title">Add New Task</h2>

      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label>Task Title *</label>
          <input
            name="title"
            value={task.title}
            onChange={handleChange}
            required
            placeholder="What needs to be done?"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Task description"
          />
        </div>

        <div className="due-date-section">
          <label className="due-date-label">Priority</label>
          <div className="priority-options">
            {PRIORITIES.map((p) => (
              <div
                key={p}
                className={`priority-option ${p.toLowerCase()} ${
                  task.priority === p ? 'selected' : ''
                }`}
                onClick={() => handlePrioritySelect(p)}
              >
                {PRIORITY_ICONS[p]} &nbsp;{p} Priority
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            className="date-input"
            value={task.dueDate}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">
          <FaPlus /> Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
