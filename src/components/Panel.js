'use strict';

import React from 'react';
import { Icon, Switch } from 'antd';
import emitter from '../lib/emitter';
import './panel.less';

export default class Pannel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {list, currentIndex} = this.props;
    return (
      <div className="pannel">
        <ul className="pannel-list">
        {list && list.length
          ? list.map((itemData, index) =>
            <li key={index}
              className={index === 0
                ? index === currentIndex ? 'item header active' : 'item header'
                : index === currentIndex ? 'item active' : 'item'
              }
              onClick={this.onItemClick.bind(this, itemData, index)}
            >
              <Icon type={index === 0 ? 'desktop' : 'file-text'} />
              <span className="item-text">{itemData.title}</span>
              {index !== 0
                ? <Switch />
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
    console.log(itemData);
    emitter.emit('switchHost', index);
  }
}
