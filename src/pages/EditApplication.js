import React, { useState, useEffect, useRef } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { Button, Toast } from "react-bootstrap";
import axios from "axios";

const EditApplication = () => {
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
    const { id } = useParams();
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
            .put(`http://localhost:8000/applications/${id}/`, data)
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
    const terms = useRef([]);
    const application_statuses = useRef([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/applications/${id}/`)
            .then((res) => {
                setFormData({
                    applicant: res.data.applicant,
                    academic_year: res.data.academic_year,
                    intended_start: res.data.intended_start,
                    intended_major: res.data.intended_major,
                    status: res.data.status,
                    school_last_attended: res.data.school_last_attended,
                    gpa: res.data.gpa,
                    last_updated: res.data.last_updated,
                });
            })
            .catch((error) => {
                console.log(error);
            });

        fetch("http://localhost:8000/majors/")
            .then((res) => res.json())
            .then((data) => (majors.current = data))
            .catch((error) => console.log(error));

        fetch("http://localhost:8000/application-statuses/")
            .then((res) => res.json())
            .then((data) => (application_statuses.current = data))
            .catch((error) => console.log(error));

        fetch("http://localhost:8000/terms/")
            .then((res) => res.json())
            .then((data) => (terms.current = data))
            .catch((error) => console.log(error));
    }, [id]);

    return (
        <>
            <div className="shadow-lg p-3 mb-5 bg-white edit-main-container">
                <h2 className="edit-main-container h2">Edit Application</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Applicant Name"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder="Applicant name"
                                name="applicant"
                                value={formData?.applicant}
                                onChange={handleChange}
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
                                placeholder="Academic year"
                                name="academic_year"
                                value={formData?.academic_year}
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
                                <option
                                    key={formData?.intended_start}
                                    value={formData?.intended_start}
                                >
                                    {terms.current[formData?.intended_start]}
                                </option>
                                {Object.entries(terms.current)
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
                            label="Intended major"
                            className="mb-3"
                        >
                            <Form.Select
                                onChange={handleChange}
                                name="intended_major"
                            >
                                <option
                                    key={formData?.intended_major}
                                    value={formData?.intended_major}
                                >
                                    {majors.current[formData?.intended_major]}
                                </option>
                                {Object.entries(majors.current)
                                    .filter(
                                        ([key]) =>
                                            key !== formData.intended_major
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
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Application Status"
                            className="mb-3"
                        >
                            <Form.Select onChange={handleChange} name="status">
                                <option
                                    key={formData?.status}
                                    value={formData?.status}
                                >
                                    {
                                        application_statuses.current[
                                            formData.status
                                        ]
                                    }
                                </option>
                                {Object.entries(application_statuses.current)
                                    .filter(([key]) => key !== formData.status)
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
                            label="School last attended"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder="School last attended"
                                name="school_last_attended"
                                value={formData?.school_last_attended}
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
                                placeholder="GPA"
                                name="gpa"
                                value={formData?.gpa}
                                min="0.000"
                                step="0.001"
                                max="4.000"
                                onChange={handleChange}
                            />
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

export default EditApplication;
