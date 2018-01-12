'use strict';

import React from 'react';
import {Icon, Switch} from 'antd';
import classNames from 'classnames';
import emitter from '@/lib/emitter';
import { deleteHost } from '@/lib/hosts';

export default class PanelItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {itemData, index, currentIndex} = this.props;

    return (
      <li key={index}
        className={classNames(['item', {
          'header': index === 0
        }, {
          'active': index === currentIndex
        }])}
        onClick={this.onItemClick}
      >
        <Icon type={index === 0 ? 'desktop' : 'file-text'} />
        <span className="item-text">{itemData.title}</span>
        {index !== 0
          ? <div className="panel-operation">
            <div className="operation-item hide" onClick={this.onDeleteClick}>
              <Icon type="delete" />
            </div>
            <div className="operation-item hide" onClick={this.onEditClick}>
              <Icon type="edit" />
            </div>
            <div className="operation-item">
              <Switch onChange={this.onHostChange} />
            </div>
          </div>
          : null
        }
      </li>
    );
  }

  onItemClick = () => {
    const {itemData, index} = this.props;

    emitter.emit('switchHost', index);
  }

  onHostChange = (checked) => {
    const {itemData, index} = this.props;
    console.log(itemData);
    if (checked) {
      itemData.active = true;
    } else {
      itemData.active = false;
    }
  }

  onEditClick = (e) => {
    const {itemData, index} = this.props;

    console.log('call onEditClick');
    console.log(itemData);
    emitter.emit('showEditModal', {
      name: itemData.title,
      index,
    });
    e.stopPropagation();
  }

  onDeleteClick = (e) => {
    const {itemData, index} = this.props;

    deleteHost(index);
    emitter.emit('updateList');
    e.stopPropagation();
  }
}
