import { query as request } from '../utils';
// 设定超时时间
const TIMEOUT: number = 15000;

export default {
  getUserInfo(query?: Object) {
    return request('/api/userInfo', query, 'POST')(TIMEOUT);
  },
  getUserList(query?: Object) {
    return request('/api/userList', query, 'GET')(TIMEOUT);
  },
};
