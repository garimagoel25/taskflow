import React from 'react';
import { FiCheck, FiRotateCcw, FiTrash2, FiCalendar, FiClock } from 'react-icons/fi';
import { FaFire, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

const icon = {
  High: <FaFire className="priority-icon" />,
  Medium: <FaExclamationTriangle className="priority-icon" />,
  Low: <FaInfoCircle className="priority-icon" />
};

const TaskItem = ({ task, onToggle, onDelete }) => {
  const { id, title, description, priority = 'Medium', completed, dueDate } = task;
  const overdue = dueDate && !completed && new Date(dueDate) < new Date();
  const dateStr = dueDate
    ? new Date(dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null;

  return (
    <div className={`task-item ${priority.toLowerCase()} ${completed ? 'completed' : ''}`}>
      <div className="task-checkbox" onClick={() => onToggle(id)}>
        {completed ? (
          <div className="checkmark-bg">
            <FiCheck className="checkmark-icon" />
          </div>
        ) : (
          <div className="checkbox" />
        )}
      </div>

      <div className="task-content">
        <div className="task-header">
          <h3>{title}</h3>
          {completed && <span className="completed-label">Completed</span>}
        </div>
        {description && <p className="description">{description}</p>}

        <div className="task-meta">
          <span className={`priority-badge ${priority.toLowerCase()}`}>
            {icon[priority]} {priority} Priority
          </span>
          {dueDate && (
            <span className={`due-date ${overdue ? 'overdue' : ''}`}>
              <FiCalendar className="meta-icon" />
              {dateStr}
              {overdue && <FiClock className="warning-icon" />}
            </span>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button
          className={`action-btn ${completed ? 'undo' : 'complete'}`}
          onClick={() => onToggle(id)}
        >
          {completed ? <FiRotateCcw /> : <FiCheck />}
        </button>
        <button
          className="action-btn delete"
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm(`Delete "${title}"?`)) onDelete(id);
          }}
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
