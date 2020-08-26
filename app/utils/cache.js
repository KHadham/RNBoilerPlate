import AsyncStorage from '@react-native-community/async-storage';

const DEFAULT_EXPIRED = 60 * 60;

class Cached {
  constructor(storage = AsyncStorage) {
    this.storage = storage;
  }

  static calculateExpiresAt(expiresIn) {
    const now = new Date();
    now.setSeconds(now.getSeconds() + expiresIn);

    return now;
  }

  async get(key) {
    const value = await this.storage.getItem(`CACHED_${key}`);
    if (!value) return null;

    const json = JSON.parse(value);
    json.expiresAt = new Date(json.expiresAt);

    const { expiresAt } = json;
    const threshold = 1000;
    if (expiresAt > Date.now() + threshold) {
      return {
        ...json
      };
    }

    await this.clear();
    return null;
  }

  async clear(key) {
    return this.storage.removeItem(`CACHED_${key}`);
  }

  /**
   * Save cache to storage
   * @param {Object} cachedControll - { cached, name, expiresIn } for service access
   */
  async set(cachedControll, json) {
    const {
      cached = false,
      name,
      expiresIn = DEFAULT_EXPIRED
    } = cachedControll;

    if (cached) {
      const value = JSON.stringify({
        ...json,
        expiresAt: Cached.calculateExpiresAt(expiresIn)
      });
      return this.storage.setItem(`CACHED_${name}`, value);
    }
    return null;
  }
}

export { Cached };
export default new Cached(AsyncStorage);
