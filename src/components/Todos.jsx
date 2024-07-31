import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, getTodo } from "../redux/todoSlice";
import { useNavigate } from "react-router-dom";

function Todos() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTodos, setSelectedTodos] = useState(new Set()); // Manage selected todos
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/todos");
        dispatch(getTodo(response.data.data));
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch todos");
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleAddNewTodo = () => {
    navigate("/new-todo");
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/api/todo/${id}`)
      .then(() => {
        dispatch(deleteTodo({ id }));
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (id) => {
    navigate(`/edit-todo/${id}`);
  };

  const handleCheckboxChange = (id) => {
    setSelectedTodos((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const handleDeleteSelected = () => {
    selectedTodos.forEach((id) => {
      axios
        .delete(`http://localhost:3001/api/todo/${id}`)
        .then(() => {
          dispatch(deleteTodo({ id }));
        })
        .catch((err) => console.log(err));
    });
    setSelectedTodos(new Set());
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Todos List</h2>
        <button onClick={handleAddNewTodo} className="btn btn-primary">
          Add +
        </button>
        <button
          onClick={handleDeleteSelected}
          className="btn btn-danger"
          disabled={selectedTodos.size === 0}
        >
          Delete Selected
        </button>
      </div>

      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Select</th>
            <th>Todo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.length > 0 ? (
            todos.map((todo) => (
              <tr key={todo.id}>
                <td>
                  <input
                    className="form-check-input me-2 "
                    type="checkbox"
                    checked={selectedTodos.has(todo.id)}
                    onChange={() => handleCheckboxChange(todo.id)}
                  />
                </td>
                <td
                  style={{
                    textDecoration: selectedTodos.has(todo.id)
                      ? "line-through"
                      : "none",
                  }}
                >
                  {todo.todo}
                </td>
                <td>
                  <button
                    onClick={() => handleUpdate(todo.id)}
                    className="btn btn-success me-2"
                  >
                    UPDATE
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No todos found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Todos;
