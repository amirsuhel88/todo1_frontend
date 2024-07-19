import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/userSlice";

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/users");
        // console.log(response.data.data);
        dispatch(getUser(response.data.data));
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch users");
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Users List</h2>
        <button className="btn btn-primary">Add +</button>
      </div>

      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <button className="btn btn-success mr-2 me-2">UPDATE</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
