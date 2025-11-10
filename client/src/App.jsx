import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import AdminDashBoard from "./admin/AdminDashBoard";
import CreateUser from "./admin/CreateUser";
import AssignTask from "./admin/AssignTask";
import EmpDashBoard from "./pages/EmpDashBoard";
import AdminHome from "./admin/AdminHome";
import MyTask from "./pages/Mytask"; 
import EmployeeHome from "./pages/EmployeeHome";
import CompletedTasks from "./pages/CompletedTasks";
import SubmitedReports from "./admin/SubmitedReports";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

           
            <Route path="emp-dashboard" element={<EmpDashBoard />}>
              <Route index element={<EmployeeHome />} /> 
              <Route path="mytask" element={<MyTask />} /> 
               <Route path="completedtask" element={<CompletedTasks />} /> 
            </Route>

            <Route path="admin-dashboard" element={<AdminDashBoard />}>
              <Route index element={<AdminHome />} />
              <Route path="create-user" element={<CreateUser />} />
              <Route path="assign-task" element={<AssignTask />} />
               <Route path="submitted-reports" element={<SubmitedReports />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;