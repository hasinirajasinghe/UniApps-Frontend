import React from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ApplicantDetails = ({ applicants }) => {
    const { id } = useParams();
    const applicant = applicants.find((appl) => appl.id === parseInt(id));

    return (
        <div>
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
                    <Button
                    // TODO: pass along the function
                        // onClick={onDeleteApplicant}
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

export default ApplicantDetails;
