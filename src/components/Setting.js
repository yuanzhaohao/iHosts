'use strict';

import React from 'react';
import { Icon } from 'antd';
import './setting.less';

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="setting clearfix">
        <div className="setting-item">
          <Icon type="setting" />
        </div>
        <div className="setting-item">
          <Icon type="plus" />
        </div>
      </div>
    );
  }
}
