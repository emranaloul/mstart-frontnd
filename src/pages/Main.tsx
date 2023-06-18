import React, { Children, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { connect, useSelector } from 'react-redux'
import { getDealsHandler } from '../store/deals';
import { RootState } from '../store';
import Pagination from '../components/Pagination';
import { createClaimHandler } from '../store/claims';
import { ClaimType, DealType } from '../types';
import { Check, XCircle } from 'react-bootstrap-icons';

type PropTypes = {
    getDealsHandler: (d: {}) => void
    createClaimHandler: (c: ClaimType) => void
}
const Main = ({ getDealsHandler, createClaimHandler }: PropTypes) => {
    const [params, setParams] = useState<{ limit: number, offset: number } & {}>({ limit: 10, offset: 0 })
    const { data, count } = useSelector((state: RootState) => state.deals)
    const { loggedIn } = useSelector((state: RootState) => state.auth)
    useEffect(() => {
        loggedIn && getDealsHandler(params)
    }, [loggedIn])
    const claimHandler = async (d: DealType) => {
        if (d.id) {
            await createClaimHandler({ deal_id: d.id, amount: d.amount, currency: d.currency })
            await getDealsHandler(params)
        }
    }

    return (
        <div>
            <h2 style={{ borderBottom: '2px grey solid', display: 'block-inline', width: 'fit-content', textAlign: 'center', margin: 'auto', padding: '1rem' }}>Find Your favorite deal</h2>
            <Container>
                <Row className='justify-content-center gy-3 my-4'>
                    {
                        data.length === 0 ? <h6>No Deals Yet.....</h6> :
                            Children.toArray(data.map(d =>
                                <Col xs={12} sm={6} md={4} xl={3}>
                                    <Card>
                                        <Card.Header>

                                            <Card.Title>{d.name}</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Subtitle className="mb-2 text-muted">{`${d.amount} ${d.currency}`}</Card.Subtitle>
                                            <Card.Subtitle className="mb-2 text-muted">{d.status}</Card.Subtitle>
                                            <Card.Text>
                                                {d.description}
                                            </Card.Text>

                                        </Card.Body>
                                        <Card.Footer>

                                            <Button variant={(d.status && ['claimed','active'].includes(d.status.toLocaleLowerCase())) ? 'primary':'danger'} onClick={() => claimHandler(d)} disabled={d.status?.toLocaleLowerCase() !== 'active'}>
                                                {d.status === 'claimed' &&
                                                    <>
                                                        <Check size={20} />
                                                        Claimed
                                                    </>}
                                                {d.status?.toLocaleLowerCase() === 'active' ? 'Claim Now!' : ''}
                                                {d.status && !['claimed','active'].includes(d.status.toLocaleLowerCase()) && <><XCircle/> {d.status} </>}
                                            </Button>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))
                    }
                </Row>
                <Pagination limit={params.limit} count={count} onPageChange={getDealsHandler} updateParams={setParams} />
            </Container>
        </div>
    )
}


const mapDispatchToProps = { getDealsHandler, createClaimHandler }

export default connect(null, mapDispatchToProps)(Main)