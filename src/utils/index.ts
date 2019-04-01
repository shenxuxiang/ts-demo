import sendRequest from './request';
import { Dispatch } from 'redux';
// 超时事件
export const delayTimeout = (time: number, val: string) => {
  return new Promise(resolve => setTimeout(() => resolve(val), time));
};

// 发送fetch请求
export const query = (url: string, ...args: any[]) => (time: number) => Promise.race([
  delayTimeout(time, '欧哦～请求超时了！'),
  sendRequest(url, ...args),
]);

export const effects = (dispatch: Dispatch, type: string) => (payload?: object) => {
  dispatch({ type, payload });
};
