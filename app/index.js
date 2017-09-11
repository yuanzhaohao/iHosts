import React from 'react';
import ReactDOM from 'react-dom';
import Pannel from './components/pannel.jsx';
import './index.less';

function App() {
  return (
    <div className="container">
      <Pannel />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
