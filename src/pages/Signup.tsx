import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { Container, Col, Row, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { signupHandler } from '../store/auth'
import { UserType } from '../types'
import { validateEmail, validateMobileNumber } from '../service/Helpers'
import { setDialog } from '../store/dialog'
type PropTypes = {
    signupHandler: (data: UserType | FormData) => Promise<void>
}

export const Signup = ({ signupHandler }: PropTypes) => {
    const [file, setFile] = useState<boolean>(true)
    const dispatch = useDispatch()
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            avatar: { files: Blob[] }
            email: { value: string }
            name: { value: string }
            phone: { value: string }
            gender: { value: string }
            password: { value: string }
            dateOfBirth: { value: string }
        }
        let data: UserType & { avatar?: Blob, password: string, dateOfBirth: string } = { email: '', phone: '', name: '', gender: '', password: '', dateOfBirth: '' }
        data.email = target.email.value
        data.phone = target.phone.value
        data.gender = target.gender.value
        data.name = target.name.value
        data.password = target.password.value
        data.avatar = target.avatar.files[0]
        data.dateOfBirth = target.dateOfBirth.value
        let formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
            value && formData.append(key, value)
            return
        })
        try {
            validateEmail(target.email.value)
            validateMobileNumber(target.phone.value)
            await signupHandler(formData)
        } catch (error) {
            if( error instanceof Error){
                dispatch( setDialog({type:'error', text: error.message, title:'Registration Error'}))
            }
        }
    }
    return (
        <Container style={{ maxHeight: '100vh', padding: '7%' }}>
            <Row className='justify-content-center align-items-center' style={{ border: '1px solid white', padding: '1rem', borderRadius: '1rem', backgroundColor: 'skyblue' }}>
                <Col xs={12}><h1 style={{ margin: '3rem 0', color: '#fff' }}>Sign-up Here</h1></Col>
                <Col xs={6}>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" >
                            <Form.Control type="email" placeholder="Enter email" id='email' />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control type="password" placeholder="Password" id='password' />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control type="text" placeholder="your name" id='name' />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control type="tel" placeholder="your phone number" id='phone' />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>gender</Form.Label>
                            <Form.Select placeholder="gender" id='gender'>
                                <option value="male">male</option>
                                <option value="female">female</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3"  >
                            <Form.Label>date of birth </Form.Label>
                            <Form.Control type="date" placeholder="date of birth" id='dateOfBirth' />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor='avatar' className='btn btn-secondary'>upload avatar</Form.Label>
                            <Form.Control type="file" hidden={file} id='avatar' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target?.files?.[0] ? false : true)} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Text className="text-muted">
                                already have an account? <Link to='/signin'>Sign-in</Link>
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

const mapDispatchToProps = { signupHandler }

export default connect(mapStateToProps, mapDispatchToProps)(Signup)