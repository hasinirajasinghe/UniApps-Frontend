import React from "react";
import Application from "./Application";
import Table from "react-bootstrap/Table";
import "../App.css"


const Applications = ({ applications, deleteApplication }) => {
    return (
        <div className="app-main-container">
            <div className="app-header-container">
                <h1 className="app-header-container h1">Applications</h1>
                <a href="/add-application" className="app-header-container a">+</a>
            </div>
            <div className="shadow-lg p-3 mb-5 bg-white app-table">
                <Table hover>
                    <thead>
                        <tr>
                            <th scope="col" style={{position: "sticky", top: "0", backgroundColor:"white"}}>Applicant Name</th>
                            <th scope="col">Academic Year</th>
                            <th scope="col">Start Term</th>
                            <th scope="col">Major</th>
                            <th scope="col">Application Satus</th>
                            <th scope="col">Last Modified</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    {applications.map((application) => {
                        return <Application application={application} key={application.id} deleteApplication={deleteApplication}/>
                    })}
                </Table>
            </div>
        </div>
    );
};

export default Applications;
