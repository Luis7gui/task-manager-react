import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('reactTasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState('medium');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('reactTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputValue.trim()) {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        priority: priority,
        createdAt: new Date().toISOString()
      };
      setTasks([newTask, ...tasks]);
      setInputValue('');
      setPriority('medium');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    })
    .filter(task =>
      task.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="App">
      <h1>📋 Task Manager React</h1>
      
      <div className="add-task">
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          placeholder="Nova tarefa..."
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Baixa</option>
          <option value="medium">Média</option>
          <option value="high">Alta</option>
        </select>
        <button onClick={addTask}>Adicionar</button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Buscar tarefas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            marginBottom: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px'
          }}
        />
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          Todas ({tasks.length})
        </button>
        <button 
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Ativas ({tasks.filter(t => !t.completed).length})
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Concluídas ({tasks.filter(t => t.completed).length})
        </button>
      </div>

      <ul className="task-list">
        {filteredTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </ul>

      {filteredTasks.length === 0 && (
        <p className="empty">Nenhuma tarefa encontrada</p>
      )}
    </div>
  );
}

export default App;