import {useCallback, useEffect, useState} from 'react';
import { saveFile } from 'utilfc';
import axios from './axios';
import {showMsg} from "@/utils/index";
/* eslint-disable */
function get(url, params, headers, ext) {
  return axios.get(url, { params, headers, ...ext });
}

function post(url, data, headers, ext) {
  return axios.post(url, data, { headers, ...ext });
}

function useGet(url, params, isOnlyData) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const doFetch = useCallback(
    (_url, data = {}, headers = {}) => {
      setLoading(true);
      return new Promise((resolve, reject) => {
        let reUrl = url;
        let _data = data;
        let _headers = headers;
        if (typeof _url === 'string') {
          // 判断第一个参数是否为url
          reUrl = _url;
        } else if (url) {
          _headers = data;
          _data = _url;
        } else {
          throw new Error('参数url未设置');
        }
        axios
          .get(reUrl, {
            params: _data || {},
            headers: _headers || {},
          })
          .then((resp) => {
            setLoading(false);
            setData(isOnlyData ? resp.data : resp);
            resolve(resp);
          })
          .catch((err) => {
            setLoading(false);
            setError(err);
            reject(err);
          });
      });
    },
    [url, setLoading, setError, setData],
  );

  useEffect(() => {
    if(params) {
      doFetch(url,params ).catch(showMsg)
    }
  }, [
    doFetch
  ])

  return {
    data, doFetch, loading, error,
  };
}

function usePost(url) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const doFetch = useCallback(
    (_url, data = {}, headers = {}, ext = {}) => {
      setLoading(true);
      return new Promise((resolve, reject) => {
        let reUrl = url;
        let _data = data;
        let _headers = headers;
        if (typeof _url === 'string') {
          // 判断第一个参数是否为url
          reUrl = _url;
        } else if (url) {
          _headers = data;
          _data = _url;
        } else {
          throw new Error('参数url未设置');
        }
        axios
          .post(reUrl, _data, {
            headers: _headers || {},
            ...ext,
          })
          .then((resp) => {
            setLoading(false);
            setData(resp);
            resolve(resp);
          })
          .catch((err) => {
            setLoading(false);
            setError(err);
            reject(err);
          });
      });
    },
    [url, setLoading, setError, setData],
  );

  return {
    loading, doFetch, data, error,
  };
}

function useDownload(url) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const responseType = 'blob';
  const doFetch = useCallback(
    (_url, data = {}, headers = {}, fileName, _ext) => {
      const ext = _ext || { responseType };
      setLoading(true);
      return new Promise((resolve, reject) => {
        let reUrl = url;
        let _data = data;
        let _headers = headers;
        if (typeof _url === 'string') {
          // 判断第一个参数是否为url
          reUrl = _url;
        } else if (url) {
          _headers = data;
          _data = _url;
        } else {
          throw new Error('参数url未设置');
        }
        axios
          .post(reUrl, _data, {
            headers: _headers || {},
            ...ext,
          })
          .then((resp) => {
            if (resp) {
              let file = fileName;
              const regex = /filename="?([^;"]+)/;
              const result = regex.exec(resp.headers['content-disposition']);
              if (result && result.length >= 2) {
                file = decodeURIComponent(result[1]);
              }
              saveFile(resp.data, file);
            }
            setLoading(false);
            setData(resp);
            resolve(resp);
          })
          .catch((err) => {
            setLoading(false);
            setError(err);
            reject(err);
          });
      });
    },
    [url, setLoading, setError, setData],
  );

  return {
    loading, doFetch, data, error,
  };
}

export {
  usePost, useGet, useDownload, get, post,
};
