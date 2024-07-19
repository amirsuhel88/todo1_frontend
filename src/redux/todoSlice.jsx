import { createSlice } from "@reduxjs/toolkit";
import UpdateTodo from "../components/UpdateTodo";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
  },
  reducers: {
    getTodo: (state, action) => {
      state.todos = action.payload.map((todo) => {
        return {
          id: todo._id,
          todo: todo.todo,
        };
      });
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      const id = action.payload.id;
      state.todos = state.todos.filter((t) => t.id !== id);
    },
    updateTodo: (state, action) => {
      const index = state.todos.findIndex((x) => x.id === action.payload.id);
      state.todos[index] = {
        id: action.payload.id,
        todo: action.payload.todo,
      };
    },
  },
});

export const { getTodo, addTodo, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
