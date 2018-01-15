'use strict';

import fs from 'fs';
import emitter from '@/lib/emitter';
import { mergeHosts } from '@/lib/utils';
import { DATA_PATH, HOSTS_REG, SYS_HOSTS_PATH } from '@/lib/constants';

export function getHosts() {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  } catch (e) {}
  return [];
}

export function storeHosts(content, index) {
  const data = getHosts();
  if (data && data.listData && data.listData instanceof Array && data.listData[index]) {
    data.listData[index].content = content;
    fs.writeFileSync(DATA_PATH, JSON.stringify(data), 'utf-8');
    emitter.emit('updateList');
  }
}

export function selectHosts(content, index) {
  const data = getHosts();
  if (data && data.listData && data.listData instanceof Array && data.listData[index]) {
    let systemItem = data.listData[0];
    let currentItem = data.listData[index];
    let newHosts = mergeHosts(systemItem.content, content);
    console.log(newHosts);

    if (newHosts && newHosts.length) {
      systemItem.content += `\n${newHosts.join('\n')}`;
      fs.writeFileSync(SYS_HOSTS_PATH, systemItem.content, 'utf-8');
    }

    console.log(systemItem);
    currentItem.content = content;
    currentItem.active = true;
    fs.writeFileSync(DATA_PATH, JSON.stringify(data), 'utf-8');
    emitter.emit('updateList');
  }
}

export function addHost(name) {
  const data = getHosts();
  if (data && data.listData && data.listData instanceof Array) {
    data.listData.push({
      content: `# ${name}\n`,
      title: name
    });
    fs.writeFileSync(DATA_PATH, JSON.stringify(data), 'utf-8');
  }
}

export function updateHostTitle(title, index) {
  const data = getHosts();
  if (data && data.listData && data.listData instanceof Array && data.listData[index]) {
    data.listData[index].title = title;
    fs.writeFileSync(DATA_PATH, JSON.stringify(data), 'utf-8');
  }
}

export function deleteHost(index) {
  const data = getHosts();
  if (data && data.listData && data.listData instanceof Array) {
    data.listData.splice(index, 1);
    fs.writeFileSync(DATA_PATH, JSON.stringify(data), 'utf-8');
  }
}
