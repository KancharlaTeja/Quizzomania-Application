import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./end.css"; 
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function End() {
    const [emails, setEmails] = useState([]);
    const [marks, setMarks] = useState([]);
    const [name, setName] = useState([]);
    const [blinkEmail, setBlinkEmail] = useState(null); // State to track the email to blink
    const { email } = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:8000/End", { email });
                const responseData = response.data;

                if (responseData.status === 'success') {
                    setEmails(responseData.emails);
                    setMarks(responseData.marks);
                    setName(responseData.names);
                    setBlinkEmail(responseData.email); // Set the email to blink after fetching data
                } else {
                    alert(responseData.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [email]); // Add email to dependency array
    const navigate = useNavigate();
    function Exit(){
        navigate('/')
    }
    return (<>
       <div className="exit-button-container">
                <button className="exit-button" onClick={Exit}>Exit</button>
            </div>
        <div className="container">
            <h2 className="results-heading">Results</h2>
            <table className="results-table">
                <thead>
                    <tr>
                        <th>Name of the Student</th>
                        <th>Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {emails.map((email, index) => (
                        <tr key={index} className={email === blinkEmail ? "blink" : ""}>
                            <td>{name[index]}</td>
                            <td>{marks[index]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>);
}

export default End;
