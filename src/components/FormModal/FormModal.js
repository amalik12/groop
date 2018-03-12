import React from 'react';
import Modal from '../Modal';
import Button from '../Button';

let FormModal = (props) => {
    return (
        <Modal showModal={props.showModal} dismissable={false} submitted={props.submitted} title={props.title}>
            <div className="modal-body">
                {props.children}
            </div>
            <div className="modal-footer">
                <Button modal={true} onClick={props.submit} loading={props.loading} enabled={props.enabled} />
            </div>
        </Modal>
    );
}

export default FormModal;