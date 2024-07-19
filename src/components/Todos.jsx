import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getTodo } from "../redux/todoSlice";

function Todos() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>todos List</h2>
        <button className="btn btn-primary">Add +</button>
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
                  <button className="btn btn-success mr-2 me-2">UPDATE</button>
                  <button className="btn btn-danger">Delete</button>
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
