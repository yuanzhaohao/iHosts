import fs from 'fs';
import paths from '../lib/paths';

export default {

  getHosts() {
    console.log(fs);
    try {
      const data = JSON.parse(fs.readFileSync(paths.dataPath, 'utf-8'));
      return data;
    } catch (e) {
      return [];
    }
    return {};
  },

  storeHosts(data) {
    try {
      fs.writeFileSync(paths.dataPath, JSON.stringify(data), 'utf-8');
    } catch (e) {
    }
  },

  addHost(name) {
    let data = JSON.parse(fs.readFileSync(paths.dataPath, 'utf-8'));
    console.log(data);
    if (data && data.list && data.list instanceof Array) {
      data.list.push({
        content: `# ${name}\n`,
        title: name
      });
      fs.writeFileSync(paths.dataPath, JSON.stringify(data), 'utf-8');
    }
  }
};
