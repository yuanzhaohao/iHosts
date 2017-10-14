'use strict';

import React from 'react';
import codeMirror from 'codemirror';
import classNames from 'classnames';
import 'codemirror/lib/codemirror.css';
import './editor.less';

codeMirror.defineMode('hosts', function() {
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

const isMac = codeMirror.keyMap.default === codeMirror.keyMap.macDefault;


export default class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {currentIndex, list} = this.props;
    const saveKey = `${isMac ? 'Cmd' : 'Ctrl'}-S`;
    const extraKeys = {};

    extraKeys[saveKey] = this.handleSave;
    this.cm = codeMirror.fromTextArea(this.refs.editor, {
      lineNumbers: true,
      mode: 'hosts',
      extraKeys,
    });
    if (list && list[currentIndex]) {
      if (list[currentIndex].isSys) {
        this.cm.setOption('readOnly', true);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentIndex !== this.props.currentIndex) {
      const value = this.getCmValue();
      const {currentIndex, list} = nextProps;
      if (list && list[currentIndex]) {
        const newCode = list[currentIndex].content;
        doc.setValue(newCode);
        this.cm.setOption('readOnly', list[currentIndex].isSys);
      }
    }
  }

  render() {
    const {currentIndex, list} = this.props;
    const itemData = list[currentIndex];
    const hostsCode = itemData.content || '';
    console.log(hostsCode);
    return (
      <div className={classNames(['editor', {'editor-readonly': itemData.isSys}])}>
        <textarea ref="editor" defaultValue={hostsCode}></textarea>
      </div>
    );
  }

  getCmValue() {
    const doc = this.cm.getDoc();
    return doc.getValue();
  }

  handleSave = () => {
    const {currentIndex, list} = this.props;

    if (list[currentIndex].isSys) {
      console.log('system hosts, do nothing');
    } else {
      console.log('save hosts', currentIndex);
    }
  }
}
