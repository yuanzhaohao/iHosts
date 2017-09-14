import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';

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
