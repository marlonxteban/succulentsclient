import Vue from 'vue';
import App from '@/app';
import router from './router';

// Import the Auth0 configuration and plugin
import {
  domain as localDomain,
  clientId as localClientId,
  audience as localAudience,
} from '../auth_config.json';
import { Auth0Plugin } from '@/auth/auth0-plugin';

const domain = process.env.DOMAIN || localDomain;
const clientId = process.env.CLIENTID || localClientId;
const audience = process.env.AUDIENCE || localAudience;

// Install the authentication plugin
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
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
