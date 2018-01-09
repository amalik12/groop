import React, { Component } from 'react';
import { toggleModal } from '../../actions';
import './TextField.css';

class TextField extends Component {
  constructor(props) {
    super(props);
    this.state = {focused: false};

    this.focusOn = this.focusOn.bind(this);
    this.focusOff = this.focusOff.bind(this);
  }

  focusOn() {
    this.setState({ focused : true });
  }

  focusOff() {
    this.setState({ focused : false });
  }

  render() {
    return (
      <div className={"textfield" + (this.props.errorText ? " invalid" : "")}>
        <input className="textfield-input" value={this.props.value} onChange={this.props.handleChange} onFocus={this.focusOn} onBlur={this.focusOff}/>
        <label className={"textfield-label" + (this.state.focused ? " textfield-label-focused" : "") + (this.props.value ? " has-input" : "")}>{this.props.label}</label>
        <span className="textfield-error">{this.props.errorText}</span>
      </div>
    );
  }
}

export default TextField;