import fs from 'fs';
import paths from '../lib/paths';

export default {

  getHosts() {
    try {
      const data = JSON.parse(fs.readFileSync(paths.dataPath, 'utf-8'));
      return data;
    } catch (e) {
      return [];
    }
    return {};
  },

  storeSysHosts() {
    try {
      const sysData = fs.readFileSync(paths.sysHostsPath, 'utf-8');

    } catch (e) {
    }
  },

  storeHost() {
    
  }
};
