import React from 'react';
import Modal from '../Modal';
import ModalButton from '../Modal/ModalButton';

let FormModal = (props) => {
    return (
        <Modal showModal={props.showModal} dismissable={false} submitted={props.submitted} title={props.title}>
            <div className="modal-body">
                {props.children}
            </div>
            <div className="modal-footer">
                <ModalButton onClick={props.submit} loading={props.loading} enabled={props.enabled} />
            </div>
        </Modal>
    );
}

export default FormModal;