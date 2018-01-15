'use strict';

import fs from 'fs';
import { HOSTS_REG } from './constants';

export const isDirectory = function(p) {
  try {
    if (fs.statSync(p).isDirectory()) {
      return true;
    }
  } catch (e) {
  }
  return false;
}

export const isFile = function(p) {
  try {
    if (fs.statSync(p).isFile()) {
      return true;
    }
  } catch (e) {
  }
  return false;
}

export const countRules = (text) => {
  let ret = null;
  let count = 0;
  while ((ret = HOSTS_REG.exec(text)) !== null) {
    count++;
  }
  return count;
}


export function mergeHosts(originHosts, newHosts) {
  let originMatches = originHosts.match(HOSTS_REG);
  let matches = newHosts.match(HOSTS_REG);
  let mapObj = {};
  let result = [];
  let reg = /\n|\r|\t/g;

  console.log(matches);
  // 确保hosts不重复
  if (originMatches && originMatches.length
    && matches &&  matches.length
  ) {
    originMatches.forEach(item => {
      let key = item.replace(reg, '');
      mapObj[key] = true;
    });
    matches.forEach(item => {
      let key = item.replace(reg, '');

      if (!mapObj[key]) {
        result.push(item);
      }
    });
    return result;
  }
  return null;
}
