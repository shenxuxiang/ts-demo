import { Model, Effect } from 'dva';
import { Reducer } from 'redux';
import api from '../api/home';

export interface HomeState {
  userInfo: {
    name: string;
    age: number;
    sex: 'man' | 'woman';
  };
}

export interface HomeModel extends Model {
  namespace: 'home';
  state: HomeState;
  effects: {
    getUserInfo: Effect;
  };
  reducers: {
    getUserInfoSuccess: Reducer<any>;
  };
};

const homeModel: HomeModel = {
  namespace: 'home',
  state: {
    userInfo: {
      name: 'shenxx',
      age: 30,
      sex: 'man',
    },
  },
  effects: {
    * getUserInfo ({ payload }, { put, call }) {
      const { resultData } = yield call(api.getUserInfo, payload);
      yield put({
        type: 'getUserInfoSuccess',
        payload: resultData,
      })
    },
  },
  reducers: {
    getUserInfoSuccess(state, { payload }) {
      return {
        ...state,
        userInfo: payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/home') {
          console.log(1111111);
        }
      })
    }
  }
};
export default homeModel;
