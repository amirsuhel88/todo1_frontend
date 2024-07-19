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
  },
});

export const { getTodo, addTodo } = todoSlice.actions;
export default todoSlice.reducer;
