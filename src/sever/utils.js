'use strict';

import fs from 'fs';

const utils = {
  isDirectory(p) {
    try {
      if (fs.statSync(p).isDirectory()) {
        return true;
      }
    } catch (e) {
    }
    return false;
  },

  isFile(p) {
    try {
      if (fs.statSync(p).isFile()) {
        return true;
      }
    } catch (e) {
    }
    return false;
  }
};

module.exports = utils;
