import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import End from './end'
import Login from './components/login';
import Signup from './components/signup';
import Quiz from './quiz';

function Sweet() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login/>}/>
                <Route path="/signup" element={<Signup />} />
                <Route path="/task/:email" element = {<Quiz/>}/>
                <Route path="/End/:email" element ={<End/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Sweet;
