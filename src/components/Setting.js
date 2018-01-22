'use strict';

import React from 'react';
import { Icon, Modal, Input } from 'antd';
import emitter from '@/lib/emitter';
import { addHosts, updateHostTitle } from '@/lib/hosts';

import './setting.less';

export default class Setting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      value: '',
      isEdit: false,
      index: 0,
    };
    emitter.on('showEditModal', (params) => {
      if (params.name) {
        this.setState({
          value: params.name,
          index: params.index,
          visible: true,
          isEdit: true,
        });
      }
    });
  }

  render() {
    const { isEdit, value, visible } = this.state;
    return (
      <div className="setting clearfix">
        <div className="setting-item">
          <Icon type="setting" />
        </div>
        <div className="setting-item" onClick={this.onAddClick}>
          <Icon type="plus" />
        </div>
        <Modal
          title={isEdit ? '编辑Host' : '新增Host'}
          wrapClassName="setting-add"
          visible={visible}
          onOk={this.onOKClick}
          onCancel={this.onCancelClick}
          okText="确认"
          cancelText="取消"
        >
          <Input className="setting-name"
            type="text"
            placeholder="host名称"
            value={value}
            onChange={this.onNameChange} />
        </Modal>
      </div>
    );
  }

  onAddClick = (e) => {
    this.setState({
      visible: true
    });
    e.stopPropagation();
  }

  onOKClick = () => {
    const {value, index} = this.state;
    if (value) {
      this.setState({
        value: '',
        visible: false,
        isEdit: false,
        index: 0,
      });
      if (index) updateHostTitle(value, index)
      else addHosts(value)
      emitter.emit('updateList');
    }
  }

  onCancelClick = () => {
    this.setState({
      value: '',
      visible: false,
      isEdit: false,
      index: 0,
    });
  }

  onNameChange = (e) => {
    let value = e.currentTarget.value;
    this.setState({
      value: value.trim()
    });
  }
}
