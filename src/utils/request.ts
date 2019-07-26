import { notification } from 'antd';
import { formatMessage } from 'umi-plugin-locale';

function checkStatus(response: JsObject): JsObject | Error {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error();
  error.name = response.status;
  error.message = `${formatMessage({ id: 'utils.request.status.error' })} ${
    response.status
  }: ${response.url}`;
  throw error;
}

const contentType = {
  'Content-Type': 'application/json; charset=utf-8',
};

/**
 *
 * 请求数据，返回promise
 * @export
 * @param {请求链接 string} url
 * @param {请求选项 object} options
 * @returns
 */
export default function request(url: string, options = {}) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions: JsObject = {
    ...defaultOptions,
    ...options,
  };
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        ...contentType,
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }
  return fetch(url, newOptions)
    .then(checkStatus)
    .then((response: JsObject) => response.json())
    .catch((error: Error) => {
      const title =
        formatMessage({ id: `utils.request.${error.name}` }) ||
        error.name ||
        formatMessage({ id: 'utils.request.status.error' });
      if (process.env.NODE_ENV === 'development') {
        return;
      }
      notification.error({
        description: error.message,
        duration: 3,
        message: title,
      });
    });
}
