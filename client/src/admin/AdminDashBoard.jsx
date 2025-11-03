import { Link, Outlet } from "react-router-dom";

const AdminDashBoard=()=>{
    return(
        <>
          
         <div id="admindash">
            <h1> Admin Dashboard</h1>
         </div>
         <div id="adminname">
          Welcome : {localStorage.getItem("adminname")} Email : {localStorage.getItem("adminemail")} ! Logout
         </div>
         <div id="admindata">
          <div id="adminmenu">
            
          <Link to="create-user">Create User</Link>
          </div>
          <div id="admincontent">
             <Outlet/>
          </div>
         </div>
        
        </>
    )
}

export default AdminDashBoard;