import React from "react";
import Applicant from "./Applicant";
import Table from "react-bootstrap/Table";
import "../App.css"

const Applicants = ({ applicants, deleteApplicant }) => {
    return (
        <div className="app-main-container" style={{marginTop:"50px"}}>
            <div className="app-header-container">
                <h1 className="app-header-container h1">Applicants</h1>
                <a href="/add-applicant" className="app-header-container a">+</a>
            </div>
            <div className="shadow-lg p-3 mb-5 bg-white app-table">
                <Table hover>
                    <thead >
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
                        return <Applicant applicant={applicant} key={applicant.id} deleteApplicant={deleteApplicant}/>
                    })}
                </Table>
            </div>
        </div>
    );
};

export default Applicants;
