'use strict';

import React from 'react';
import {Icon, Switch} from 'antd';
import classNames from 'classnames';
import emitter from '@/lib/emitter';
import { deleteHost, selectHosts } from '@/lib/hosts';

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
        onDoubleClick={this.onItemDbClick}
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
              <Switch onChange={this.onHostChange} defaultChecked={itemData.active === true} />
            </div>
          </div>
          : null
        }
      </li>
    );
  }

  showEditModal = () => {
    const {itemData, index} = this.props;

    emitter.emit('showEditModal', {
      name: itemData.title,
      index,
    });
  }

  onItemClick = () => {
    const {itemData, index} = this.props;

    emitter.emit('switchHost', index);
  }

  onHostChange = (checked) => {
    const {itemData, index} = this.props;
    console.log(itemData);
    if (checked) {
      selectHosts(itemData.content, index);
    } else {
      itemData.active = false;
    }
  }

  onEditClick = (e) => {
    this.showEditModal();
    e.stopPropagation();
  }

  onItemDbClick = (e) => {
    this.showEditModal();
    e.stopPropagation();
  }

  onDeleteClick = (e) => {
    const {itemData, index} = this.props;

    deleteHost(index);
    emitter.emit('updateList');
    e.stopPropagation();
  }
}
