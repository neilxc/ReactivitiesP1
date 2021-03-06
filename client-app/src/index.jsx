import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'mobx-react';
import { Router } from 'react-router-dom';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import 'react-widgets/dist/css/react-widgets.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './app/layout/styles.css';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import activityStore from './app/stores/activityStore';
import userStore from './app/stores/userStore';
import commonStore from './app/stores/commonStore';
import modalStore from './app/stores/modalStore';
import dateFnsLocalizer from 'react-widgets-date-fns';
import profileStore from './app/stores/profileStore';
import photoWidgetStore from './app/stores/photoWidgetStore'

dateFnsLocalizer()

const browserHistory = createBrowserHistory();
export const routingStore = new RouterStore();

const stores = {
  activityStore,
  router: routingStore,
  userStore,
  commonStore,
  modalStore,
  profileStore,
  photoWidgetStore
};

const history = syncHistoryWithStore(browserHistory, routingStore);

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
