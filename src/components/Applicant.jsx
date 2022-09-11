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
        <tbody style={{ fontSize: "12px", fontFamily: "sans-serif" }}>
            <tr>
                <td>
                    <Link to={`/applicant/${applicant.id}/`}>
                        {applicant.name}
                    </Link>
                </td>
                <td>{applicant.get_major_display}</td>
                <td>{applicant.get_enrollment_status_display}</td>
                <td>
                    <Button
                        type="submit"
                        className="btn-sm"
                        style={{
                            backgroundColor: "#8ecae6",
                            border: "#8ecae6",
                            fontWeight: "bold",
                        }}
                    >
                        <a
                            style={{ color: "#FFFFFF", textDecoration: "none" }}
                            href={`/edit-applicant/${applicant.id}`}
                        >
                            Edit
                        </a>
                    </Button>
                </td>
                <td>
                    <Button
                        onClick={onDeleteApplicant}
                        type="submit"
                        className="btn-sm"
                        style={{
                            backgroundColor: "#d62928",
                            border: "#d62928",
                            fontWeight: "bold",
                        }}
                    >
                        Delete
                    </Button>
                </td>
            </tr>
        </tbody>
    );
};

export default Applicant;
