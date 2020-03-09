import "core-js/features/object/assign";
import Vue from 'vue';
import store from './store';

import App from '../components/App.vue';
import router from './router';

let app = new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
});
