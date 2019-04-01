// import React from 'react';
// import ReactDOM from 'react-dom';
import dva, { DvaOption, DvaInstance, Model, Hooks } from 'dva';
import { createHashHistory } from 'history';
import { message } from 'antd';
// import modelHome from './models/home';
// import RouterMap from './RouterMap';
import * as serviceWorker from './serviceWorker';
import './index.css';

const history = createHashHistory({
  basename: 'ts/demo/',
  hashType: 'slash',
});

type Extend<T, U> = T & U;

export type ReduxSotre = {
  getState(arg: any): any;
  dispatch(arg: any): any;
  subscribe(listener: () => void): any;
  replaceReducer(nextReducer: any): any;
};

export type App = Extend<DvaInstance, {
  _store?: ReduxSotre;
  _models?: Model[];
}>;


const app: App = dva({
  history,
  // onError: (err) => {
  //   message.error('12345');
  // },
} as DvaOption);

app.model(require('./models/home').default);
app.router(require('./RouterMap').default);
app.start('#root');

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();











