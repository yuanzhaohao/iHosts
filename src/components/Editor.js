'use strict';

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
    this.codemirror = CodeMirror.fromTextArea(this.refs.editor, {
      lineNumbers: true,
      mode: 'hosts'
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentIndex !== this.props.currentIndex) {
      console.log('componentWillReceiveProps', nextProps);
      const doc = this.codemirror.getDoc();
      const value = doc.getValue();
      const {currentIndex, list} = nextProps;
      const newCode = list && list[currentIndex] ? list[currentIndex].content : '';
      if (newCode && newCode !== value) {
        const cursorPos = doc.getCursor();
        console.log(newCode);
        doc.setValue(newCode);
        doc.setCursor(cursorPos);
      }
    }
  }

  render() {
    const {currentIndex, list} = this.props;
    const hostsCode = list && list[currentIndex] ? list[currentIndex].content : '';
    return (
      <div className="editor">
        <textarea ref="editor" defaultValue={hostsCode}></textarea>
      </div>
    );
  }
}
