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
    console.log(ret);
    count++;
  }
  return count;
}
