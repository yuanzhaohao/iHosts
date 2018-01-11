import React from 'react';
import 'antd/dist/antd.less';
import '@/less/index.less';

import emitter from '@/lib/emitter';
import { getHosts } from '@/lib/hosts';

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
      listData: hostsData.listData,
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
        listData: hostsData.listData
      });
    });
  }

  render() {
    const {listData, currentIndex} = this.state;
    return (
      <div className="container">
        <Search />
        <Panel listData={listData} currentIndex={currentIndex} />
        <Editor listData={listData} currentIndex={currentIndex} />
        <Setting />
      </div>
    );
  }
};
