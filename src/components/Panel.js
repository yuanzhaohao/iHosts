'use strict';

import React from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
import emitter from '../lib/emitter';
import PanelOperation from './panelOperation';
import './panel.less';

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {list, currentIndex} = this.props;
    return (
      <div className="panel">
        <ul className="panel-list">
        {list && list.length
          ? list.map((itemData, index) =>
            <li key={index}
              className={classNames(['item', {
                'header': index === 0
              }, {
                'active': index === currentIndex
              }])}
              onClick={this.onItemClick.bind(this, itemData, index)}
            >
              <Icon type={index === 0 ? 'desktop' : 'file-text'} />
              <span className="item-text">{itemData.title}</span>
              {index !== 0
                ? <PanelOperation />
                : null
              }
            </li>
          )
          : null
        }
        </ul>
      </div>
    );
  }

  onItemClick = (itemData, index) => {
    emitter.emit('switchHost', index);
  }
}
