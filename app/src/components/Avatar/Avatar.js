import React from 'react';
import './Avatar.css';

let Avatar = ({user}) => {
  return (
    <img className="Avatar" alt={user.name + " avatar"} src={"/images/" + user.avatar}>
    </img>
  );
}

export default Avatar;
