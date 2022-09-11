import React, { useState, useEffect, useRef } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
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
    const [toastMessage, setToastMessage] = useState('')
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/dashboard", formData).then((res) => {
            setFormData(initialState);
            navigate("/dashboard", { replace: true });
        });
    };

    useEffect(() => {
        axios.get(`http://localhost:3000/dashboard/${id}`).then((res) => {
            setFormData(res.data);
        });
    }, [id]);

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Applicant Name"
                        className="mb-3"
                    >
                        <Form.Select onChange={handleChange}></Form.Select>
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
                            name="academicyear"
                            value={formData?.academicyear}
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
                        <Form.Select onChange={handleChange}></Form.Select>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Intended major"
                        className="mb-3"
                    >
                        <Form.Select onChange={handleChange}></Form.Select>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Enrollment Status"
                        className="mb-3"
                    >
                        <Form.Select onChange={handleChange}></Form.Select>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Last updated"
                        className="mb-3"
                    >
                        <Form.Control
                            type="date"
                            placeholder="Last updated"
                            name="lastupdated"
                            value={formData?.lastupdated}
                            onChange={handleChange}
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
                            placeholder="School last attended"
                            name="schoollastattended"
                            value={formData?.schoollastattended}
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
                <div>
                    <Button>Submit</Button>
                </div>
            </Form>
        </div>
    );
};

export default EditApplication;
