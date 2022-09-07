import React from "react";
import Table from "react-bootstrap/Table";

const Applicant = ({ applicant }) => {
    return (
        <Table striped bordered hover size="lg" responsive="me">
            <tbody>
                <tr>
                    <td class="col-3">{applicant.name}</td>
                    <td class="col-3">{applicant.email}</td>
                    <td class="col-3">{applicant.phone_number}</td>
                    <td class="col-3">{applicant.major}</td>
                    <td class="col-3">{applicant.enrollment_status}</td>
                </tr>
            </tbody>
        </Table>
    );
};

export default Applicant;
