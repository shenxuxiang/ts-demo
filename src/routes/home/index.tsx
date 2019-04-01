import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { effects } from '../../utils';
import { HomeState } from '../../models/home';
import { Dispatch } from 'redux';
type Extend<T, U> = T & U;

interface StoreData {
  home: HomeState;
};

interface IProps extends HomeState {
  getUserInfo: (query?: Object) => any;
};

interface IState {
  count: number;
};

const mapStateToProps = (state: StoreData) => ({
  userInfo: state.home.userInfo,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getUserInfo: effects(dispatch, 'home/getUserInfo'),
});

class Home extends PureComponent<IProps, IState> {
  constructor(public props: IProps) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  public componentDidMount() {
    console.log(this.props);
    this.props.getUserInfo({name: 'shenxuxiang'});
    // this.props.dispatch({type: 'home/getUserInfo', payload: { name: 'shenxuxiang' }});
  }

  public render() {
    const { userInfo } = this.props;
    return (
      <div>
        <h1>{userInfo.name}</h1>
        <h1>{userInfo.age}</h1>
        <h1>{userInfo.sex}</h1>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
