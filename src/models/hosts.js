import fs from 'fs';
import paths from '../sever/paths';

export default {

  getHosts() {
    try {
      const sysData = fs.readFileSync(paths.sysHostsPath, 'utf-8');
      const data = JSON.parse(fs.readFileSync(paths.dataPath, 'utf-8'));
      return data;
    } catch (e) {
      return [];
    }
    return {};
  }
};
