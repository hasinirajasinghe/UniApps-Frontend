import axios from "axios";
import React from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import BACKEND_BASE_URL from "../utils/config"

const ApplicantDetails = ({ applicants, deleteApplicant }) => {
    const navigate = useNavigate();

    const onDeleteApplicant = () => {
        axios
            .delete(`http://localhost:8000/applicants/${applicant.id}/`)
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    deleteApplicant(applicant.id);
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
    const applicant = applicants.find((appl) => appl.id === parseInt(id));

    return (
        <div className="shadow-lg p-3 mb-5 bg-white detail-main-container">
            <h2 className="detail-main-container h2">Applicant Details</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Name"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Name"
                            name="name"
                            readOnly
                            plaintext
                            value={applicant?.name}
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Email address"
                            name="email"
                            readOnly
                            plaintext
                            value={applicant?.email}
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Phone number"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Phone number"
                            name="phone_number"
                            readOnly
                            plaintext
                            value={applicant?.phone_number}
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Major"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Major"
                            name="major"
                            readOnly
                            plaintext
                            value={applicant?.get_major_display}
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Enrollment status"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Enrollment status"
                            name="enrollment_status"
                            readOnly
                            plaintext
                            value={applicant?.get_enrollment_status_display}
                        />
                    </FloatingLabel>
                </Form.Group>
            </Form>
            <div className="detail-buttons-container">
                <Button
                    type="submit"
                    className="btn-lg edit-button detail-buttons"
                    href={`/edit-applicant/${applicant.id}`}
                >
                    Edit
                </Button>
                <Button
                    onClick={onDeleteApplicant}
                    type="submit"
                    className="btn-lg delete-button detail-buttons"
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default ApplicantDetails;
