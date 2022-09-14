import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Applicant = ({ applicant, deleteApplicant }) => {
    const onDeleteApplicant = () => {
        axios
            .delete(`http://localhost:8000/applicants/${applicant.id}/`)
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    deleteApplicant(applicant.id);
                } else {
                    alert("Failed to delete!");
                }
            })
            .catch((error) => {
                alert("Error while deleting!");
            });
    };

    return (
        <tbody
            style={{
                fontSize: "18px",
                fontFamily:
                    "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
            }}
        >
            <tr>
                <td>
                    <Link
                        className="app-name"
                        to={`/applicant/${applicant.id}/`}
                    >
                        {applicant.name}
                    </Link>
                </td>
                <td>{applicant.get_major_display}</td>
                <td>{applicant.get_enrollment_status_display}</td>
                <td>
                    <Button
                        type="submit"
                        className="btn-md edit-button"
                        href={`/edit-applicant/${applicant.id}`}
                    >
                        Edit
                    </Button>
                </td>
                <td>
                    <Button
                        onClick={onDeleteApplicant}
                        type="submit"
                        className="btn-md delete-button"
                    >
                        Delete
                    </Button>
                </td>
            </tr>
        </tbody>
    );
};

export default Applicant;
