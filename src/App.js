import './App.css';
import React, { useState, useEffect} from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AddNewApplicant from './pages/AddNewApplicant';
import AddNewApplication from './pages/AddNewApplication';
import EditApplicant from './pages/EditApplicant';
import EditApplication from './pages/EditApplication';

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

  const addNewApplicant = (applicant) => {
    setApplicants([...applicants, applicant])
  }

  const addNewApplication = (application) => {
    setApplications([...applications, application])
  }

  const deleteApplicant = (id) => {
    setApplicants(applicants.filter((applicant) => applicant.id !== id))
  }

  return (
    <div>
        <Navbar setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path='/' element={<Navigate to="/login" />}/>
          <Route path='/login' element={<LoginPage setLoggedIn={setLoggedIn}/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/dashboard' element={<Dashboard applicants={applicants} applications={applications} deleteApplicant={deleteApplicant}/>}/>
          <Route path='/add-applicant' element={<AddNewApplicant addNewApplicant={addNewApplicant}/>}/>
          <Route path='/add-application' element={<AddNewApplication addNewApplication={addNewApplication}/>}/>
          <Route path='/edit-applicant/:id' element={<EditApplicant applicants={applicants} setApplicants={setApplicants}/>}/>
          <Route path='/edit-application/:id' element={<EditApplication applications={applications} setApplications={setApplications}/>}/>
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
