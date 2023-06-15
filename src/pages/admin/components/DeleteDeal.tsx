import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons'
import { connect } from 'react-redux'
import { deleteDealHandler } from '../../../store/deals'
import { DealType } from '../../../types'

type PropTypes = {
    deleteDealHandler : (id: string) => void
    deal: DealType
    onReload: (p: {}) => void
    reloadParams: {}
}
export const DeleteDeal = ({deleteDealHandler,deal, onReload, reloadParams}: PropTypes) => {
    const [visible, setVisible] = useState<boolean>(false)

    const deleteDeal = async (id: string) =>{
        await deleteDealHandler(id)
        await onReload(reloadParams)
        setVisible(false)
    }
    return (
        <>
            <Button variant='danger' className='delete-deal' onClick={() => setVisible(true)}>
                <Trash size={20} />

            </Button>

            <Modal show={visible} centered>
                <Modal.Header>
                    <Modal.Title>
                        Delete Deal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you Sure you want to delete?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={()=> deleteDeal(deal.id? deal.id : '')}>Confirm</Button>
                    <Button variant='secondary' onClick={() => setVisible(false)}>Cancel</Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}


const mapDispatchToProps = {deleteDealHandler}

export default connect(null, mapDispatchToProps)(DeleteDeal)