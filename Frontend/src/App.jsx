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
import AdminJobs from "./components/admin/AdminJobs";
import CreateJob from "./components/admin/CreateJob";
import Applicants from "./components/admin/Applicants";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { ProtectedRouteForStudents } from "./components/ProtectedRouteForStudents";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<ProtectedRouteForStudents><Job/></ProtectedRouteForStudents>} path="/jobs" />
        <Route element={<ProtectedRouteForStudents><JobDescription/></ProtectedRouteForStudents>} path="/jobs/description/:id" />
        <Route element={<ProtectedRouteForStudents><Browse/></ProtectedRouteForStudents>} path="/browse" />
        <Route element={<ProtectedRouteForStudents><Profile/></ProtectedRouteForStudents>} path="/link" />

        <Route element={<ProtectedRoute><Companies/></ProtectedRoute>} path="/admin/companies"/>
        <Route element={<ProtectedRoute><CreateCompany/></ProtectedRoute>} path="/admin/comapanies/createCompany"/>
        <Route element={<ProtectedRoute><SetCompanyInfo/></ProtectedRoute>} path="/companies/setInfo/:id"/>
        <Route element={<ProtectedRoute><AdminJobs/></ProtectedRoute>} path="/admin/jobs"/>
        <Route element={<ProtectedRoute><CreateJob/></ProtectedRoute>} path="/admin/jobs/createJob"/>
        <Route element={<ProtectedRoute><Applicants/></ProtectedRoute>} path="/jobs/:id/applicants" />
        <Route element={<PageNotFound/>} path="*" />
      </Routes>
    </div>
  );
}

export default App;
