'use strict';

import fs from 'fs';
import { DATA_PATH } from '../lib/constants';

export function getHosts() {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  } catch (e) {}
  return {};
}

export function storeHosts(data) {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data), 'utf-8');
  } catch (e) {}
}

export function addHost(name) {
  const data = getHosts();
  if (data && data.listData && data.listData instanceof Array) {
    data.listData.push({
      content: `# ${name}\n`,
      title: name
    });
    console.log(data);
    fs.writeFileSync(DATA_PATH, JSON.stringify(data), 'utf-8');
  }
}

export function deleteHost(index) {
  const data = getHosts();
  if (data && data.listData && data.listData instanceof Array) {
    data.listData.splice(index, 1);
    console.log(data);
    fs.writeFileSync(DATA_PATH, JSON.stringify(data), 'utf-8');
  }
}
