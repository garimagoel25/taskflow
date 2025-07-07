import React from 'react';

const TaskFilter = ({ filter, onChange, counts }) => {
  const options = [
    { value: 'All', label: 'All' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Pending', label: 'Pending' }
  ];

  return (
    <div className="task-filter">
      {options.map(option => (
        <button
          key={option.value}
          className={`filter-btn ${filter === option.value ? 'active' : ''}`}
          onClick={() => onChange(option.value)}
        >
          {option.label} ({counts[option.value.toLowerCase()]})
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;