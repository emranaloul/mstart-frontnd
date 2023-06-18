import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Image, Form, Button } from 'react-bootstrap'
import { connect, useSelector } from 'react-redux'
import { RootState } from '../../store'
import ClaimedDealsDetails from '../ClaimedDealsDetails'
import { getMyProfile, updateImageHandler, updateUserHandler } from '../../store/auth'
import { UserType } from '../../types'

const defaultImage = 'https://www.freeiconspng.com/uploads/no-image-icon-6.png'
type PropTypes = {
    updateImageHandler: (d: FormData) => void
    updateUserHandler: (u:UserType) => void
    getMyProfile : ()=>void
}
const MyProfile = ({ updateImageHandler,updateUserHandler,getMyProfile }: PropTypes) => {
    const { user: _user } = useSelector((state: RootState) => state.auth)
    const [user,setUser] = useState<UserType>(_user)
    const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData()
        formData.append('avatar', e.target.files?.[0] ?? '')
        updateImageHandler(formData)

    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setUser(u => { return { ...u, [e.target.name]: e.target.value } })
    }
    const setDate = (d: string) => {
        const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
        let date = new Date(d)
        return `${date.getFullYear()}-${months[date.getMonth()]}-${(`0${date.getDate()}`).slice(-2)}`
    }
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        updateUserHandler(user)
    }
    useEffect(()=>{
        setUser(_user)
    },[_user])
    return (
        <Container>
            <Row className='justify-content-center py-2 g-2 align-items-center border border-info my-5 bg-light rounded'>
                <Col xs={12} sm={12} md={5} lg={4} >
                    <Image src={user.image ?? defaultImage} rounded style={{ maxWidth: '100%', maxHeight: '20rem' }} className='my-4' />
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor='avatar' className='btn btn-primary'>Upload Avatar</Form.Label>
                        <Form.Control hidden type="file" size="sm" name='avatar' id='avatar' onChange={uploadHandler} />
                    </Form.Group>
                </Col>
                <Col xs={12} lg={5} md={7} sm={12}  className='border border-info p-5 rounded' style={{height: '100%'}}>
                    <Form onSubmit={submitHandler}>
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
                            <Form.Control type='email' id='email' name='email' required onChange={onChange} value={user.email}>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor='phone'>
                                phone
                            </Form.Label>
                            <Form.Control type='tel' id='phone' name='phone' required onChange={onChange} value={user.phone}>

                            </Form.Control>
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
                            <Form.Control id='dateOfBirth' type='date' name='dateOfBirth' onChange={onChange} value={(user.date_of_birth || user.dateOfBirth) ? user.date_of_birth && setDate(user.date_of_birth) || user.dateOfBirth && setDate(user.dateOfBirth) : ''}>

                            </Form.Control>
                            <Button variant='primary' className='mt-4' type='submit'>Save Changes</Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col lg={3} sm='auto' md='auto'>
                    <ClaimedDealsDetails />
                </Col>
            </Row>

        </Container>
    )
}


const mapDispatchToProps = { updateImageHandler,updateUserHandler ,getMyProfile}

export default connect(null, mapDispatchToProps)(MyProfile)