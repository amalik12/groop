import React from 'react';
import ReactModal from 'react-modal';
import '../Modal/Modal.css';

let Modal = (props) => {
    return (
        <ReactModal
        isOpen={props.showModal}
        overlayClassName="modal-overlay"
        className={"modal" + (props.submitted ? " confirm" : "")}
        closeTimeoutMS={200}
        shouldCloseOnOverlayClick={props.dismissable}>
        <div className="modal-header">
        <span className="modal-title">{props.title}</span>
        {props.dismissable && <i class="modal-close material-icons">close</i>}
        </div>
        {props.children}
        </ReactModal>
    );
}

export default Modal;