import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Job from "./components/Jobs/JobIndex";
import Browse from "./components/Browse/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CreateCompany from "./components/admin/CreateCompany";
import SetCompanyInfo from "./components/admin/SetCompanyInfo";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<Job/>} path="/jobs" />
        <Route element={<JobDescription/>} path="/jobs/description/:id" />
        <Route element={<Browse/>} path="/browse" />
        <Route element={<Profile/>} path="/link" />
        <Route element={<Companies/>} path="/admin/companies"/>
        <Route element={<CreateCompany/>} path="/admin/comapanies/createCompany"/>
        <Route element={<SetCompanyInfo/>} path="/companies/setInfo/:id"/>
      </Routes>
    </div>
  );
}

export default App;
