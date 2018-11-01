const Config = require('webpack-chain');
const config = new Config();
export default {
  history: 'hash',
  publicPath: './',
  plugins: [
    ['umi-plugin-react', {
      antd: true
    }],
  ],
  base: '/',
  routes: [{
    path: '/login',
    component: '../page/user/login'
  },{
    path: '/',
    component: '../layout',
    routes: [
      {
        path: '/',
        exact: true,
        component: '../page/home'
      },
      {
        path: '/statistics/day',
        component: '../page/statistics/day'
      },
      {
        path: 'statistics/month',
        component: '../page/statistics/month'
      },
      {
        path: 'statistics/dayview',
        component: '../page/statistics/dayview'
      },
      {
        path: 'statistics/monthview',
        component: '../page/statistics/monthview'
      },
      {
        path: 'bill',
        component: '../page/bill'
      },
      {
        path: 'bill/view',
        component: '../page/bill/view'
      },
      {
        path: 'account',
        component: '../page/user/account'
      },
      {
        path: 'user',
        component: '../page/user'
      },
      {
        path: 'password',
        component: '../page/user/password.js'
      },
    ]
    }],
  // hashHistory: true,
  singular: true,
  chainWebpack(config, { webpack }) {

  }
};

