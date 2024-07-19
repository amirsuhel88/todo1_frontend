import "./App.css";
import Users from "./components/Users";
import Todos from "./components/Todos";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateTodo from "./components/CreateTodo";
import UpdateTodo from "./components/UpdateTodo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/" element={<Todos />}></Route>
        <Route path="/new-todo" element={<CreateTodo />}></Route>
        <Route path="/edit-todo/:id" element={<UpdateTodo />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
