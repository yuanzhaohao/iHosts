'use strict';

import React from 'react';
import codeMirror from 'codemirror';
import classNames from 'classnames';
import { countRules } from '../lib/utils';
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

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {currentIndex, listData} = this.props;
    const saveKey = `${process.platform === 'darwin' ? 'Cmd' : 'Ctrl'}-S`;
    const extraKeys = {};

    extraKeys[saveKey] = this.handleSave;
    this.cm = codeMirror.fromTextArea(this.refs.editor, {
      lineNumbers: true,
      mode: 'hosts',
      extraKeys,
    });
    if (listData && listData[currentIndex]) {
      if (listData[currentIndex].isSys) {
        this.cm.setOption('readOnly', true);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentIndex !== this.props.currentIndex) {
      const value = this.getCmValue();
      const {currentIndex, listData} = nextProps;
      if (listData && listData[currentIndex]) {
        const newCode = listData[currentIndex].content;
        const doc = this.cm.getDoc();
        doc.setValue(newCode);
        this.cm.setOption('readOnly', listData[currentIndex].isSys);
      }
    }
  }

  render() {
    const {currentIndex, listData} = this.props;
    let itemData = {};
    let hostsCode = '';
    try {
      itemData = listData[currentIndex];
      hostsCode = itemData.content || '';
    } catch (e) {}
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
    const {currentIndex, listData} = this.props;
    const currentItem = listData[currentIndex];

    if (currentItem.isSys) {
      console.log('system hosts, do nothing');
    } else {
      const newCode = this.getCmValue();
      if (newCode !== currentItem.content) {
        currentItem.content = newCode;
        hosts.storeHosts({
          listData
        });
      }
    }
  }
}
