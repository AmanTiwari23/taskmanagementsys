import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import AdminDashBoard from "./admin/AdminDashBoard";
import CreateUser from "./admin/CreateUser";
import AssignTask from "./admin/AssignTask";
import EmpDashBoard from "./pages/EmpDashBoard";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Layout />}>
            
           
            <Route index element={<Home />} />
            <Route path="emp-dashboard" element={<EmpDashBoard />} />

           
            <Route path="admin-dashboard" element={<AdminDashBoard />}>
            
              <Route path="create-user" element={<CreateUser />} />
              <Route path="assign-task" element={<AssignTask />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;