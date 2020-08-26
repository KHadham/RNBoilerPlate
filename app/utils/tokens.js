import AsyncStorage from '@react-native-community/async-storage';

const CREDENTIALS_KEY = 'CREDENTIALS_KEY';
const DEFAULT_EXPIRED_ONE_DAY = 24 * 60 * 60;

class Tokens {
  constructor(storage = AsyncStorage) {
    this.storage = storage;
  }

  static calculateExpiresAt(expiresIn) {
    const now = new Date();
    now.setSeconds(now.getSeconds() + expiresIn);

    return now;
  }

  /**
   * Get tokens from storage
   */
  async get() {
    const value = await this.storage.getItem(CREDENTIALS_KEY);
    if (!value) return null;

    const tokens = JSON.parse(value);
    tokens.expiresAt = new Date(tokens.expiresAt);

    return {
      tokens
    };
  }

  async clear() {
    return this.storage.removeItem(CREDENTIALS_KEY);
  }

  /**
   * Save tokens to storage
   * @param {Object} tokens - { accessToken, idToken } for service access
   */
  async save(tokens) {
    const { accessToken, expiresIn = DEFAULT_EXPIRED_ONE_DAY } = tokens;
    const value = JSON.stringify({
      accessToken,
      expiresAt: Tokens.calculateExpiresAt(expiresIn)
    });
    return this.storage.setItem(CREDENTIALS_KEY, value);
  }
}

export { Tokens };
export default new Tokens(AsyncStorage);
