import React, { useState } from "react";
import { addTodo, updateTodo } from "../redux/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateTodo() {
  const { id } = useParams();
  const todos = useSelector((state) => state.todos.todos);
  const todoo = todos.find((t) => t.id === id);
  console.log(todoo);
  const [todo, setTodo] = useState(todoo.todo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/api/todo/" + id, { todo })
      .then((res) => {
        dispatch(updateTodo(todo));
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={handleUpdate}>
        <h2>New Todo</h2>
        <label htmlFor="">Your Task</label>
        <input
          type="text"
          placeholder="Enter your task here"
          className="form-control"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button className="btn btn-success">Submit</button>
      </form>
    </div>
  );
}

export default UpdateTodo;
