import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../utils/UserContext";
import BACKEND_BASE_URL from "../utils/config";

const Login = () => {
    console.log(BACKEND_BASE_URL)
    const {setLoggedIn, setToken} = useContext(UserContext)
    const navigate = useNavigate();
    const initalState = {
        email: "",
        password: "",
    };

    const [loginCredentials, setLoginCredentials] = useState(initalState);

    const handleChange = (e) => {
        setLoginCredentials({
            ...loginCredentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `http://localhost:8000/login/`,
                loginCredentials
            );
            if (res.status === 200) {
                setToken(res.data.token);
                setLoggedIn(true);
                navigate("/dashboard");
            } else if (res.status === 403) {
                alert("Invalid email or password please try again!");
            }
        } catch (error) {
            console.log(error);
            alert("Error Logging In");
        }
    };

    return (
        <div className="shadow p-3 mb-5 rounded register-login-main-container">
            <div className="register-login-sub-container">
                <h2 className="lregister-login-sub-container h2">Welcome to UniApps</h2>
            </div>
            <div
                className="shadow p-3 mb-5 bg-white rounded login-form-main-container">
                <Form className="register-login-form-margin" onSubmit={handleSubmitForm}>
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
                    <div className="login-button-title">
                        <Button
                            variant="primary"
                            type="submit"
                            style={{
                                backgroundColor: "#f78503",
                                border: "#f78503",
                                fontWeight: "bold",
                                margin: "10px",
                            }}
                        >
                            Login
                        </Button>
                    </div>
                </Form>
                <p>
                    Don't have an account? <a href="/register">Register</a>{" "}
                    today!
                </p>
            </div>
        </div>
    );
};

export default Login;
