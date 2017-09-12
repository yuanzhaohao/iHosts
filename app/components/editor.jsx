'use strict'

import React from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import './editor.less';

CodeMirror.defineMode('hosts', function() {
  function tokenBase(stream) {
    if (stream.eatSpace()) {
      return null;
    }

    let sol = stream.sol();
    let ch = stream.next();
    let s = stream.string;

    if (ch === '#') {
      stream.skipToEnd()
      return 'comment';
    }
    if (!s.match(/^\s*([\d\.]+|[\da-f:\.%lo]+)\s+\w/i)) {
      return 'error';
    }

    if (sol && ch.match(/[\w\.:%]/)) {
      stream.eatWhile(/[\w\.:%]/)
      return 'ip';
    }

    return null;
  }

  function tokenize(stream, state) {
    return (state.tokens[0] || tokenBase)(stream, state);
  }

  return {
    startState: function() {
      return {
        tokens: []
      };
    },
    token: function(stream, state) {
      return tokenize(stream, state);
    },
    lineComment: '#'
  };
});

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.refs.editor.value = "# localhost\n127.0.0.1 localhost\n\n# xiaowei\n127.0.0.1 yzh.qcloud.com\n";
    CodeMirror.fromTextArea(this.refs.editor, {
      lineNumbers: true,
      mode: 'hosts'
    });
  }

  render() {
    return (
      <div className="editor">
        <textarea ref="editor"></textarea>
      </div>
    );
  }
}
