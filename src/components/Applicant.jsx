import axios from "axios";
import React from "react";


const Applicant = ({ applicant, deleteApplicant }) => {

    const onDeleteApplicant = () => {
        axios.delete(`http://localhost:8000/applicants/${applicant.id}/`).then((res) => {
            if (res.status >= 200 && res.status < 300) {
                deleteApplicant(applicant.id)
            } else {
                alert('Failed to delete!')
            }
        })
        .catch(error => {
            alert('Error while deleting!')
        });
    }

    return (
        <tbody style={{fontSize:"12px", fontFamily:"sans-serif"}}>
            <tr>
                <td>{applicant.name}</td>
                <td>{applicant.get_major_display}</td>
                <td>{applicant.get_enrollment_status_display}</td>
                <td>
                    <button>
                        <a href={`/edit-applicant/${applicant.id}`}>Edit</a> 
                    </button>
                </td>
                <td>
                    <button onClick={onDeleteApplicant}>Delete</button>
                </td>
            </tr>
        </tbody>
    );
};

export default Applicant;
