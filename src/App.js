import React from 'react';
import './app.less';

import emitter from './lib/emitter';
import paths from './sever/paths';
import hosts from './models/hosts';

import Search from './components/Search';
import Panel from './components/Panel';
import Editor from './components/Editor';
import Setting from './components/Setting';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const hostsData = hosts.getHosts();
    this.state = {
      list: hostsData.list,
      currentIndex: 0,
    };
  }

  componentDidMount() {
    emitter.on('switchHost', (index) => {
      this.setState({
        currentIndex: index
      });
    });
  }

  render() {
    const {list, currentIndex} = this.state;
    return (
      <div className="container">
        <Search />
        <Panel list={list} currentIndex={currentIndex} />
        <Editor list={list} currentIndex={currentIndex} />
        <Setting />
      </div>
    );
  }
}
