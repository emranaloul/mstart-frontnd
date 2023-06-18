import React, { Fragment, useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { ParamsType, UserType } from '../../types'
import { getUsers, updateUser } from '../../store/users'
import TableData from '../../components/Table'
import { RootState } from '../../store'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Plus, PersonAdd, Pen, FunnelFill, XCircleFill } from 'react-bootstrap-icons'
import AddUser from './components/AddUser'
import DeleteUser from './components/DeleteUser'
import UserModal from './components/UserModal'
import { Tooltip } from 'react-tooltip'
import { resetState, setToast } from '../../store/toast'

type PropTypes = {
  getUsers: (p: ParamsType) => void
  updateUser: (u: UserType) => void
}

type ActionsPropsType = {
  data: UserType
  updateUser: (u: UserType) => void
}
const IDBody = ({ name, id }: UserType) => {
  const dispatch = useDispatch()
  const handler = () =>{
    dispatch(setToast({type:'create', text: 'id has been copied'}))
    navigator.clipboard.writeText(id??'')
    // dispatch(resetState())
  }
  return (
    <Fragment>
      <Button className={name} variant='info' onClick={handler}  title={id}>copy</Button>

    </Fragment>
  )
}

const Actions = ({ data, updateUser }: ActionsPropsType) => {
  const [visible, setVisible] = useState<boolean>(false)
  return (
    <Fragment>
      <Button variant='secondary' className='update-user' onClick={() => setVisible(true)}>
        <Pen size={15} />
      </Button>
      <UserModal user={data} onSubmit={updateUser} visible={visible} onHide={() => setVisible(false)} />
      <Tooltip anchorSelect='.update-user' place='top'>
        update user
      </Tooltip>
    </Fragment>
  )
}
export const Users = ({ getUsers, updateUser }: PropTypes) => {
  const [params, setParams] = useState<ParamsType>({ limit: 10, offset: 0 })
  const { data, count } = useSelector((state: RootState) => state.users)
  const [selected, setSelected] = useState<string[]>([])
  useEffect(() => {
    getUsers(params)
  }, [])

  const columns = [
    { header: 'id', field: 'id', body: (d: UserType) => <IDBody {...d} /> },
    { header: 'name', field: 'name' },
    { header: 'email', field: 'email' },
    { header: 'role', field: 'role' },
    { header: 'gender', field: 'gender' },
    { header: 'status', field: 'status' },
    { header: 'last login', field: 'last_login', body: (d: UserType) => d.last_login_datetime_utc ? new Date(d.last_login_datetime_utc).toLocaleString() : '-' },
    { header: 'actions', field: 'action', body: (d: UserType) => <Actions data={d} updateUser={updateUser} /> }
  ]
  const searchHandler = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    const target = e.target as typeof e.target & {
      id: {value: string}
    }
    getUsers({...params,id: target.id.value})
  }
  return (
    <Container>
      <Row className='justify-content-center gy-4'>
        <Col xs={12} className='bg-light mt-5'>
          <Row className='justify-content-end my-2'>
            <Col xs='auto'>
              <AddUser onReload={getUsers} reloadParams={params} />
            </Col>
            <Col xs='auto'>
              <DeleteUser onReload={getUsers} reloadParams={params} selected={selected} />
            </Col>
          </Row>
        </Col>
        {/* <Col xs={6} className='border p-5 border-light rounded bg-light'>
          <Form onSubmit={searchHandler}>
            <Form.Group>

              <Form.Control placeholder='search by user id...' id='id'>

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
        </Col> */}
        <Col xs={12}>
          <TableData updateParams={setParams} onSelect={e => setSelected(e)} checkbox count={count} limit={params.limit} data={data} columns={columns} onPageChange={getUsers} />
        </Col>
      </Row>
    </Container>
  )
}


const mapDispatchToProps = { getUsers, updateUser }

export default connect(null, mapDispatchToProps)(Users)