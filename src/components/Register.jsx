import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../utils/config"

const Register = () => {
    const initalState = {
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
    };

    const navigate = useNavigate()
    const [registration, setRegistration] = useState(initalState);

    const handleChange = (e) => {
        setRegistration({ ...registration, [e.target.name]: e.target.value });
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${config.BACKEND_BASE_URL}/register/`,
                registration
            );
            if (res.status === 200) {
                navigate("/login");
            } else {
                console.log(res.data)
                alert("Failed to register, please try again!!!");
            }
        } catch (error) {
            console.log(error);
            alert("Failed to register, please try again!");
        }
    };

    return (
        <div className="shadow p-3 mb-5 rounded register-login-main-container"        >
            <div className="register-login-sub-container">
                <h2 className="register-login-sub-container h2">
                    Register
                </h2>
            </div>
            <div className="shadow p-3 mb-5 bg-white rounded register-form-main-container">
                <Form onSubmit={handleSubmitForm} className="register-login-form-margin">
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Username"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                name="username"
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

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Password"
                            className="mb-3"
                        >
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                            />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Password confirmation"
                            className="mb-3"
                        >
                            <Form.Control
                                type="password"
                                placeholder="Password confirmation"
                                name="password_confirmation"
                                onChange={handleChange}
                            />
                        </FloatingLabel>
                    </Form.Group>

                    <div style={{ textAlign: "center" }}>
                        <Button
                            variant="primary"
                            type="submit"
                            style={{
                                backgroundColor: "#ffb703",
                                border: "#ffb703",
                                fontWeight: "bold",
                                textAlign: "center",
                            }}
                        >
                            Register
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Register;
