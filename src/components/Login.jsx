import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from "axios";
import {setToken} from "../utils/tokenService"
import { useNavigate } from "react-router-dom";

const Login = ({setLoggedIn}) => {

    const navigate = useNavigate();
    const initalState = {
        'email': '',
        'password': '',
    }

    const [loginCredentials, setLoginCredentials] = useState(initalState);

    const handleChange = (e) => {
        console.log(e.target.name)
        setLoginCredentials({...loginCredentials, [e.target.name]: e.target.value })
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8000/login/`, loginCredentials);
            if (res.status === 200) {
                setToken(res.data.token)
                setLoggedIn(true);
                navigate('/dashboard')
            } else if (res.status === 403) {
                alert('Invalid email or password please try again!')
            }
        } catch (error) {
            console.log(error)
            alert('Error Logging In')
        }
    }

    return (
        <div class="shadow p-3 mb-5 rounded" style={{width:"370px", margin:"5% auto", backgroundColor:"#329ebc"}}>
            <div style={{textAlign: "center", margin:"30px 0", fontFamily:"Poiret One"}}>
                <h2 style={{fontSize:"35px"}}>Welcome to UniApps</h2>
            </div>
            <div class="shadow p-3 mb-5 bg-white rounded" style={{height:"350px"}}>
                <Form style={{marginTop:"40px"}} onSubmit={handleSubmitForm}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                            <Form.Control type="email" placeholder="Email address" name="email" onChange={handleChange} />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <FloatingLabel controlId="floatingInput" label="Password" className="mb-3">
                            <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
                        </FloatingLabel>
                    </Form.Group>
                    <div style={{textAlign:"center"}}>
                        <Button variant="primary" type="submit" style={{backgroundColor:"#f78503", border:"#f78503", fontWeight:"bold", margin:"10px"}}>
                            Login
                        </Button>
                        <Button variant="primary" type="submit" style={{backgroundColor:"#ffb703", border:"#ffb703", fontWeight:"bold",  margin:"10px"}}>
                            Register
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;
