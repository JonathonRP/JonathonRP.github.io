import { getCollection } from '../../content/entry.mjs';
import { max } from 'date-fns/max';

class Content {
  static async getLatestResumeData() {
    let max$1;
    let current;
    const entries = await getCollection("resume", ({ id }) => {
      current = id ?? "";
      if (max([current, max$1])) {
        max$1 = current;
      }
      return id === max$1;
    });
    return entries[0].data;
  }
}

export { Content };
