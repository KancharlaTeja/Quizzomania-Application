import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './signup.css'

function Signup() {
    let navigate = useNavigate();
    let [name, setName] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    async function Submit(e) {
        e.preventDefault();
        const response = await axios.post("http://localhost:8000/signup",  {name,email,password} );
        const responseData = response.data;
        if (responseData.status === 'success') {
            alert("Signup Successful..! Redirecting to login......")
            navigate('/')
        }
        else if (responseData.status === 'exists') {
            alert('Data Already exists')
        }
    }
    return (
        <div className="signup">
            <h1 style={{color:'red',backgroundColor:'lightgreen',width:'240px',textAlign:'center',marginTop:'4px',marginLeft:'48px',padding:'5px 6px'}}>Signup Form</h1>
            <br/>
            <label>Enter Name : </label>
            <input type='text' onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <br /><br />
            <label>Enter Email : </label>
            <input type='email' onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <br /><br />
            <label>Enter Password : </label>
            <input type='password' onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <br/> <br/>
            <button style={{ backgroundColor: 'blue', color: 'white' ,alignContent:'center' ,'marginLeft':'90px'}} 
           onClick={Submit}>Submit</button>
        </div>
    )
}

export default Signup