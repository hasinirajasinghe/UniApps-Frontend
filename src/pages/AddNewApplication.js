import React, { useState, useEffect, useRef } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Button, Toast } from "react-bootstrap";
import axios from "axios";
import config from "../utils/config"

const AddNewApplication = ({ applicants, addNewApplication }) => {
    const initialState = {
        applicant: "",
        academic_year: "",
        intended_start: "",
        intended_major: "",
        status: "",
        last_updated: "",
        school_last_attended: "",
        gpa: "",
    };

    const [show, setShow] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let date = new Date().toISOString().split("T")[0];

        let data = formData;
        data["last_updated"] = date;

        axios
            .post(`${config.BACKEND_BASE_URL}/applications/`, data)
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    addNewApplication(res.data);
                    navigate("/dashboard", { replace: true });
                } else {
                    setToastMessage("Failed to create application!");
                    setShow(true);
                }
            })
            .catch((error) => {
                setToastMessage(
                    "Encountered error while creating application, please fill out all fields!"
                );
                setShow(true);
            });
    };

    const majors = useRef([]);
    const terms = useRef([]);
    const application_statuses = useRef([]);

    useEffect(() => {
        Promise.all([
            fetch(`${config.BACKEND_BASE_URL}/majors/`),
            fetch(`${config.BACKEND_BASE_URL}/terms/`),
            fetch(`${config.BACKEND_BASE_URL}/application-statuses/`),
        ])
            .then(([majors, terms, application_statuses]) =>
                Promise.all([
                    majors.json(),
                    terms.json(),
                    application_statuses.json(),
                ])
            )
            .then(([majorsData, termsData, applicationStatusData]) => {
                majors.current = majorsData;
                terms.current = termsData;
                application_statuses.current = applicationStatusData;
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <div className="shadow-lg p-3 mb-5 bg-white create-main-container">
                <h2 className="create-main-container h2">Add New Application</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Applicant Name"
                            className="mb-3"
                        >
                            <Form.Select onChange={handleChange} name="applicant">
                                <option>---</option>
                                {applicants.map((applicant) => {
                                    return (
                                        <option
                                            key={applicant.id}
                                            value={applicant.id}
                                        >
                                            {applicant.name}
                                        </option>
                                    );
                                })}
                            </Form.Select>
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
                                placeholder="Academic year"
                                name="academic_year"
                                onChange={handleChange}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Intended start term"
                            className="mb-3"
                        >
                            <Form.Select
                                onChange={handleChange}
                                name="intended_start"
                            >
                                <option>---</option>
                                {Object.entries(terms.current).map(
                                    ([key, value]) => {
                                        return (
                                            <option key={key} value={key}>
                                                {value}
                                            </option>
                                        );
                                    }
                                )}
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Intended major"
                            className="mb-3"
                        >
                            <Form.Select
                                onChange={handleChange}
                                name="intended_major"
                            >
                                <option>---</option>
                                {Object.entries(majors.current).map(
                                    ([key, value]) => {
                                        return (
                                            <option key={key} value={key}>
                                                {value}
                                            </option>
                                        );
                                    }
                                )}
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Enrollment Status"
                            className="mb-3"
                        >
                            <Form.Select onChange={handleChange} name="status">
                                <option>---</option>
                                {Object.entries(application_statuses.current).map(
                                    ([key, value]) => {
                                        return (
                                            <option key={key} value={key}>
                                                {value}
                                            </option>
                                        );
                                    }
                                )}
                            </Form.Select>
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
                                placeholder="School last attended"
                                name="school_last_attended"
                                onChange={handleChange}
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
                                name="gpa"
                                placeholder="GPA"
                                min="0.000"
                                step="0.001"
                                max="4.000"
                                onChange={handleChange}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <div className="create-form-button-title">
                        <Button
                            className="btn-lg create-submit-button"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
            <Toast
                className="toast toast_container"
                onClose={() => setShow(false)}
                show={show}
                delay={3000}
                autohide
            >
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
        </>
    );
};

export default AddNewApplication;
