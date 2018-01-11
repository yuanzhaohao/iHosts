'use strict';

import React from 'react';
import { Icon, Popover } from 'antd';

import emitter from '../lib/emitter';

import SettingAdd from './SettingAdd';
import './setting.less';

export default class Setting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    emitter.on('hideSetting', this.hide);
  }

  render() {
    return (
      <div className="setting clearfix">
        <div className="setting-item">
          <Icon type="setting" />
        </div>
        <Popover
          content={<SettingAdd />}
          title="新增Host"
          trigger="click"
          visible={this.state.visible}
          onVisibleChange={this.onVisibleChange}
        >
          <div className="setting-item" onClick={this.onAddClick}>
            <Icon type="plus" />
          </div>
        </Popover>
      </div>
    );
  }

  hide = () => {
    this.setState({
      visible: false
    });
  }

  onAddClick = (e) => {
    this.setState({
      visible: true
    });
    e.stopPropagation();
  }

  onVisibleChange = (visible) => {
    this.setState({ visible });
  }
}
