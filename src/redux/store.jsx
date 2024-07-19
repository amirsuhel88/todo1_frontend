import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import todoReducer from "./todoSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    todos: todoReducer,
  },
});

export default store;
