'use strict';

import React from 'react';
import { Icon, Modal } from 'antd';
import './setting.less';

export default class Setting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
  }

  render() {
    return (
      <div className="setting clearfix">
        <div className="setting-item">
          <Icon type="setting" />
        </div>
        <div className="setting-item" onClick={this.onAddClick}>
          <Icon type="plus" />
        </div>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.onOKClick}
          onCancel={this.onCancelClick}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }

  onAddClick = () => {
    this.setState({
      visible: true
    });
  }

  onOKClick = () => {
    this.setState({
      visible: false
    });
  }

  onCancelClick = () => {
    this.setState({
      visible: false
    });
  }
}
