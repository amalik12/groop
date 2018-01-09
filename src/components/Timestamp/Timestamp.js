import React, { Component } from 'react';
import moment from 'moment';

class Timestamp extends Component {
  componentDidMount() {
    this.refresh = this.refresh.bind(this);
    var timer = setInterval(this.refresh, 3000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  refresh() {
    this.forceUpdate();
  }

  render() {
    return (
      <span>{moment(this.props.time).fromNow()}</span>
    );
  }
}

export default Timestamp;
