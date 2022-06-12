import React, { useEffect, useState } from "react";

const TodoList = () => {
  const saveditems = JSON.parse(localStorage.getItem('todos'));

  const [todos, setTodos] = useState(saveditems || []);
  const [input, setInput] = useState([]);
  const [editForm, setEditForm] = useState(false);
  const [editedTodo, setEditedTodo] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.length > 0) {
      setTodos(todos.concat({
        title: input,
        completed: false,
      }));
      setInput('');
      setShowErrorMessage(false);
    } else {
      setShowErrorMessage(true);
    }
  };

  const EnableToEditTodo = (editedTodo) => {
    setEditForm(!editForm);
    setEditedTodo(editedTodo);
    setInput(editedTodo);
  };

  useEffect(() => {
    if (!editForm) {
      setInput('');
    };
  }, [editForm]);

  const editTodo = () => {
    const edited = todos.map((todo) => {
      if (todo.title === editedTodo) {
        todo.title = input;
      }
      return todo;
    });
    setTodos(edited);
    setInput('');
    setEditForm(false);
  }

  const completeTodo = (completedTodo) => {
    const completed = todos.map((todo) => {
      if (todo.title === completedTodo) {
        todo.completed = !todo.completed;
      }
      return todo;
    })
    setTodos(completed);
  };


  const removeTodo = (removedTodo) => {
    const removed = todos.filter((todo) => todo.title !== removedTodo);
    setTodos(removed);
  };

  const clearList = () => {
    setTodos([]);
  };

  return(
    <div className="todo-container">
      <div className="error-message">
        {showErrorMessage && <p>write a valid task</p>}
      </div>
      <form>
        <input
          placeholder="Add Todo..."
          className="form-control"
          onChange={ (e) => setInput(e.target.value) }
          value={ input }
        />
        <button
          type="button"
          onClick={ editForm ? editTodo : addTodo }
          className="btn btn-dark"
        >
          {editForm ? 'Edit' : 'Add'}
        </button>
      </form>
      <div className="todos-control">
        <ul>
          {todos.length > 0 && (
            todos.map(({title, completed}, index) => (
              <div>
                  <li
                  key={ index }
                  style={ { textDecoration: completed && 'line-through' } }
                  >
                    {title}
                  </li>
                  <div className="list-item-buttons">
                    <i onClick={ () => completeTodo(title) } className="fa-solid fa-circle-check" />
                    <i onClick={ () => EnableToEditTodo(title) } className="fa-solid fa-pen-to-square" />
                    <i onClick={ () => removeTodo(title) } className="fa-solid fa-trash" />
                  </div>
              </div>
            ))
          )}
        </ul>
        {todos.length > 0 && <p style={ { cursor: 'pointer' }} onClick={clearList}>clear list</p>}
      </div>
    </div>
  );
}

export default TodoList;
