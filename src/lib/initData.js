'use strict';

import fs from 'fs';
import { isDirectory, isFile } from '@/lib/utils';
import { WORK_PATH, DATA_PATH, SYS_HOSTS_PATH } from '@/lib/constants';


export default function initData() {
  if (!isDirectory(WORK_PATH)) {
    try {
      fs.mkdirSync(WORK_PATH);
    } catch (e) {
    }
  }

  if (!isFile(DATA_PATH)) {
    try {
      const cnt = fs.readFileSync(SYS_HOSTS_PATH, 'utf-8');
      const defaultData = {
        listData: [{
          title: 'System Hosts',
          content: cnt,
          isSys: true
        }]
      };
      fs.writeFileSync(DATA_PATH, JSON.stringify(defaultData), 'utf-8');
    } catch(e) {
      console.log(e);
    }
  }
}
