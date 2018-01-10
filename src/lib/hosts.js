'use strict';

import fs from 'fs';
import { DATA_PATH } from '../lib/constants';

export function getHosts() {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
    return data;
  } catch (e) {
    return [];
  }
  return {};
}

export function storeHosts(data) {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data), 'utf-8');
  } catch (e) {}
}

export function addHost(name) {
  let data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  console.log(data);
  if (data && data.list && data.list instanceof Array) {
    data.list.push({
      content: `# ${name}\n`,
      title: name
    });
    fs.writeFileSync(DATA_PATH, JSON.stringify(data), 'utf-8');
  }
}
