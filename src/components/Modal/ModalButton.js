import React, { Component } from 'react';
import './Modal.css';

class ModalButton extends Component {
    render() {
        const loader = <div className="loader">Loading...</div>;
        return (
            <button onClick={this.props.onClick} className={this.props.className + (this.props.enabled ? '' : ' disabled')}>{this.props.loading ? loader : this.props.label}</button>
        );
    }
}

ModalButton.defaultProps = {
    label: 'Submit',
    enabled: true,
    className: "modal-button-primary"
};

export default ModalButton;