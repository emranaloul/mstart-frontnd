import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Pen } from 'react-bootstrap-icons'
import { connect } from 'react-redux'
import DealModal from './DealModal'
import { updateDealHandler } from '../../../store/deals'
import { DealType } from '../../../types'
import { Tooltip } from 'react-tooltip'

type PropTypes = {
    updateDealHandler: (d: DealType) => void
    deal: DealType
    onReload: (p: {}) => void
    reloadParams: {}
}
export const UpdateDeal = ({ updateDealHandler, deal, onReload, reloadParams }: PropTypes) => {
    const [visible, setVisible] = useState<boolean>(false)
    const onHide = () => {
        setVisible(false)
    }
    const updateDeal = async (d: DealType) => {
        await updateDealHandler(d)
        await onReload(reloadParams)
        onHide()
    }
    return (
        <div>
            <Button variant='info' className='update-deal' onClick={() => setVisible(true)}>
                <Pen size={15} />
            </Button>
            <DealModal visible={visible} onHide={onHide} onSubmit={updateDeal} deal={deal} />
            <Tooltip anchorSelect='.update-deal' place='top'>
                update deal
            </Tooltip>
        </div>
    )
}


const mapDispatchToProps = { updateDealHandler }

export default connect(null, mapDispatchToProps)(UpdateDeal)