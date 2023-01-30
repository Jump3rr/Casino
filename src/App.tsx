import React from 'react';
import { Provider } from 'react-redux';
import store from './tools/store';
import MainRouter from './MainRouter';

function App() {
  return (
    <Provider store={store}>
      <MainRouter />
    </Provider>
  );
}

export default App;
