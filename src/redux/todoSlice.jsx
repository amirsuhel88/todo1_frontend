import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const { getTodo, addTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
