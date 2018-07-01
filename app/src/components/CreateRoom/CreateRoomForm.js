import React from 'react';
import './CreateRoom.css';
import TextField from '../TextField';
import Button from '../Button';
import { NAME_LABEL, SHORTID_LABEL } from './CreateRoom';

let CreateRoomForm = (props) => {
    return (
        <div className="CreateRoomForm">
            <h1 className="create-room-title">Create a room</h1>
            <TextField large={true} float={false} error={props.name_error} label={NAME_LABEL} value={props.name} handleChange={props.handleChange} />
            <span className="create-room-domain">{window.location.host + '/'}</span><TextField large={true} inline={true} float={false} label={SHORTID_LABEL} onKeyPress={props.handleKeyPress}
                value={props.shortid} handleChange={props.handleChange} errorText={props.shortid_error} />
            <div className="create-room-footer">
                <Button label="Create" onClick={props.submit} enabled={props.enabled} loading={props.loading} />
            </div>
        </div>
    );
}

export default CreateRoomForm;