'use strict';

import React from 'react';
import {Button, Input} from 'antd';
import emitter from '@/lib/emitter';
import { addHost } from '@/lib/hosts';
import './setting.less';

export default class Setting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
      value: '',
    };
  }

  render() {
    return (
      <div className="setting-add">
        <Input className="setting-name" type="text" value={this.state.value} placeholder="host名称" onChange={this.onNameChange} />
        <Button type="primary" onClick={this.onOKClick} disabled={this.state.disabled}>确定</Button>
        <Button className="setting-cancel" onClick={this.onCancelClick}>取消</Button>
      </div>
    );
  }

  onOKClick = () => {
    const {value} = this.state;
    if (value) {
      this.setState({
        value: '',
      });
      addHost(value);
      emitter.emit('updateList');
      emitter.emit('hideSetting');
    }
  }

  onCancelClick = () => {
    this.setState({
      value: ''
    });
    emitter.emit('hideSetting');
  }

  onNameChange = (e) => {
    let value = e.currentTarget.value;
    this.setState({
      disabled: !(value && value.trim()),
      value: value.trim()
    });
  }
}
