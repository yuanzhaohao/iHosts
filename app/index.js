import React from 'react';
import ReactDOM from 'react-dom';
import Pannel from './components/pannel.jsx';
import Editor from './components/editor.jsx';
import './index.less';

function App() {
  return (
    <div className="container">
      <Pannel />
      <Editor />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
