import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Container, Form, Modal, Row, Col } from 'react-bootstrap'
import { UserType } from '../../../types'

type PropTypes = {
    visible: boolean
    onHide: () => void
    user?: UserType
    onSubmit: (u: UserType) => void
}

const UserModal = ({ visible, onHide, user: _user, onSubmit }: PropTypes) => {
    const initialUser: UserType = {
        name: '',
        phone: '',
        email: '',
        gender: 'male',
        role: 'user'
    }
    const [user, setUser] = useState<UserType>(_user ?? initialUser)
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = e.target
        setUser(u => { return { ...u, [e.target.name]: e.target.value } })
    }
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(user)
        setUser(initialUser)
    }

    useEffect(() => {
        _user && (setUser(_user))
    }, [_user])

    const setDate = (d: string) => {
        const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
        let date = new Date(d)
        return `${date.getFullYear()}-${months[date.getMonth()]}-${(`0${date.getDate()}`).slice(-2)}`
    }
    return (
        <>
            <Modal centered show={visible} onHide={onHide}>
                <Modal.Header>
                    <Modal.Title>
                        User Modal
                    </Modal.Title>
                </Modal.Header>
                <Container>
                    <Row>
                        <Col>

                            <Form onSubmit={submitHandler} className='p-3'>
                                <Form.Group>
                                    <Form.Label htmlFor='name' >
                                        Name
                                    </Form.Label>
                                    <Form.Control id='name' name='name' required onChange={onChange} value={user.name}>

                                    </Form.Control>
                                </Form.Group>
                                {!user.id && <Form.Group>
                                    <Form.Label htmlFor='password'>
                                        Password
                                    </Form.Label>
                                    <Form.Control type='password' id='password' name='password' required onChange={onChange}>

                                    </Form.Control>
                                </Form.Group>}
                                <Form.Group>
                                    <Form.Label htmlFor='email'>
                                        Email
                                    </Form.Label>
                                    <Form.Control type='email' id='email' name='email' required onChange={onChange} value={user.email}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor='phone'>
                                        phone
                                    </Form.Label>
                                    <Form.Control type='tel' id='phone' name='phone' required onChange={onChange} value={user.phone}>

                                    </Form.Control>
                                </Form.Group>
                                {user.id && <Form.Group>
                                    <Form.Label htmlFor='status'>
                                        status
                                    </Form.Label>
                                    <Form.Select id='status' name='status' onChange={onChange} value={user.status}>
                                        <option value="active">active</option>
                                        <option value="inactive">inactive</option>
                                    </Form.Select>
                                </Form.Group>}
                                <Form.Group>
                                    <Form.Label htmlFor='role'>
                                        role
                                    </Form.Label>
                                    <Form.Select id='role' name='role' onChange={onChange} value={user.role}>
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor='gender'>
                                        gender
                                    </Form.Label>
                                    <Form.Select id='gender' name='gender' onChange={onChange} value={user.gender}>
                                        <option value="male">male</option>
                                        <option value="female">female</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor='dateOfBirth'>
                                        date Of Birth
                                    </Form.Label>
                                    <Form.Control id='dateOfBirth' type='date' name='dateOfBirth' onChange={onChange} value={(user.date_of_birth || user.dateOfBirth) ? user.date_of_birth && setDate(user.date_of_birth) || user.dateOfBirth&&  setDate(user.dateOfBirth) : ''}>

                                    </Form.Control>
                                </Form.Group>
                                <Modal.Footer>
                                    <Button variant='primary' type='submit'>Submit</Button>
                                    <Button variant='secondary' onClick={onHide}>Close</Button>
                                </Modal.Footer>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Modal>
        </>
    )
}


const mapDispatchToProps = {}

export default connect(null, mapDispatchToProps)(UserModal)