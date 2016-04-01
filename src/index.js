import './main.css';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

// dev tools
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

// import a root component (the app!)
import AppContainer from './containers/AppContainer';

// the reducers are combined in ./reducers/index.js
// so they can be included as one thing
import myReducers from './reducers';

// configure dev tools
const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h' changePositionKey='ctrl-q' defaultPosition='bottom' defaultIsVisible={false}>
    <LogMonitor theme='tomorrow' preserveScrollTop={false} />
  </DockMonitor>
);

// persistant storage and middleware application
const createPersistentStore = compose(
  persistState(),
  applyMiddleware(thunk),
  DevTools.instrument()
)(createStore);

// the store creation, using createPersistentStore instead createStore
let store = createPersistentStore(
  myReducers
);

// app render
render(
  <Provider store={store}>
    <div>
      <AppContainer />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('app')
);
