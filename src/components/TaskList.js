import React from 'react';
import TaskItem from './TaskItem';

const rank = { high: 3, medium: 2, low: 1 };

const TaskList = ({ tasks, sortBy, onDelete, onToggle }) => {
  const sorted = [...tasks].sort((a, b) => {
    if (sortBy === 'priority') {
      return rank[b.priority.toLowerCase()] - rank[a.priority.toLowerCase()];
    }
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate || '9999-12-31') - new Date(b.dueDate || '9999-12-31');
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="task-list">
      {sorted.length === 0 ? (
        <div className="empty-state">
          <p>No tasks yet. Add your first one above!</p>
        </div>
      ) : (
        sorted.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
