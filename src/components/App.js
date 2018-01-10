import React from 'react';
import 'antd/dist/antd.less';
import '@/less/index.less';

import emitter from '@/lib/emitter';
import { getHosts, } from '@/lib/hosts';

import Search from '@/components/Search';
import Panel from '@/components/Panel';
import Editor from '@/components/Editor';
import Setting from '@/components/Setting';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const hostsData = getHosts();
    console.log(hostsData);
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
    emitter.on('updateList', () => {
      const hostsData = getHosts();
      this.setState({
        list: hostsData.list,
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
};
