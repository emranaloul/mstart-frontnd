import React, { useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Tooltip } from "react-tooltip";
import { Plus } from 'react-bootstrap-icons';
import DealModal from './DealModal';
import { createDealHandler } from '../../../store/deals';
import { DealType } from '../../../types';

type PropTypes = {
    createDealHandler: (d: DealType) => void
    onReload: (p: {}) => void
    reloadParams: {}
}

const CreateDeal = ({ createDealHandler, onReload, reloadParams }: PropTypes) => {
    const [visible, setVisible] = useState<boolean>(false)
    const onHide = () => {
        setVisible(false)
    }

    const createDeal = async (e: DealType) => {
        await createDealHandler(e)
        await onReload(reloadParams)
    }
    return (
        <>
            <Button variant='primary' className='create-deal' onClick={() => setVisible(true)}>
                <Plus size={20} />
            </Button>
            <DealModal visible={visible} onHide={onHide} onSubmit={createDeal} />
            <Tooltip
                anchorSelect='.create-deal'
                place='top'
            >
                create deal
            </Tooltip>
        </>
    )
}


const mapDispatchToProps = { createDealHandler }

export default connect(null, mapDispatchToProps)(CreateDeal)