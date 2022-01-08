import axios from 'axios';
import qs from 'qs';
import { typeOf } from 'utilfc';
/* eslint-disable */
const pendingRequest = new Map();

function generateReqKey(config) {
  const {
    method, url, params, data,
  } = config;
  return [method, url, qs.stringify(params), qs.stringify(data)].join('&');
}

function addPendingRequest(config) {
  const key = generateReqKey(config);
  config.cancelToken = config.cancelToken
    || new axios.CancelToken((cancel) => {
      if (!pendingRequest.has(key)) {
        pendingRequest.set(key, cancel);
      }
    });
}

function removePendingRequest(config) {
  const key = generateReqKey(config);
  if (pendingRequest.has(key)) {
    const cancelToken = pendingRequest.get(key);
    cancelToken(key);
    pendingRequest.delete(key);
  }
}

const baseURL = {
  production: '/',
  development: 'http://localhost:6688',
}[!process.env.NODE_ENV];

const headers = { 'X-Requested-With': 'XMLHttpRequest' };
const config = {
  baseURL,
  headers,
  timeout: 0,
}; // 配置默认设置

const instance = axios.create(config);

instance.interceptors.request.use(
  (config) => {
    config.url = `/pro${config.url}`;
    removePendingRequest(config);
    addPendingRequest(config);
    // todo 添加token
    // if (gd.User && gd.User.token) {
    //   // 添加token
    //   config.headers.token = gd.User.token;
    // }
    return config;
  },
);

function Expression(obj) {
  const { msg, code } = obj;
  return { message: msg, type: 'API', code };
}

function dealCodeAndMsg(reData, customField) {
  const codeValue = reData[customField.code || 'code'];
  const msg = reData[customField.message || 'msg'] || reData['message'];
  switch (codeValue) {
  case 401: // token过期的情况
    // todo del token
    // gd.User = null
    window.location.reload();
    break;
  case 200:
    return reData;
  default:
    throw new Expression({ msg, code: codeValue });
  }
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    const read = new FileReader();
    read.readAsText(file);
    read.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        resolve(json);
      } catch (e) {
        reject('parseError');
      }
    };
  });
}

instance.interceptors.response.use(
  async (response) => {
    removePendingRequest(response.config || {});
    const { data, config } = response;
    const { customField = {} } = config;
    let reData = data;
    if (typeOf(data) === 'Blob') {
      // 下载
      try {
        reData = await readFile(data);
      } catch (e) {
        return response;
      }
    }
    return dealCodeAndMsg(reData, customField);
  },
  (error) => {
    removePendingRequest(error.config || {});
    if (!axios.isCancel(error)) {
      return Promise.reject(error);
    }
  },
);

export default instance;
