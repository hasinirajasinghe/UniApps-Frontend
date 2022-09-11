import React, { useState, useEffect } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

const AddNewApplicant = () => {
    const initialState = {
        name: "",
        email: "",
        phone_number: "",
        major: "",
        enrollment_status: "",
    };

    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/applicants", formData).then((res) => {
            setFormData(initialState);
            navigate("/dashboard", { replace: true });
        });
    };

    useEffect(() => {
        fetch('http://localhost:8000/majors/')
        .then(res => res.json())
        .then(data => majors.current = data)
        .catch(error => console.log(error))

        fetch('http://localhost:8000/enrollment-statuses/')
        .then(res => res.json())
        .then(data => enrollment_statuses.current = data)
        .catch(error => console.log(error))
    }, [id])

    return (
        <div>
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
                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Phone number"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Phone number"
                            name="phonenumber"
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
                        <Form.Select onChange={handleChange}></Form.Select>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Enrollment status"
                        className="mb-3"
                    >
                        <Form.Select onChange={handleChange}></Form.Select>
                    </FloatingLabel>
                </Form.Group>
                <div>
                    <Button>Submit</Button>
                </div>
            </Form>
        </div>
    );
};

export default AddNewApplicant;
