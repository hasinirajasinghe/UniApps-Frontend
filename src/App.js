import './App.css';
import React, { useState, useEffect} from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

function App() {
  const [ applicants, setApplicants ] = useState([])
  const [ applications, setApplications ] = useState([])
  const [ loggedIn, setLoggedIn ] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/applicants/')
    .then(res => res.json())
    .then(data => setApplicants(data))
    .catch(error => console.log(error))

    fetch('http://localhost:8000/applications/')
    .then(res => res.json())
    .then(data => setApplications(data))
    .catch(error => console.log(error))
  }, [])

  return (
    <div>
        <Navbar setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path='/' element={<Navigate to="/login" />}/>
          <Route path='/login' element={<LoginPage setLoggedIn={setLoggedIn}/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/dashboard' element={<Dashboard applicants={applicants} applications={applications}/>}/>
        </Routes>
    </div>
  );
}

export default App;
