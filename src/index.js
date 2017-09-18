import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';

import emitter from './lib/emitter';

emitter.on('emitterTest', function(params) {
  console.log(params);
});

import Pannel from './components/Panel';
import Editor from './components/Editor';

function App() {
  console.log(process);
  console.log(process.platform);


  return (
    <div className="container">
      <Pannel />
      <Editor />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
