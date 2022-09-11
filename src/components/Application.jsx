import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Application = ({ application, applicant, deleteApplication }) => {
    const onDeleteApplication = () => {
        axios
            .delete(`http://localhost:8000/applications/${application.id}/`)
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    deleteApplication(application.id);
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
                    <Link to={`/application/${application.id}/`}>
                        {applicant.name}
                    </Link>
                </td>
                <td>{application.academic_year}</td>
                <td>{application.get_intended_start_display}</td>
                <td>{application.get_intended_major_display}</td>
                <td>{application.get_status_display}</td>
                <td>{application.last_updated}</td>
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
                            href={`/edit-application/${application.id}`}
                        >
                            Edit
                        </a>
                    </Button>
                </td>
                <td>
                    <Button
                        onClick={onDeleteApplication}
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

export default Application;
