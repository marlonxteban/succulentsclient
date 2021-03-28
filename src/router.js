import Vue from 'vue';
import Router from 'vue-router';
import PageNotFound from './views/page-not-found';
import AuthenticationRequired from './views/authentication-required';

Vue.use(Router);
const parseProps = r => ({ id: parseInt(r.params.id) });

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/families',
    },
    {
      path: '/families',
      name: 'families',
      component: () =>
        import(/* webpackChunkName: "bundle-succulents" */ './views/families.vue'),
    },
    {
      path: '/families/:id',
      name: 'family-detail',
      component: () =>
        import(/* webpackChunkName: "bundle-succulents" */ './views/family-detail.vue'),
      props: parseProps,
    },
    {
      path: '/succulents',
      name: 'succulents',
      // component: Heroes,
      component: () =>
        import(/* webpackChunkName: "bundle-succulents" */ './views/succulents.vue'),
    },
    {
      path: '/succulents/:id',
      name: 'succulent-detail',
      // component: HeroDetail,
      component: () =>
        import(/* webpackChunkName: "bundle-succulents" */ './views/succulent-detail.vue'),
      props: parseProps,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/about.vue'),
    },
    {
      path: '/auth-required',
      name: 'auth-required',
      component: AuthenticationRequired,
    },
    {
      path: '*',
      component: PageNotFound,
    },
  ],
});
