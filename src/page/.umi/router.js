import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = DefaultRouter;

let routes = [
  {
    "path": "/login",
    "component": require('../user/login').default,
    "exact": true
  },
  {
    "path": "/",
    "component": require('../../layout').default,
    "routes": [
      {
        "path": "/",
        "exact": true,
        "component": require('../home').default
      },
      {
        "path": "/statistics/day",
        "component": require('../statistics/day').default,
        "exact": true
      },
      {
        "path": "/statistics/month",
        "component": require('../statistics/month').default,
        "exact": true
      },
      {
        "path": "/statistics/dayview",
        "component": require('../statistics/dayview').default,
        "exact": true
      },
      {
        "path": "/statistics/monthview",
        "component": require('../statistics/monthview').default,
        "exact": true
      },
      {
        "path": "/bill",
        "component": require('../bill').default,
        "exact": true
      },
      {
        "path": "/bill/view",
        "component": require('../bill/view').default,
        "exact": true
      },
      {
        "path": "/account",
        "component": require('../user/account').default,
        "exact": true
      },
      {
        "path": "/user",
        "component": require('../user').default,
        "exact": true
      },
      {
        "path": "/password",
        "component": require('../user/password.js').default,
        "exact": true
      },
      {
        "component": () => React.createElement(require('C:/Users/zsr/Desktop/work/react/cp-open-platform/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/page', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('C:/Users/zsr/Desktop/work/react/cp-open-platform/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/page', hasRoutesInConfig: true })
  }
];
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

export default function() {
  return (
<Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
