import React, { useState, useEffect } from 'react';
import './styles/App.css';

import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import { loadTasks, saveTasks } from './utils/localStorage';

function App() {
  /* ─────────────── State ─────────────── */
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [tasks, setTasks]       = useState(loadTasks(username));
  const [filter, setFilter]     = useState('All');
  const [sortBy, setSortBy]     = useState('createdAt');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  /* ───────────── Persistence ─────────── */
  useEffect(() => { if (username) saveTasks(username, tasks); }, [tasks, username]);
  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  /* ───────────── Auth Handlers ───────── */
  const handleLogin  = name => { setUsername(name); setTasks(loadTasks(name)); };
  const handleLogout = () => { localStorage.removeItem('username'); setUsername(''); setTasks([]); };

  /* ───────────── Task Handlers ───────── */
  const handleAdd = task =>
    setTasks([{ ...task, id: Date.now(), completed:false, createdAt:new Date().toISOString() }, ...tasks]);

  const handleDelete = id => setTasks(tasks.filter(t => t.id !== id));
  const handleToggle = id => setTasks(tasks.map(t => t.id === id ? { ...t, completed:!t.completed } : t));

  /* ───────────── Counts for Summary ──── */
  const counts = {
    all:       tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending:   tasks.filter(t => !t.completed).length
  };

  /* ───────────── Visible List ────────── */
  const visible = tasks.filter(t =>
    filter==='Completed' ? t.completed :
    filter==='Pending'   ? !t.completed : true
  );

  if (!username) return <Login onLogin={handleLogin} />;

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      {/* ---------- Header ---------- */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="welcome-message">
            Welcome,&nbsp;<span className="username">{username}</span> to TaskFlow
          </h1>
          <div className="header-controls">
            <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </header>

      {/* ---------- Main ---------- */}
      <main className="app-main">
        {/* Add Task */}
        <TaskForm onAdd={handleAdd} />

        {/* Filter Tabs */}
        <TaskFilter filter={filter} onChange={setFilter} counts={counts} />

        {/* Task Summary */}
        <div className="task-summary">
          <p>
            📊 <strong>All:</strong> {counts.all} &nbsp;|&nbsp;
            ✅ <strong>Completed:</strong> {counts.completed} &nbsp;|&nbsp;
            ⏳ <strong>Pending:</strong> {counts.pending}
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="sort-bar">
          <label>Sort By:</label>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)}>
            <option value="createdAt">Newest</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        {/* Task List */}
        <TaskList
          tasks={visible}
          sortBy={sortBy}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      </main>
    </div>
  );
}

export default App;
