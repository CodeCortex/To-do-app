import React, { useState, useEffect } from 'react';
import './App.css';
import { FaTrash, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (index) => {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h1>TO DO LIST</h1>
      <div className="input-container">
        <input
          type="text"
          className="todo-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new task"
        />
        <button className="add-button" onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <span onClick={() => toggleTodo(index)} className="todo-text">
              {todo.completed ? <FaCheckCircle className="icon" /> : <FaRegCircle className="icon" />}
              {todo.text}
            </span>
            <FaTrash className="delete-icon" onClick={() => deleteTodo(index)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
