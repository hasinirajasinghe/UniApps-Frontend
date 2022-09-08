import React from "react";
import Applicant from "./Applicant";
import Table from "react-bootstrap/Table";

const Applicants = ({ applicants }) => {
    return (
        <div>
            <div>
                <h1>Applicants</h1>
                <a href="/new-applicant">+</a>
            </div>
            <Table hover>
                <thead>
                    <tr>
                        <th scope="col">Applicant Name</th>
                        <th scope="col">Major</th>
                        <th scope="col">Enrollment Status</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                {applicants.map((applicant) => {
                    // Needs key to distinguish each element
                    return <Applicant applicant={applicant} key={applicant.id} />
                })}
            </Table>
        </div>
    );
};

export default Applicants;
