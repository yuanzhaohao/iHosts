'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import initData from '@/lib/initData';
import App from '@/components/App';

initData();
ReactDOM.render(<App />, document.getElementById('root'));
