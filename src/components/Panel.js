'use strict';

import React from 'react';
import { Icon } from 'antd';
import PanelItem from './PanelItem';
import './panel.less';

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {listData, currentIndex} = this.props;
    return (
      <div className="panel">
        <ul className="panel-list">
          {listData && listData.length
            ? listData.map((itemData, index) =>
              <PanelItem key={index} itemData={itemData} index={index} currentIndex={currentIndex} />
            )
            : null
          }
        </ul>
      </div>
    );
  }
}
