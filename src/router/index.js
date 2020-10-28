import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login'
import manage from '@/page/manage'
import dataVPage from '@/page/dataVPage'
import home from '@/page/home'
import order from '@/page/order'
import mapDemo from '@/page/map-demo'
import province from '@/components/charts/province'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/manage',
      name: 'manage',
      component: manage,
      children: [{
        path: '/manage',
        component: home,
        meta: {
          keepAlive: true,
        },
      }, {
        path: '/dataVPage',
        component: dataVPage,
        meta: {
          title: ['数据管理', '财务分析'],
          keepAlive: true,
        }
      },
      {
        path: '/order',
        component: order,
        meta: {
          title: ['数据管理', '订单分析'],
          keepAlive: true,
        }
      },
      {
        path: '/map-demo/:type',
        name: 'map',
        component: mapDemo,
        props: true,
        meta: {
          title: ['地图'],
          keepAlive: false,
        }
      },
      {
        path: '/map-demo/province',
        name: 'province',
        component: province,
        props: true,
        meta: {
          title: ['地图', '省份'],
          keepAlive: false,
        }
      },
      ]
    }
  ],
})
