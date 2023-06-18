import React from 'react'
import { Button, Modal } from 'react-bootstrap'


type PropTypes = {
    show: boolean;
    onHide(): void;
    item?: { } | string | undefined
    onDelete(i ?: {}| string) : void

}
const DeleteModal = ({show, onHide, onDelete, item}:PropTypes) => {
  return (
    <div>
         <Modal show={show} centered>
                <Modal.Header>
                    <Modal.Title>
                        Delete 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you Sure you want to delete?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={()=> onDelete(item)}>Confirm</Button>
                    <Button variant='secondary' onClick={onHide}>Cancel</Button>
                </Modal.Footer>

            </Modal>
    </div>
  )
}

export default DeleteModal