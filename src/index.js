import React from 'react';
import ReactDOM from 'react-dom';
import { notification } from 'antd';
import './index.less';

import emitter from './lib/emitter';
import paths from './sever/paths';

emitter.on('emitterTest', function(params) {
  console.log(params);
});

import Pannel from './components/Panel';
import Editor from './components/Editor';

function App() {


  return (
    <div className="container">
      <Pannel />
      <Editor />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
