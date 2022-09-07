import './App.css';
import React, { useState, useEffect} from 'react';
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from './pages/Dashboard';

function App() {
  const [ applicants, setApplicants ] = useState([])
  const [ applications, setApplications ] = useState([])

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
        <Routes>
          {/* <Route path='/' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/> */}
          <Route path='/dashboard' element={<Dashboard applicants={applicants} applications={applications}/>}/>
        </Routes>
    </div>
  );
}

export default App;
