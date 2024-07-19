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
      .delete("http://localhost:3001/api/todo/" + id)
      .then((res) => {
        dispatch(deleteTodo({ id }));
        // console.log(useSelector((state) => state.todos.todos));
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (id) => {
    navigate(`/edit-todo/${id}`);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>todos List</h2>
        <button onClick={handleAddNewTodo} className="btn btn-primary">
          Add +
        </button>
      </div>

      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Todo</th>
          </tr>
        </thead>
        <tbody>
          {todos.length > 0 ? (
            todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.todo}</td>

                <td>
                  <button
                    onClick={() => handleUpdate(todo.id)}
                    className="btn btn-success mr-2 me-2"
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
              <td colSpan="4" className="text-center">
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
