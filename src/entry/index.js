import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.less';
import '@/less/index.less';

import emitter from '@/lib/emitter';
import paths from '@/lib/paths';
import hosts from '@/models/hosts';

import Search from '@/components/Search';
import Panel from '@/components/Panel';
import Editor from '@/components/Editor';
import Setting from '@/components/Setting';

class App extends React.Component {
  constructor(props) {
    super(props);

    const hostsData = hosts.getHosts();
    console.log(hostsData);
    this.state = {
      list: hostsData.list,
      currentIndex: 0,
    };
  }

  componentDidMount() {
    console.log('call componentDidMount');
    emitter.on('switchHost', (index) => {
      this.setState({
        currentIndex: index
      });
    });
    emitter.on('updateList', () => {
      const hostsData = hosts.getHosts();
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

ReactDOM.render(<App />, document.getElementById('root'));
