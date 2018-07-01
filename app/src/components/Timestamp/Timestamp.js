import React, { Component } from 'react';
import moment from 'moment';

class Timestamp extends Component {
  componentDidMount() {
    this.refresh = this.refresh.bind(this);
    this.timer = setInterval(this.refresh, 3000);
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
      <span title={moment(this.props.time).format('LLL')}>{moment(this.props.time).fromNow()}</span>
    );
  }
}

export default Timestamp;
