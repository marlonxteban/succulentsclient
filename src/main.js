import Vue from 'vue';
import App from '@/app';
import router from './router';

// Import the Auth0 configuration and plugin
import { domain, clientId, audience } from '../auth_config.json';
import { Auth0Plugin } from '@/auth/auth0-plugin';

const actualDomain = process.env.DOMAIN || domain;
const actualClientId = process.env.CLIENTID || clientId;
const actualAudience = process.env.AUDIENCE || audience;

// Install the authentication plugin
Vue.use(Auth0Plugin, {
  actualDomain,
  actualClientId,
  actualAudience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
