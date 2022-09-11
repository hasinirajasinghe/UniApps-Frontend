import React from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ApplicationDetails = ({ applicants, applications }) => {
    const { id } = useParams();
    const application = applications.find((appl) => appl.id === parseInt(id));
    const applicant = applicants.find(
        (appl) => appl.id === application.applicant
    );

    return (
        <div>
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
                    <Button
                    // TODO: pass long function 
                        // onClick={onDeleteApplication}
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
        </div>
    );
};

export default ApplicationDetails;
