'use strict';

import React from 'react';
import { Icon } from 'antd';
import './operation.less';

export default class Operation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="operation clearfix">
        <div className="operation-item">
          <Icon type="plus" />
        </div>
        <div className="operation-item">
          <Icon type="setting" />
        </div>
      </div>
    );
  }
}
