import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AddNewApplicant from "./pages/AddNewApplicant";
import AddNewApplication from "./pages/AddNewApplication";
import EditApplicant from "./pages/EditApplicant";
import EditApplication from "./pages/EditApplication";
import ApplicantDetails from "./pages/ApplicantDetails";
import ApplicationDetails from "./pages/ApplicationDetails";
import UniAppsNavbar from "./components/UniAppsNavbar";
import Auth from "./utils/auth";
import AuthenticatedRoute from "./components/AuthenicatedRoute";
import UserContext from "./utils/UserContext";

function App() {
    const [applicants, setApplicants] = useState([]);
    const [applications, setApplications] = useState([]);
    const { loggedIn, setLoggedIn, getToken, setToken, removeToken } = Auth();

    console.log("loggedIn" + loggedIn);

    useEffect(() => {
        fetch("https://uni-apps.herokuapp.com/applicants/")
            .then((res) => res.json())
            .then((data) => setApplicants(data))
            .catch((error) => console.log(error));

        fetch("https://uni-apps.herokuapp.com/applications/")
            .then((res) => res.json())
            .then((data) => setApplications(data))
            .catch((error) => console.log(error));
    }, [setLoggedIn, loggedIn]);

    const addNewApplicant = (applicant) => {
        setApplicants([...applicants, applicant]);
    };

    const addNewApplication = (application) => {
        setApplications([...applications, application]);
    };

    const deleteApplicant = (id) => {
        setApplicants(applicants.filter((applicant) => applicant.id !== id));
    };

    const deleteApplication = (id) => {
        setApplications(
            applications.filter((application) => application.id !== id)
        );
    };

    return (
        <div>
          <UserContext.Provider value={{loggedIn, setLoggedIn, getToken, setToken, removeToken }}>
            <UniAppsNavbar />
            <Routes>
                <Route path="/" element={loggedIn? <Navigate to={'/dashboard'}/>: <Navigate to="/login" />} />
                <Route
                    path="/login"
                    element={loggedIn? <Navigate to={'/dashboard'}/> : <LoginPage/>}
                />
                <Route path="/register" element={loggedIn? <Navigate to={'/dashboard'}/>:<RegisterPage />} />
                <Route
                    path="/dashboard"
                    element={
                        (
                          <AuthenticatedRoute>
                            <Dashboard
                                applicants={applicants}
                                applications={applications}
                                deleteApplicant={deleteApplicant}
                                deleteApplication={deleteApplication}
                            />
                          </AuthenticatedRoute>
                        )
                    }
                />
                <Route
                    path="/add-applicant"
                    element={
                        <AuthenticatedRoute>
                          <AddNewApplicant addNewApplicant={addNewApplicant} />
                        </AuthenticatedRoute>  
                    }
                />
                <Route
                    path="/add-application"
                    element={
                      <AuthenticatedRoute>
                        <AddNewApplication
                            addNewApplication={addNewApplication}
                            applicants={applicants}
                        />
                      </AuthenticatedRoute>
                    }
                />
                <Route
                    path="/edit-applicant/:id"
                    element={
                      <AuthenticatedRoute>
                        <EditApplicant
                            applicants={applicants}
                            setApplicants={setApplicants}
                        />
                      </AuthenticatedRoute>
                    }
                />
                <Route
                    path="/edit-application/:id"
                    element={
                      <AuthenticatedRoute>
                        <EditApplication
                            applications={applications}
                            setApplications={setApplications}
                        />
                      </AuthenticatedRoute>
                    }
                />
                <Route
                    path="/applicant/:id"
                    element={
                      <AuthenticatedRoute>
                        <ApplicantDetails
                            applicants={applicants}
                            deleteApplicant={deleteApplicant}
                        />
                      </AuthenticatedRoute>
                    }
                />
                <Route
                    path="/application/:id"
                    element={
                      <AuthenticatedRoute>
                        <ApplicationDetails
                            applicants={applicants}
                            applications={applications}
                        />
                      </AuthenticatedRoute>
                    }
                />
            </Routes>
            <Footer />
            </UserContext.Provider>
        </div>
    );
}

export default App;
