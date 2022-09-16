import axios from "axios";
import React from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const ApplicationDetails = ({
    applicants,
    applications,
    deleteApplication,
}) => {
    const navigate = useNavigate();

    const onDeleteApplication = () => {
        axios
            .delete(`https://uni-apps.herokuapp.com/applications/${application.id}/`)
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    deleteApplication(application.id);
                    navigate("/dashboard");
                } else {
                    alert("Failed to delete!");
                }
            })
            .catch((error) => {
                alert("Error while deleting!");
            });
    };

    const { id } = useParams();
    const application = applications.find((appl) => appl.id === parseInt(id));
    const applicant = applicants.find(
        (appl) => appl.id === application.applicant
    );

    return (
        <div className="shadow-lg p-3 mb-5 bg-white detail-main-container">
            <h2 className="detail-main-container h2">Application Details</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Applicant Name"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            name="applicant"
                            readOnly
                            plaintext
                            value={applicant?.name}
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Academic year"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            name="academic_year"
                            readOnly
                            plaintext
                            value={application?.academic_year}
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Intended start term"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            name="intended_start"
                            readOnly
                            plaintext
                            value={application?.get_intended_start_display}
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Intended major"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            name="intended_major"
                            readOnly
                            plaintext
                            value={application?.get_intended_major_display}
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Application Status"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            name="intended_major"
                            readOnly
                            plaintext
                            value={application?.get_status_display}
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="School last attended"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            name="school_last_attended"
                            readOnly
                            plaintext
                            value={application?.school_last_attended}
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="GPA"
                        className="mb-3"
                    >
                        <Form.Control
                            type="number"
                            readOnly
                            plaintext
                            value={application?.gpa}
                        />
                    </FloatingLabel>
                </Form.Group>
            </Form>
            <div className="detail-buttons-container">
                <Button
                    type="submit"
                    className="btn-lg edit-button detail-buttons"
                    href={`/edit-application/${application.id}`}
                >
                    Edit
                </Button>
                <Button
                    onClick={onDeleteApplication}
                    type="submit"
                    className="btn-lg delete-button detail-buttons"
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default ApplicationDetails;
