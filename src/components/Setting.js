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

  onAddClick = () => {
    this.setState({
      visible: true
    });
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
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}
