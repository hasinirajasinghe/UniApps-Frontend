import React from "react";

const Applicant = ({ applicant }) => {
    return (
        <tbody style={{fontSize:"12px", fontFamily:"sans-serif"}}>
            <tr>
                <td>{applicant.name}</td>
                <td>{applicant.major}</td>
                <td>{applicant.enrollment_status}</td>
                <td>
                    <a href="/edit-applicant">Edit</a> 
                </td>
                <td>
                    <a href="/delete-applicant">Delete</a> 
                </td>
            </tr>
        </tbody>
    );
};

export default Applicant;
