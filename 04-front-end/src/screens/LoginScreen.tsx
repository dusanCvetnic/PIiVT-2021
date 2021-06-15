import React from 'react';
import logo from './logo.svg';
import {Form, Button} from 'react-bootstrap'
import { BrowserRouter, Link, Route } from 'react-router-dom';

function LoginScreen() {
  return (
    <>
        <Form className="w-50" style={{height: "500px", margin: "0px auto"}}>
            <h1>Morate biti ulogovani da biste pristupili aplikaciji</h1>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group>
                <p>Nemate profil? <Link to="/register">Registrujte se</Link></p>
            </Form.Group>
            <Button variant="primary" type="button">
                <Link to="/offer" style={{color: "white", textDecoration: "none"}}>Submit</Link>
            </Button>
        </Form>
    </>
  );
}

export default LoginScreen;