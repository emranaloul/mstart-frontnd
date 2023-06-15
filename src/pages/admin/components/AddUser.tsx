import React, { useState } from 'react'
import { Button, Container, Form, Modal, Row, Col } from 'react-bootstrap'
import { PersonAdd } from 'react-bootstrap-icons'
import { connect } from 'react-redux'
import UserModal from './UserModal'
import { signupHandler } from '../../../store/auth'
import { ReloadType, UserType } from '../../../types'
import { Tooltip } from 'react-tooltip'

type PropTypes = {
    signupHandler: (u: UserType) => void

} & ReloadType
export const AddUser = ({ signupHandler, reloadParams, onReload }: PropTypes) => {
    const [visible, setVisible] = useState<boolean>(false)
    const onHide = () => {
        setVisible(false)
    }
    const signup = async (u: UserType) => {
        await signupHandler(u)
        onHide()
        await onReload(reloadParams)
    }
    return (
        <div>
            <Button onClick={() => setVisible(true)} className='add-user'>
                <PersonAdd size={20} />
            </Button>
            <UserModal visible={visible} onHide={onHide} onSubmit={signup} />
            <Tooltip anchorSelect='.add-user' place='top'>
            add user
            </Tooltip>

        </div>
    )
}


const mapDispatchToProps = { signupHandler }

export default connect(null, mapDispatchToProps)(AddUser)