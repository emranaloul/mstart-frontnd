import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../store'
import { Container, Col, Row, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {signinHandler} from  '../store/auth'
type PropTypes = {
    signinHandler: (d : { email: string, password: string }) => void
}
export const Signin = ({signinHandler}: PropTypes) => {
    
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const target = e.target as typeof e.target & {
            email: {value: string}
            password : {value: string}
        }
        signinHandler({email: target.email.value, password: target.password.value})
    }

    return (
        <Container style={{ maxHeight: '100vh', padding: '15%' }}>
            <Row className='justify-content-center align-items-center' style={{ border: '1px solid black', padding: '1rem', borderRadius: '1rem', backgroundColor: 'skyblue' }}>
                <Col xs={12}><h1 style={{ margin: '3rem 0', color: '#fff' }}>Sign-in</h1></Col>
                <Col xs={6}>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" id='email'/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Password </Form.Label>
                            <Form.Control type="password" placeholder="Password" id='password'/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="avatar">
                            <Form.Text className="text-muted">
                                already have an account? <Link to='/signup'>Sign-up</Link>
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>

            </Row>
        </Container>
    )
}

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = {signinHandler}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)