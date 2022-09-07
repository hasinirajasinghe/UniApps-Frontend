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
            <Table striped bordered hover class="d-flex">
                <thead>
                    <tr>
                        <th class="col-3">Applicant Name</th>
                        <th class="col-3">Email</th>
                        <th class="col-3">Phone Number</th>
                        <th class="col-3">Major</th>
                        <th class="col-3">Enrollment Status</th>
                    </tr>
                </thead>
              </Table>
                {applicants.map((applicant) => {
                    // Needs key to distinguish each element
                    return (
                        <Applicant applicant={applicant} key={applicant.id} />
                    );
                })}
        </div>
    );
};

export default Applicants;
