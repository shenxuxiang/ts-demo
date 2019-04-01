import React, { Suspense, lazy } from 'react';
import { routerRedux, Route, Redirect, Switch } from 'dva/router';
import Home from './routes/home';
import Detail from './routes/detail';
import { App } from './index';
import { History } from 'history';

const { ConnectedRouter } = routerRedux;


interface Props {
  history: History;
  app: App;
}

function RouterMap({ history, app }: Props) {
  // const { history, app } = props;
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/home" component={Home}>home</Route>
        <Route path="/detail" component={Detail}>detail</Route>
        <Redirect exact path="/" to="/home" />
      </Switch>
    </ConnectedRouter>
  );
}

export default RouterMap;
