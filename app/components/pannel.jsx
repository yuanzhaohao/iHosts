'use strict'

import React from 'react';
import { Icon, Switch } from 'antd';
import './pannel.less';

export default class Pannel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="pannel">
        <ul className="pannel-list">
          <li className="item header">
            <Icon type="desktop" />
            <span className="item-text">System Hosts</span>
          </li>
          <li className="item">
            <Icon type="file-text" />
            <span className="item-text">hosts 1</span>
            <Switch />
          </li>
          <li className="item">
            <Icon type="file-text" />
            <span className="item-text">hosts 2</span>
            <Switch />
          </li>
          <li className="item active">
            <Icon type="file-text" />
            <span className="item-text">hosts 3</span>
            <Switch />
          </li>
          <li className="item">
            <Icon type="file-text" />
            <span className="item-text">hosts 4</span>
            <Switch />
          </li>
          <li className="item">
            <Icon type="file-text" />
            <span className="item-text">hosts 5</span>
            <Switch />
          </li>
        </ul>
      </div>
    );
  }
}
