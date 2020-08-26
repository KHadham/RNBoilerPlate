/* global fetch:false */
import { API_URL, Authorization } from 'react-native-dotenv';
import tokenService from '../utils/tokens';
import cacheService from '../utils/cache';
import storage from '../utils/storage';
import { STORAGE_KEY } from '../constants';

export const config = {
  baseUrl: API_URL
};

export const STATUS_CODE = {
  OK: 200,
  NOT_FOUND: 404,
  NO_CONTENT: 204
};

const futch = (url, opts = {}, onProgress) => {
  return new Promise((res, rej) => {
    // eslint-disable-next-line no-undef
    let xhr = new XMLHttpRequest();
    xhr.open(opts.method || 'get', url);
    for (let k in opts.headers || {}) xhr.setRequestHeader(k, opts.headers[k]);
    xhr.onload = e => res(e.target);
    xhr.onerror = rej;
    // eslint-disable-next-line max-len
    if (xhr.upload && onProgress) xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
    xhr.send(opts.body);
  });
};

const futchData = async (
  url,
  params,
  progress,
  isForm = false,
  cachedControll
) => {
  const token = await storage.get(STORAGE_KEY.TOKEN_LOGIN);

  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };

  if (isForm) {
    headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    };
  }

  const response = await futch(
    url,
    {
      ...params,
      headers
    },
    progress
  );
  if (response.status === STATUS_CODE.NO_CONTENT) return {};

  const json = JSON.parse(response._response);

  if (cachedControll) {
    await cacheService.set(cachedControll, json);
  }
  return json;
};

const fetchData = async (url, params, customHeaders, cachedControll) => {
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization,
    ...customHeaders
  };

  const tokens = await tokenService.get();
  const token = await storage.get(STORAGE_KEY.TOKEN_LOGIN);
  if (tokens) {
    if (
      url == 'https://api-stage.palapaone.id/api/v1/users/refresh-token' ||
      url == 'https://api-dev.palapaone.id/api/v1/users/refresh-token' ||
      url == 'https://api-prod.palapaone.id/api/v1/users/refresh-token' ||
      url == 'https://api-dev.palapaone.id/api/v1/events/categories' ||
      url == 'https://api-stage.palapaone.id/api/v1/events/categories' ||
      url == 'https://api-prod.palapaone.id/api/v1/events/categories' ||
      url.substring(0, 62) ==
        'https://api-dev.palapaone.id/api/v1/events/categories?language' ||
      url.substring(0, 64) ==
        'https://api-stage.palapaone.id/api/v1/events/categories?language' ||
      url.substring(0, 63) ==
        'https://api-prod.palapaone.id/api/v1/events/categories?language' ||
      url == 'https://api-dev.palapaone.id/api/v1/events/regencies' ||
      url == 'https://api-stage.palapaone.id/api/v1/events/regencies' ||
      url == 'https://api-prod.palapaone.id/api/v1/events/regencies' ||
      url.substring(0, 53) ==
        'https://api-dev.palapaone.id/api/v1/settings/version/' ||
      url.substring(0, 55) ==
        'https://api-stage.palapaone.id/api/v1/settings/version/' ||
      url.substring(0, 54) ==
        'https://api-prod.palapaone.id/api/v1/settings/version/' ||
      url.substring(0, 54) ==
        'https://api-dev.palapaone.id/api/v1/users/resend-code/' ||
      url.substring(0, 56) ==
        'https://api-stage.palapaone.id/api/v1/users/resend-code/' ||
      url.substring(0, 53) ==
        'https://api-prod.palapaone.id/api/v1/users/resend-code/' ||
      url.substring(0, 53) ==
        'https://api-dev.palapaone.id/api/v1/users/all-country' ||
      url.substring(0, 55) ==
        'https://api-stage.palapaone.id/api/v1/users/all-country' ||
      url.substring(0, 54) ==
        'https://api-prod.palapaone.id/api/v1/users/all-country'
    ) {
      headers = {
        ...headers,
        Authorization: Authorization
      };
    } else {
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`
      };
    }
  }

  const response = await fetch(url, {
    ...params,
    headers
  });
  if (response.status === STATUS_CODE.NO_CONTENT) return {};
  const json = await response.json();

  if (cachedControll) {
    await cacheService.set(cachedControll, json);
  }
  return json;
};

const fetchForm = async (url, params, customHeaders, cachedControll) => {
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization,
    ...customHeaders
  };

  const tokens = await tokenService.get();
  const token = await storage.get(STORAGE_KEY.TOKEN_LOGIN);
  if (tokens) {
    if (
      url == 'https://api-stage.palapaone.id/api/v1/users/refresh-token' ||
      url == 'https://api-dev.palapaone.id/api/v1/users/refresh-token' ||
      url == 'https://api-prod.palapaone.id/api/v1/users/refresh-token' ||
      url == 'https://api-dev.palapaone.id/api/v1/events/categories' ||
      url == 'https://api-stage.palapaone.id/api/v1/events/categories' ||
      url == 'https://api-prod.palapaone.id/api/v1/events/categories' ||
      url.substring(0, 62) ==
        'https://api-dev.palapaone.id/api/v1/events/categories?language' ||
      url.substring(0, 64) ==
        'https://api-stage.palapaone.id/api/v1/events/categories?language' ||
      url.substring(0, 63) ==
        'https://api-prod.palapaone.id/api/v1/events/categories?language' ||
      url == 'https://api-dev.palapaone.id/api/v1/events/regencies' ||
      url == 'https://api-stage.palapaone.id/api/v1/events/regencies' ||
      url == 'https://api-prod.palapaone.id/api/v1/events/regencies' ||
      url.substring(0, 53) ==
        'https://api-dev.palapaone.id/api/v1/settings/version/' ||
      url.substring(0, 55) ==
        'https://api-stage.palapaone.id/api/v1/settings/version/' ||
      url.substring(0, 54) ==
        'https://api-prod.palapaone.id/api/v1/settings/version/' ||
      url.substring(0, 54) ==
        'https://api-dev.palapaone.id/api/v1/users/resend-code/' ||
      url.substring(0, 56) ==
        'https://api-stage.palapaone.id/api/v1/users/resend-code/' ||
      url.substring(0, 53) ==
        'https://api-prod.palapaone.id/api/v1/users/resend-code/'
    ) {
      headers = {
        ...headers,
        Authorization: Authorization
      };
    } else {
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`
      };
    }
  }

  const response = await fetch(url, {
    ...params,
    headers
  });
  if (response.status === STATUS_CODE.NO_CONTENT) return {};
  const json = await response.json();

  if (cachedControll) {
    await cacheService.set(cachedControll, json);
  }
  return json;
};

const getBasic = async (endpoint, headers = {}) => {
  const url = `${config.baseUrl}${endpoint}`;
  const fetchParams = {
    method: 'GET'
  };
  return fetchData(url, fetchParams, headers);
};

const get = async (
  endpoint,
  params = {},
  cachedControll = {},
  headers = {}
) => {
  const { cached = false, update = false, name } = cachedControll;
  let queryString = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');
  if (queryString.length > 0) {
    queryString = `?${queryString}`;
  }
  const url = `${config.baseUrl}${endpoint}${queryString}`;
  const fetchParams = {
    method: 'GET'
  };

  if (!update && cached && name) {
    const result = await cacheService.get(name);
    if (result) {
      return result;
    }
  }
  return fetchData(url, fetchParams, headers, cachedControll);
};

const post = async (endpoint, params = {}, headers = {}) => {
  const url = `${config.baseUrl}${endpoint}`;
  const fetchParams = {
    method: 'POST',
    body: JSON.stringify(params)
  };
  return fetchData(url, fetchParams, headers);
};

const postForm = async (endpoint, params = {}, headers = {}) => {
  const url = `${config.baseUrl}${endpoint}`;
  const fetchParams = {
    method: 'POST',
    body: params
  };
  return fetchForm(url, fetchParams, headers);
};

const postWithProgress = async (
  endpoint,
  params = {},
  progress,
  isForm = false
) => {
  const url = `${config.baseUrl}${endpoint}`;
  const fetchParams = {
    method: 'POST',
    body: isForm ? params : JSON.stringify(params)
  };
  return futchData(url, fetchParams, progress, isForm);
};

const patch = async (endpoint, params = {}, headers = {}) => {
  const url = `${config.baseUrl}${endpoint}`;
  const fetchParams = {
    method: 'PATCH',
    body: JSON.stringify(params)
  };
  return fetchData(url, fetchParams, headers);
};

const put = async (endpoint, params = {}, headers = {}) => {
  const url = `${config.baseUrl}${endpoint}`;
  const fetchParams = {
    method: 'PUT',
    body: JSON.stringify(params)
  };
  return fetchData(url, fetchParams, headers);
};

const remove = async (endpoint, headers = {}) => {
  const url = `${config.baseUrl}${endpoint}`;
  const fetchParams = {
    method: 'DELETE'
  };
  return fetchData(url, fetchParams, headers);
};

export { getBasic, get, post, postForm, put, patch, remove, postWithProgress };
