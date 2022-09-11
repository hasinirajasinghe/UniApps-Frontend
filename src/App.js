import './App.css';
import React, { useState, useEffect} from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AddNewApplicant from './pages/AddNewApplicant';
import AddNewApplication from './pages/AddNewApplication';
import EditApplicant from './pages/EditApplicant';
import EditApplication from './pages/EditApplication';
import UniAppsNavbar from './components/UniAppsNavbar';
import { getToken } from './utils/tokenService';

function App() {
  const [ applicants, setApplicants ] = useState([])
  const [ applications, setApplications ] = useState([])
  const [ loggedIn, setLoggedIn ] = useState(true);
  console.log('loggedIn' + loggedIn)

  useEffect(() => {

    if (getToken() != null) {
      setLoggedIn(true);
    }

    fetch('http://localhost:8000/applicants/')
    .then(res => res.json())
    .then(data => setApplicants(data))
    .catch(error => console.log(error))

    fetch('http://localhost:8000/applications/')
    .then(res => res.json())
    .then(data => setApplications(data))
    .catch(error => console.log(error))
  }, [loggedIn])

  const addNewApplicant = (applicant) => {
    setApplicants([...applicants, applicant])
  }

  const addNewApplication = (application) => {
    setApplications([...applications, application])
  }

  const deleteApplicant = (id) => {
    setApplicants(applicants.filter((applicant) => applicant.id !== id))
  }

  const deleteApplication = (id) => {
    setApplications(applications.filter((application) => application.id !== id))
  }

  return (
    <div>
        <UniAppsNavbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path='/' element={<Navigate to="/login" />}/>
          <Route path='/login' element={<LoginPage setLoggedIn={setLoggedIn}/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/dashboard' element={loggedIn? (<Dashboard applicants={applicants} applications={applications} deleteApplicant={deleteApplicant} deleteApplication={deleteApplication} />) : (<Navigate replace to={'/login'}/>)}/>
          <Route path='/add-applicant' element={<AddNewApplicant addNewApplicant={addNewApplicant}/>}/>
          <Route path='/add-application' element={<AddNewApplication addNewApplication={addNewApplication} applicants={applicants}/>}/>
          <Route path='/edit-applicant/:id' element={<EditApplicant applicants={applicants} setApplicants={setApplicants}/>}/>
          <Route path='/edit-application/:id' element={<EditApplication applications={applications} setApplications={setApplications}/>}/>
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
