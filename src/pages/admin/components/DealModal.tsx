import React, { useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { DealType } from '../../../types'


type PropTypes = {
    visible: boolean
    onHide: () => void
    deal?: DealType
    onSubmit: (d: DealType) => void

}
export const DealForm = ({ visible, onHide, deal: _deal, onSubmit }: PropTypes) => {
    const [deal, setDeal] = useState<DealType | null>(_deal ?? null)
    const initialDeal: DealType = {
        name: '',
        description: '',
        amount: 0,
        currency: 'jod'
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setDeal((d) => {
            if (e.target.id as keyof DealType)
                if (d) {
                    return { ...d, [e.target.id]: e.target.value }
                }
            return { ...initialDeal, [e.target.id]: e.target.value }
        })
    }
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        const target = e.target as typeof e.target & {
            reset: () => void
        }
        e.preventDefault()
        deal && onSubmit(deal)
        target.reset()
        setDeal(initialDeal)
        onHide()

    }
    return (
        <div>
            <Modal
                show={visible} onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Deal
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={submitHandler}>
                    <Container>
                        <Row className='justify-content-center'>
                            <Col xs='auto'>
                                <Form.Group>
                                    <Form.Label htmlFor='name'>Name</Form.Label>
                                    <Form.Control id='name' name='name' value={deal?.name} onChange={onChange} required></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xs='auto'>
                                <Form.Group>
                                    <Form.Label htmlFor='amount'>Amount</Form.Label>
                                    <Form.Control id='amount' name='amount' type='number' value={deal?.amount} onChange={onChange} required></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xs='auto'>
                                <Form.Group>
                                    <Form.Label htmlFor='currency'>Currency</Form.Label>
                                    <Form.Select id='currency' name='currency' value={deal?.currency} onChange={onChange} required >
                                        <option value="jod">JOD</option>
                                        <option value="dollar">DOllAR</option>
                                        <option value="sar">SAR</option>
                                        <option value="euro">EURO</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                           {deal?.status && <Col xs='auto'>
                                <Form.Group>
                                    <Form.Label htmlFor='status'>Status</Form.Label>
                                    <Form.Select id='status' name='status' value={deal?.status} onChange={onChange} required >
                                        <option value="active">active</option>
                                        <option value="inactive">inactive</option>
                                        <option value="expired">expired</option>
                                        <option value="deleted">deleted</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>}
                            <Col xs='6'>
                                <Form.Group>
                                    <Form.Label htmlFor='description'>Description</Form.Label>
                                    <Form.Control id='description' as="textarea" value={deal?.description} onChange={onChange}>
                                    </Form.Control>

                                </Form.Group>
                            </Col>
                        </Row>
                    </Container>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={onHide} type='button'>Close</Button>
                        <Button type='submit'>Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}


const mapDispatchToProps = {}

export default connect(null, mapDispatchToProps)(DealForm)