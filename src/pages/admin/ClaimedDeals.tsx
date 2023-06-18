import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import TableData from '../../components/Table'
import { getClaimsHandler } from '../../store/claims'
import { ClaimType, ParamsType } from '../../types'
import { RootState } from '../../store'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { FunnelFill, XCircleFill } from 'react-bootstrap-icons'
import { Tooltip } from 'react-tooltip'
type PropTypes = {
  getClaimsHandler: (d: ParamsType & { user_id?: string }) => void
}
const ClaimedDeals = ({ getClaimsHandler }: PropTypes) => {
  const [params, setParams] = useState<ParamsType & { user_id?: string }>({ limit: 10, offset: 0 })
  const { data, count } = useSelector((state: RootState) => state.claims)
  useEffect(() => {
    getClaimsHandler(params)
  }, [])
  const columns = [
    { header: 'name', field: 'deal_name' },
    { header: 'amount', field: 'amount', body: (c: ClaimType) => `${c.amount} ${c.currency}` },
    { header: 'claimer', field: 'username' },
    { header: 'claim date', field: 'username', body: (c: ClaimType) => c.server_datetime ? new Date(c.server_datetime).toLocaleDateString() : '-' }
  ]
  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      user_id: { value: string }
    }
    getClaimsHandler({ ...params, user_id: target.user_id.value })
  }
  return (
    <Container>
      <Row className='justify-content-center gy-3'>
        <Col xs={6} className='border p-5 border-light rounded bg-light'>
          <Form onSubmit={searchHandler}>
            <Form.Group>

              <Form.Control placeholder='search by user id...' id='user_id'>

              </Form.Control>
            </Form.Group>
            <Button className='m-2 search' type='submit'>
              <FunnelFill />

            </Button>
            <Button className='m-2 reset' variant='secondary' type='reset'>
              <XCircleFill />

            </Button>

            <Tooltip anchorSelect='.search' place='bottom'>
              search
            </Tooltip>
            <Tooltip anchorSelect='.reset' place='bottom'>
              reset filter
            </Tooltip>
          </Form>
        </Col>
        <Col xs={12}>
          <TableData data={data} count={count} columns={columns} onPageChange={getClaimsHandler} limit={params.limit} />
        </Col>
      </Row>
    </Container>
  )
}


const mapDispatchToProps = { getClaimsHandler }

export default connect(null, mapDispatchToProps)(ClaimedDeals)