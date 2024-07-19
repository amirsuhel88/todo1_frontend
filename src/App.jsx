import "./App.css";
import Users from "./components/Users";
import Todos from "./components/Todos";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateTodo from "./components/CreateTodo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />}></Route>
        <Route path="/todos" element={<Todos />}></Route>
        <Route path="/new-todo" element={<CreateTodo />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
