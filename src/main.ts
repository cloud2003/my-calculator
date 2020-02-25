import Vue from 'vue';
import App from './App';
import Store from './store';

Vue.config.productionTip = false;

new Vue({
    store: Store,
    render: (h) => h(App),
}).$mount('#app');
