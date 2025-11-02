const { useState } = require("react")


const CreateUser = ()=>{
    const [input,setInput] = useState({});

    const handleInput = (e) =>{
            let name=e.target.name;
         let value=e.target.value;
         setInput(values=>({...values, [name]:value}));
         console.log(input);
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
               let api=`${import.meta.env.VITE_BACKEND_URL}/admin/usercreate`;
               const response = await axios.post(api, input);
               console.log(response.data);

        } catch (error) {
            console.log(error)
        }
    }


    return(
         <>
          <h2> Create New User</h2>
           <Form style={{width:"400px"}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Employee Name</Form.Label>
        <Form.Control type="text" name="empname"  onChange={handleInput}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Employee email</Form.Label>
        <Form.Control type="text" name="empemail" onChange={handleInput}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Select Designation</Form.Label>
         <Form.Select aria-label="Default select example" name="designation" onChange={handleInput} >
      <option>select designation</option>
      <option value="Programmer">Programmer</option>
      <option value="Tester">Tester</option>
      <option value="Designer">Designer</option>
       <option value="DB Designer">Data Base Designer</option>
        <option value="Analyst">Analyst</option>
    </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>

        </>
    )
}


export default CreateUser;