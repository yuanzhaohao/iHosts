import React from 'react';
import './app.less';

import emitter from './lib/emitter';
import paths from './sever/paths';
import hosts from './models/hosts';

import Search from './components/Search';
import Pannel from './components/Panel';
import Editor from './components/Editor';
import Operation from './components/Operation';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const hostsData = hosts.getHosts();
    this.state = {
      list: hostsData.list,
      currentIndex: 0,
    };
  }

  render() {
    const {list, currentIndex} = this.state;
    return (
      <div className="container">
        <Search />
        <Pannel list={list} currentIndex={currentIndex} />
        <Editor list={list} currentIndex={currentIndex} />
        <Operation />
      </div>
    );
  }
}
