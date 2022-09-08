import React from "react";
import Application from "./Application";
import Table from "react-bootstrap/Table";

const Applications = ({ applications }) => {
    return (
        <div>
            <div>
                <h1>Applications</h1>
                <a href="/new-application">+</a>
            </div>
            <Table hover>
                <thead>
                    <tr>
                        <th >Applicant Name</th>
                        <th scope="col">Academic Year</th>
                        <th scope="col">Start Term</th>
                        <th scope="col">Major</th>
                        <th scope="col">Application Satus</th>
                        <th scope="col">Last Modified</th>
                        <th scope="col">School Last Attended</th>
                        <th scope="col">GPA</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                {applications.map((application) => {
                    return <Application application={application} key={application.id}/>
                })}
            </Table>
        </div>
    );
};

export default Applications;
