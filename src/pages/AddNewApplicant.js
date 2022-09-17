import React, { useState, useEffect, useRef } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Button, Toast } from "react-bootstrap";
import axios from "axios";
import config from "../utils/config"

const AddNewApplicant = ({ addNewApplicant }) => {
    const initialState = {
        name: "",
        email: "",
        phone_number: "",
        major: "",
        enrollment_status: "",
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
        axios
            .post(`${config.BACKEND_BASE_URL}/applicants/`, formData)
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    addNewApplicant(res.data);
                    navigate("/dashboard", { replace: true });
                } else {
                    setToastMessage("Failed to create applicant!");
                    setShow(true);
                }
            })
            .catch((error) => {
                setToastMessage("Encountered error while creating applicant!");
                setShow(true);
            });
    };

    const majors = useRef([]);
    const enrollment_statuses = useRef([]);

    useEffect(() => {
        Promise.all([
            fetch(`${config.BACKEND_BASE_URL}/majors/`),
            fetch(`${config.BACKEND_BASE_URL}/enrollment-statuses/`),
        ])
            .then(([majors, enrollment_statuses]) =>
                Promise.all([majors.json(), enrollment_statuses.json()])
            )
            .then(([majorsData, enrollmentStatusData]) => {
                majors.current = majorsData;
                enrollment_statuses.current = enrollmentStatusData;
                setFormData({
                    ...formData,
                    enrollment_status: Object.keys(enrollmentStatusData)[0],
                    major: Object.keys(majorsData)[0],
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <div className="shadow-lg p-3 mb-5 bg-white create-main-container">
                <h2 className="create-main-container h2">Add New Applicant</h2>
                <Form onSubmit={handleSubmit}>
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
                                onChange={handleChange}
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
                                onChange={handleChange}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicPhoneNumber"
                    >
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Phone number"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder="Phone number"
                                name="phone_number"
                                onChange={handleChange}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Major"
                            className="mb-3"
                        >
                            <Form.Select onChange={handleChange} name="major">
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
                            label="Enrollment status"
                            className="mb-3"
                        >
                            <Form.Select
                                onChange={handleChange}
                                name="enrollment_status"
                            >
                                {Object.entries(
                                    enrollment_statuses.current
                                ).map(([key, value]) => {
                                    return (
                                        <option key={key} value={key}>
                                            {value}
                                        </option>
                                    );
                                })}
                            </Form.Select>
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

export default AddNewApplicant;
