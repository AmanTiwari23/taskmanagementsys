import {BrowserRouter,Route,Routes} from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import AdminDashBoard from "./admin/AdminDashBoard";
import CreateUser from "./admin/CreateUser";


const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<Home/>}/>

      </Route>
    </Routes>

    <Routes>
       <Route path="admin-dashboard" element={<AdminDashBoard/>}>
      <Route path="create-user" element={<CreateUser/>}/>

      </Route>

    </Routes>
  
    </BrowserRouter>
   
    </>
  )
}

export default App