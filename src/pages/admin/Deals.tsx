import React, { Fragment, useEffect, useState } from 'react'
import { Button, Col, Row, Tooltip } from 'react-bootstrap'
import { connect, useSelector } from 'react-redux'
import TableData from '../../components/Table'
import { RootState } from '../../store'
import { getDealsHandler } from '../../store/deals'
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Plus, Trash } from 'react-bootstrap-icons';
import DealModal from './components/CreateDeal'
import UpdateDeal from './components/UpdateDeal'
import { DealType, ParamsType } from '../../types'
import DeleteDeal from './components/DeleteDeal'


type PropTypes = {
  getDealsHandler: (d: {}) => void
}
type ActionsPropTypes = {
  data: DealType
  onReload: (p: {}) => void
  reloadParams: {}
}
export const Actions = ({ data, onReload, reloadParams }: ActionsPropTypes) => {
  return (
    <Fragment>
      <Row className='justify-content-center align-items-center'>
        <Col xs='auto'>
          <UpdateDeal onReload={onReload} reloadParams={reloadParams} deal={data} />

        </Col>
        <Col xs='auto'>
          <DeleteDeal onReload={onReload} reloadParams={reloadParams} deal={data}/>
        </Col>
      </Row>
    </Fragment>
  )
}
const Deals = ({ getDealsHandler }: PropTypes) => {
  const { data, count } = useSelector((state: RootState) => state.deals)
  const [params, setParams] = useState<ParamsType>({ limit: 10, offset: 0 })
  const columns = [
    { header: 'name', field: 'name' },
    { header: 'description', field: 'description' },
    { header: 'amount', field: 'amount' },
    { header: 'currency', field: 'currency' },
    { header: 'status', field: 'status' },
    { header: 'action', field: 'action', body: (d: DealType) => <Actions onReload={getDealsHandler} reloadParams={params} data={d} /> }
  ]
  useEffect(() => {
    getDealsHandler(params)
  }, [])
  return (
    <>
      <Row className='justify-content-center align-items-center gy-3' >
        <Col xs={9} >
          <Row className='justify-content-end align-items-center my-3 '>
            <Col xs='auto'>
              <DealModal onReload={getDealsHandler} reloadParams={params} />
            </Col>
          </Row>
        </Col>
        <Col xs={9}>
          <TableData updateParams={setParams} data={data} columns={columns} count={count} limit={params.limit} onPageChange={getDealsHandler} />
        </Col>
      </Row>
      <ReactTooltip
        anchorSelect='.create-deal'
        place='top'
      >
        create deal
      </ReactTooltip>
      <ReactTooltip
        anchorSelect='.delete-deal'
        place='top'
      >
        delete deal
      </ReactTooltip>
    </>
  )
}


const mapDispatchToProps = { getDealsHandler }

export default connect(null, mapDispatchToProps)(Deals)