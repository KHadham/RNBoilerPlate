import tokenService from './tokens';
import { ENDPOINT } from '../configs';
import { STORAGE_KEY } from '../constants';
import storage from './storage';

export const AuthenticationStatus = {
  LoggingIn: 'LoggingIn',
  LoggedIn: 'LoggedIn',
  LoggedOut: 'LoggedOut',
  Unauthorized: 'Unauthorized'
};

class Auth {
  constructor(tokens) {
    this.tokens = tokens;
    this.subscribers = [];
  }

  /**
   * Check is user's tokens are already saved
   * @returns true of logged in, false otherwise
   */
  async isLoggedIn() {
    const tokens = await this.tokens.get();
    return !!tokens;
  }

  /**
   * Login and save credentials to local storage
   * @param {String} username - username
   * @param {String} password - Password
   * @param {String} deviceId - FirebaseToken
   */
  async login(username, password, deviceId) {
    this._notifySubscribers(AuthenticationStatus.LoggingIn);

    let tokens = await this.tokens.get();
    if (tokens) {
      return tokens;
    }
    try {
      const result = await ENDPOINT.login({
        username,
        password,
        deviceId
      });
      if (result.success) {
        tokens = result.data;
        const token = {
          accessToken: tokens
        };
        await this.tokens.save(token);

        const jwt_decode = require('jwt-decode');
        const data = jwt_decode(tokens);
        const status = data.status;
        await storage.set(STORAGE_KEY.STATUS, status);

        await this._notifySubscribers(AuthenticationStatus.LoggedIn);
        return result;
      }
      this._notifySubscribers(AuthenticationStatus.Unauthorized, result);
      return result;
    } catch (error) {
      this._notifySubscribers(AuthenticationStatus.Unauthorized, error);
      throw error;
    }
  }

  /**
   * Logout by removing users credentials from local storage / session
   */
  async logout() {
    await this.tokens.clear();

    this._notifySubscribers(AuthenticationStatus.LoggedOut);
  }

  /**
   * Subscribe to changes in authentication state
   * @param {Function} subscriber - (authenticationState, error) => ...
   */
  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  /**
   * Remove original subscriber
   * @param {Function} subscriber - function that was used to subscribe for changes
   */
  unsubscribe(subscriber) {
    const index = this.subscribers.indexOf(subscriber);

    if (index > -1) {
      this.subscribers.splice(index, 1);
    }
  }

  _notifySubscribers(state, error) {
    this.subscribers.forEach(subscriber => subscriber({ state, error }));
  }
}

export { Auth };
export default new Auth(tokenService);
