
export const loadTasks = (username = '') => {
  if (!username) return [];
  const data = localStorage.getItem(`tasks_${username}`);
  return data ? JSON.parse(data) : [];
};

export const saveTasks = (username = '', tasks = []) => {
  if (!username) return;
  localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
};
