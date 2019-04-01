import { message } from 'antd';

type Method = 'POST' | 'GET';
type Mode = 'cors' | 'no-cors' | 'same-origin';
type Credentials = 'include' | 'omit' | 'same-origin';

interface Option {
  credentials?: Credentials;
  mode?: Mode;
  method?: Method;
  body?: any;
  headers?: {
    'Content-Type': 'application/json';
    [propName: string]: string;
  };
};

type Request = (
  url: string,
  query?: Object,
  method?: Method,
  option?: Option,
  isFormdata?: boolean,
) => Promise<any>;


const defaultOption: Option = {
  credentials: 'include',
  mode: 'no-cors',
  headers: {
    'Content-Type': 'application/json',
  },
};

const request: Request = (
  reqUrl,
  query = {},
  reqMethod = 'GET',
  option = {},
  isFormdata = false,
) => {
  const opts: Option = {
    method: reqMethod,
    ...defaultOption,
    ...option,
    body: isFormdata ? query : JSON.stringify(query),
  };

  const queryMap = Object.entries(query);
  const url = opts.method === 'GET'
    ? queryMap.reduce((init, [key, val]) => `${init}?${key}=${val}`, reqUrl) : reqUrl;

  if (opts.method === 'GET') delete opts.body;

  return new Promise((resolve, reject) => {console.log(url, opts);
    fetch(url, opts)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        return Promise.reject(`status: ${resp.status}~statusText: ${resp.statusText}`);
      })
      .then(data => resolve(data))
      .catch(error => {
        message.error(error);
      });
  });
};

export default request;
