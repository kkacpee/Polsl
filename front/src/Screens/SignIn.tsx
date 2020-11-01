import React from 'react';
import Login from '../Components/Login'
import {Container, Col, Row} from 'react-bootstrap';

const SignIn = () => {
    return(
        <>
        <Container className="h-100">
         <Row className="h-100 align-items-center justify-content-center">
            <Col md={6}>
                    <Login />  
            </Col>
        </Row>
        </Container>
            
        </>
    )
};

export default SignIn;