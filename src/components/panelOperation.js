'use strict';

import React from 'react';
import {Icon, Switch} from 'antd';
import emitter from '../lib/emitter';
import './panel.less';

export default class PanelOperation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {itemData, index} = this.props;
    return (
      <div className="panel-operation">
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
    );
  }


  onHostChange = (checked) => {
    console.log(checked);
    const {itemData, index} = this.props;
    if (checked) {

    }
  }

  onEditClick = (e) => {
    const {itemData, index} = this.props;

    console.log('call onEditClick');
    e.stopPropagation();
  }

  onDeleteClick = (e) => {
    const {itemData, index} = this.props;

    console.log('call onDeleteClick');
    e.stopPropagation();
  }
}
