'use strict';

import fs from 'fs';
import { isDirectory, isFile } from '@/lib/utils';
import { WORK_PATH, DATA_PATH, SYS_HOSTS_PATH } from '@/lib/constants';
import { getHosts } from '@/lib/hosts';

export default function initData() {
  if (!isDirectory(WORK_PATH)) {
    try {
      fs.mkdirSync(WORK_PATH);
    } catch (e) {
    }
  }

  try {
    const cnt = fs.readFileSync(SYS_HOSTS_PATH, 'utf-8');
    const sysData = {
      title: 'System Hosts',
      content: cnt,
      isSys: true
    };
    if (!isFile(DATA_PATH)) {
      fs.writeFileSync(DATA_PATH, JSON.stringify([sysData]), 'utf-8');
    } else { // 确保system hosts是最新的
      const hostsData = getHosts();
      if (hostsData && hostsData.listData && hostsData.listData.length) {
        hostsData.listData[0] = sysData;
        fs.writeFileSync(DATA_PATH, JSON.stringify(hostsData), 'utf-8');
      }
    }
  } catch(e) {}
}
