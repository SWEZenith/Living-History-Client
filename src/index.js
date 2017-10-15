import React from 'react';
import { Provider } from 'react-redux';
import createStore from '@store/create';
import LoginContainer from '@containers/LoginContainer';

const Kernel = () => (
  <Provider store={createStore()}>
    <LoginContainer/>
  </Provider>
)

export default Kernel;