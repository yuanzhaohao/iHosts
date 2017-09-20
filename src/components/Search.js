'use strict';

import React from 'react';
import { Icon, Input } from 'antd';
import './search.less';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="search">
        <div className="search-inner">
          <Input prefix={<Icon type="search" className="search-icon" />} placeholder="搜索" />
        </div>
      </div>
    );
  }
}
