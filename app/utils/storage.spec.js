import AsyncStorage from '@react-native-community/async-storage';
import storage from './storage';

jest.mock('AsyncStorage', () => ({
  getItem: Promise.resolve({}),
  setTime: jest.fn()
}));

describe('storage', () => {
  test('constructor', () => {
    expect(storage.storage).toBe(AsyncStorage);
  });

  describe('get', () => {
    test('return json string', async () => {
      const key = 'abc';
      const json = {
        json: 'I am Json'
      };
      storage.storage.getItem = jest.fn(() => JSON.stringify(json));
      const result = await storage.get(key);
      expect(storage.storage.getItem).toHaveBeenCalledWith(key);
      expect(result).toEqual(json);
    });

    test('return null', async () => {
      const key = 'abc';
      const json = {};
      storage.storage.getItem = jest.fn(() => null);
      const result = await storage.get(key);
      expect(storage.storage.getItem).toHaveBeenCalledWith(key);
      expect(result).toEqual(json);
    });
  });

  test('set', async () => {
    const key = 'abc';
    const json = {
      json: 'I am Json'
    };
    storage.storage.setItem = jest.fn();
    await storage.set(key, json);
    expect(storage.storage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(json)
    );
  });

  test('merge', async () => {
    const key = 'abc';
    const json = {
      json: 'I am Json'
    };
    storage.storage.mergeItem = jest.fn();
    await storage.merge(key, json);
    expect(storage.storage.mergeItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(json)
    );
  });

  test('remove', async () => {
    const key = 'abc';
    storage.storage.removeItem = jest.fn();
    await storage.remove(key);
    expect(storage.storage.removeItem).toHaveBeenCalledWith(key);
  });
});
