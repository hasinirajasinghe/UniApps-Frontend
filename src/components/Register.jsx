import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const Register = () => {
    const initalState = {
        'username': '',
        'email': '',
        'password': '',
        'password_confirmation': ''
    }

    const [registration, setRegistration] = useState(initalState);

    const handleChange = (e) => {
        console.log(e.target.name)
        setRegistration({...registration, [e.target.name]: e.target.value })
    }

    return (
        <div class="shadow p-3 mb-5 rounded" style={{width:"370px", margin:"5% auto", backgroundColor:"#329ebc"}}>
            <div style={{textAlign: "center", margin:"30px 0", fontFamily:"Poiret One"}}>
                <h2 style={{fontSize:"35px"}}>Register</h2>
            </div>
            <div>
                <Form style={{marginTop:"40px"}}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
                            <Form.Control type="name" placeholder="Username" name="username" onChange={handleChange}/>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                            <Form.Control type="email" placeholder="Email address" name="email" onChange={handleChange} />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <FloatingLabel controlId="floatingInput" label="Password" className="mb-3">
                            <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange}/>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <FloatingLabel controlId="floatingInput" label="Password confirmation" className="mb-3">
                            <Form.Control type="password" placeholder="Password confirmation"  name="password_confirmation" onChange={handleChange}/>
                        </FloatingLabel>
                    </Form.Group>

                    <div style={{textAlign:"center"}}>
                        <Button variant="primary" type="submit" style={{backgroundColor:"#ffb703", border:"#ffb703", fontWeight:"bold", textAlign:"center"}}>
                            Register
                        </Button> 
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Register;
