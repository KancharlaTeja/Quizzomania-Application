import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();
        console.log(email, password);

        try {
            const response = await axios.post("http://localhost:8000/", { email, password });
            const responseData = response.data;

            if (responseData.status === 'success') {
                alert("Login Successful!");
                navigate(`/task/${email}`);
            } else if (responseData.status === 'notsignup') {
                alert("Please Signup");
                navigate('/signup');
            } else if (responseData.status === 'incorrectpassword') {
                alert("Wrong Password. Please try again.");
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("There was an error logging in!", error);
        }
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <form onSubmit={submit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input 
                            type='email' 
                            id="email"
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Email" 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            id="password"
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Password" 
                            required 
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
