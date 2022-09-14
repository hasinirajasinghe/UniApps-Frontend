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
                        to={`/application/${application.id}/`}
                    >
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
                        className="btn-md edit-button"
                        href={`/edit-application/${application.id}`}
                    >
                        Edit
                    </Button>
                </td>
                <td>
                    <Button
                        onClick={onDeleteApplication}
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

export default Application;
