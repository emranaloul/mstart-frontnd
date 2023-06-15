import React, { Children, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { getClaimsDetails } from '../store/claims'
import { Alert, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { RootState } from '../store';

type PropTypes = {
  getClaimsDetails: () => void
}
export const ClaimedDeals = ({ getClaimsDetails }: PropTypes) => {
  const { detailed: { amounts, count } } = useSelector((state: RootState) => state.claims)
  useEffect(() => {
    getClaimsDetails()
  }, [])
  return (
    <div>
      <Container>
        <Row className='justify-content-center my-5'>
          <Col xs='auto'>
            <Alert>
              You have claimed {count} Deals as below
            </Alert>
            <ListGroup>
              {Children.toArray(amounts.map((a: { currency: string, sum: string }) => <ListGroup.Item>{`${a.sum} ${a.currency}`}</ListGroup.Item>))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  )
}


const mapDispatchToProps = { getClaimsDetails }

export default connect(null, mapDispatchToProps)(ClaimedDeals)