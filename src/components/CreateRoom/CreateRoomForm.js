import React from 'react';
import './CreateRoom.css';
import TextField from '../TextField';
import Button from '../Button/Button';

let CreateRoomForm = (props) => {
    return (
        <div className="CreateRoomForm">
            <h1 className="create-room-title">Create a room</h1>
            <TextField large={true} float={false} label="Your room name" value={props.name} handleChange={props.handleChange} />
            <span className="create-room-domain">{window.location.host + '/'}</span><TextField large={true} inline={true} float={false} label="<random url>" onKeyPress={props.handleKeyPress}
                value={props.shortid} handleChange={props.handleChange} errorText={props.error} />
            <div className="create-room-footer">
                <Button label="Create" onClick={props.submit} loading={props.loading} />
            </div>
        </div>
    );
}

export default CreateRoomForm;