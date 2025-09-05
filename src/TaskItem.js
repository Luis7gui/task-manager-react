import React from 'react';

function TaskItem({ task, onToggle, onDelete }) {
  const priorityColors = {
    high: '#ef4444',
    medium: '#f59e0b',
    low: '#10b981'
  };

  return (
    <li className={task.completed ? 'completed' : ''}>
      <input 
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span
        style={{
          borderLeft: `4px solid ${priorityColors[task.priority]}`,
          paddingLeft: '8px'
        }}
      >
        {task.text}
      </span>
      <small style={{ color: '#999' }}>
        {new Date(task.createdAt).toLocaleDateString('pt-BR')}
      </small>
      <button onClick={() => onDelete(task.id)}>🗑️</button>
    </li>
  );
}

export default TaskItem;