'use strict';

import path from 'path';
import fs from 'fs';
import utils from './utils';

const sysHostsPath = '/etc/hosts';
const homePath = process.platform === 'win32'
  ? process.env.USERPROFILE
  : process.env.HOME;
const workPath = path.join(homePath, '.iHosts');
const dataPath = path.join(workPath, 'data.json');

if (!utils.isDirectory(workPath)) {
  try {
    fs.mkdirSync(workPath);
  } catch (e) {
    console.log(e);
  }
}

if (!utils.isFile(dataPath)) {
  try {
    const cnt = fs.readFileSync(sysHostsPath, 'utf-8');
    const defaultData = {
      list: [{
        title: 'System Hosts',
        content: cnt
      }, {
        title: '测试',
        content: '## 测试\n10.10.10.10 yzh.taobao.com'
      }, {
        title: '测试1',
        ceontent: '## 测试1\n9.9.9.12 yzh.m.taobao.com'
      }]
    };
    fs.writeFileSync(dataPath, JSON.stringify(defaultData), 'utf-8');
  } catch(e) {
    console.log(e);
  }
}

module.exports = {
  homePath,
  workPath,
  dataPath,
  sysHostsPath
};
