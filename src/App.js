import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Containers/Home";
import Login from "./components/Login";

const App = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
