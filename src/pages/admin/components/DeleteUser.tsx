import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons'
import { Tooltip } from 'react-tooltip'
import DeleteModal from '../../../components/DeleteModal'
import { deleteUsers } from '../../../store/users'
import { ReloadType } from '../../../types'
import { connect } from 'react-redux'

type PropTypes = {
    deleteUsers : (id: string) => void
    selected: string[]
} & ReloadType

const DeleteUser =  ({deleteUsers, selected, reloadParams,onReload}: PropTypes) => {
    const [visible, setVisible] = useState<boolean>(false)
    const onHide = () =>{
        setVisible(false)
    }

    const deleteHandler  = async () =>{
        await deleteUsers(selected.join(','))
        onHide()
        await onReload(reloadParams)
    }
  return (
    <>
        <Button className='delete-user' disabled={selected.length ===0} onClick={()=> setVisible(true)} variant='danger'>
            <Trash/>
        </Button>
        <Tooltip anchorSelect='.delete-user' place='top'>
            delete users
        </Tooltip>
        <DeleteModal onHide={onHide} onDelete={deleteHandler} show={visible}/>
    </>
  )
}

export default connect(null, {deleteUsers})(DeleteUser)