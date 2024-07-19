import React, { useState } from "react";
import { addTodo } from "../redux/todoSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

function CreateTodo() {
  const [todo, setTodo] = useState();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/todos", { todo })
      .then((res) => {
        dispatch(addTodo(res.data));
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>New Todo</h2>
        <label htmlFor="">Your Task</label>
        <input
          type="text"
          placeholder="Enter your task here"
          className="form-control"
          onChange={(e) => setTodo(e.target.value)}
        />
        <button className="btn btn-success">Submit</button>
      </form>
    </div>
  );
}

export default CreateTodo;
