/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */

import queryString from 'query-string';

import config from '@/config/envConfig';
import { parseString } from '@/utils';

type Headers = {
  'content-type': string;
};

type Payload = {
  [key: string]: any;
};

class ApiInstance {
  baseUrl: string;

  defaultHeaders: Headers;

  constructor(baseUrl: string, defaultHeaders: Headers) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = defaultHeaders;
  }

  parseEndpoint(endpoint) {
    let url = ``;
    if (endpoint.indexOf('http') === 0) {
      url = endpoint;
    } else {
      url = `${this.baseUrl}${endpoint}`;
    }
    return url;
  }

  parsePayload({ header = {}, method = '', ...payload }) {
    const formData = payload.body;
    return {
      method,
      headers: { ...(formData ? {} : this.defaultHeaders), ...header },
      ...(method !== 'get'
        ? {
            body: formData || JSON.stringify(payload),
          }
        : {}),
    };
  }

  request(endpoint: string = '', payload: Payload = {}) {
    return fetch(this.parseEndpoint(endpoint), this.parsePayload(payload))
      .then((response) => {
        // if (response.status === 200) {
        //   return response;
        // }

        // if (response.status === 401) {
        return response;
        // }

        // const error = new Error(
        //   `${response.status} ${'errMsg' in response ? response.errMsg : ''}`
        // );
        // throw error;
      })
      .then((response) => {
        return new Promise((resolve, reject) => {
          response
            .text()
            .then((res) => {
              const parsedVal = parseString(res);
              const { headers } = response;
              const contentType = headers.get('content-type');
              return resolve({
                status: response.status,
                ...{
                  response:
                    typeof parsedVal === 'string' &&
                    !contentType?.includes('text/csv')
                      ? { msg: parsedVal, error: true }
                      : parsedVal,
                },
              });
            })
            .catch((err) => reject(err));
        });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }

  post(url: string, payload: Payload) {
    let queryParams: string = '';
    if ('params' in payload) {
      queryParams = `?${queryString.stringify(payload?.params)}`;
      delete payload.params;
    }
    return this.request(url + queryParams, { method: 'post', ...payload });
  }

  postUpload(url: string, payload) {
    const { header, formData } = payload;
    return this.request(url, {
      method: 'post',
      header,
      body: formData,
    });
  }

  get(url: string = '', payload: Payload = {}) {
    let queryParams: string = '';
    if ('params' in payload) {
      queryParams = `?${queryString.stringify(payload?.params)}`;
      delete payload.params;
    }
    return this.request(url + queryParams, { method: 'get', ...payload });
  }
}

const api = new ApiInstance(config.baseApiUrl, {
  'content-type': 'application/json',
});

export const apiCallToServer = new ApiInstance(config.baseUrlServerApi, {
  'content-type': 'application/json',
});

export default api;
