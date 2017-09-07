import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './components/menu.jsx';
import './index.less';

function App() {
  return (
    <div className="container">
      <Menu />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
