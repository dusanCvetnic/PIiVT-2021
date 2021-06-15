import React from 'react';
import logo from './logo.svg';
import {Form, Button} from 'react-bootstrap'
import { BrowserRouter, Link, Route } from 'react-router-dom';

function RegisterScreen() {
  return (
    <>
        <Form className="w-50" style={{height: "500px", margin: "0px auto"}}>
            <h1>Registracija</h1>
            
            <Form.Group controlId="formForename">
                <Form.Label>Ime: </Form.Label>
                <Form.Control type="text" placeholder="Unesite ime" />
            </Form.Group>
            <Form.Group controlId="formSurname">
                <Form.Label>Prezime: </Form.Label>
                <Form.Control type="text" placeholder="Unesite prezime" />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Email adresa: </Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Lozinka: </Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Izaberite ulogu: </Form.Label>
                    <Form.Control as="select">
                    <option>student</option>
                    <option>profesor</option>
                    </Form.Control>
            </Form.Group>
            <Button variant="primary" type="button">
            <Link to="/offer" style={{color: "white", textDecoration: "none"}}>Submit</Link>
            </Button>
        </Form>
    </>
  );
}

export default RegisterScreen;