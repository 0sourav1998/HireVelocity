import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Job from "./components/Jobs/JobIndex";
import Browse from "./components/Browse/Browse";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<Job/>} path="/jobs" />
        <Route element={<Browse/>} path="/browse" />
      </Routes>
    </div>
  );
}

export default App;
