import React from 'react';
import './Button.css';

let Button = (props) => {
    const loader = <div className="loader">Loading...</div>;
    return (
        <button onClick={props.onClick} className={'button ' + (props.style) + (props.modal ? ' button-modal' : '') + (props.enabled ? '' : ' disabled')}>{props.loading ? loader : props.label}</button>
    );
}

Button.defaultProps = {
    label: 'Submit',
    enabled: true,
    style: 'primary'
};

export default Button;