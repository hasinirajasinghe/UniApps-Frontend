import React, { useEffect, useRef } from 'react';
import Applicants from "../components/Applicants";
import Applications from "../components/Applications";

const Dashboard = ({ applicants, applications, deleteApplicant, deleteApplication }) => {

    const majors = useRef([]);
    const enrollment_statuses = useRef([]);
    const terms = useRef([]);
    const application_statuses = useRef([]);

    useEffect(() => {
        fetch('http://localhost:8000/majors/')
        .then(res => res.json())
        .then(data => majors.current = data)
        .catch(error => console.log(error))

        fetch('http://localhost:8000/application-statuses/')
        .then(res => res.json())
        .then(data => application_statuses.current = data)
        .catch(error => console.log(error))

        fetch('http://localhost:8000/enrollment-statuses/')
        .then(res => res.json())
        .then(data => enrollment_statuses.current = data)
        .catch(error => console.log(error))

        fetch('http://localhost:8000/terms/')
        .then(res => res.json())
        .then(data => terms.current = data)
        .catch(error => console.log(error))
    })

    return (
        <div >
            <Applicants applicants={applicants} majors={majors} enrollment_statuses={enrollment_statuses} deleteApplicant={deleteApplicant}/>
            <Applications applications={applications} majors={majors} terms={terms} application_statuses={application_statuses} deleteApplication={deleteApplication}/>
        </div>
    )
}

export default Dashboard;
