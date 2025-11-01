import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";


const Home = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertType] = useState("");
  
  const handleSubmit=async(e)=>{
     e.preventDefault();
      if (usertype=="admin")
      {
         try {
          
            let api=`${import.meta.env.VITE_BACKEND_URL}/admin/login`; 
            const response = await axios.post(api, {email:email, password:password});
            console.log(response);
            alert(response.data.msg);
         } catch (error) {
          
           console.log(error);
           alert(error.response.data.msg);
         }
      }
      else 
      {
        alert("dffdggf");
      }
  }

  return (
    <>
      <h1 align="center"> User Login </h1>
      <Form style={{ margin: "auto", width: "400px" }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Select User</Form.Label>
          <Form.Select aria-label="Default select example" name="usertype" onChange={(e)=>{setUsertType(e.target.value)}}>
            <option>select user type</option>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit"  onClick={handleSubmit}>
          Login
        </Button>
      </Form>
    </>
  )
  
}

export default Home;