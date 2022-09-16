import React, { useState, useEffect, useRef } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { Button, Toast } from "react-bootstrap";
import axios from "axios";
import BACKEND_BASE_URL from "../utils/config"

const EditApplicant = () => {
    const initialState = {
        name: "",
        email: "",
        phone_number: "",
        major: "",
        enrollment_status: "",
    };

    const [show, setShow] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const { id } = useParams();

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/applicants/${id}/`, formData)
            .then((res) => {
                if (res.status === 200) {
                    setToastMessage("Successfully Saved!");
                } else {
                    setToastMessage("Failed to save!");
                }
                setShow(true);
            })
            .catch((error) => {
                setToastMessage("Encountered error while saving!");
                setShow(true);
            });
    };

    const majors = useRef([]);
    const enrollment_statuses = useRef([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/applicants/${id}/`)
            .then((res) => {
                setFormData({
                    name: res.data.name,
                    email: res.data.email,
                    phone_number: res.data.phone_number,
                    major: res.data.major,
                    enrollment_status: res.data.enrollment_status,
                });
            })
            .catch((error) => {
                console.log(error);
            });

        fetch(`http://localhost:8000/majors/`)
            .then((res) => res.json())
            .then((data) => (majors.current = data))
            .catch((error) => console.log(error));

        fetch(`http://localhost:8000/enrollment-statuses/`)
            .then((res) => res.json())
            .then((data) => (enrollment_statuses.current = data))
            .catch((error) => console.log(error));
    }, [id]);

    return (
        <>
            <div className="shadow-lg p-3 mb-5 bg-white edit-main-container">
                <h2>Edit Applicant</h2>
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
                                value={formData?.name}
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
                                value={formData?.email}
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
                                value={formData?.phone_number}
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
                                <option
                                    key={formData?.major}
                                    value={formData?.major}
                                >
                                    {majors.current[formData?.major]}
                                </option>
                                {Object.entries(majors.current)
                                    .filter(([key]) => key !== formData.major)
                                    .map(([key, value]) => {
                                        return (
                                            <option key={key} value={key}>
                                                {value}
                                            </option>
                                        );
                                    })}
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
                                <option
                                    key={formData?.enrollment_status}
                                    value={formData?.enrollment_status}
                                >
                                    {
                                        enrollment_statuses.current[
                                            formData.enrollment_status
                                        ]
                                    }
                                </option>
                                {Object.entries(enrollment_statuses.current)
                                    .filter(
                                        ([key]) =>
                                            key !== formData.enrollment_status
                                    )
                                    .map(([key, value]) => {
                                        return (
                                            <option key={key} value={key}>
                                                {value}
                                            </option>
                                        );
                                    })}
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                    <div className="edit-form-button-title">
                        <Button
                            className="btn-lg edit-submit-button"
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

export default EditApplicant;
