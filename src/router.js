import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './pages/HomePage.vue';
import RegionPage from './pages/RegionPage.vue';
import CreatePage from './pages/CreatePage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'HomePage', component: HomePage },
    { path: '/create', name: 'CreatePage', component: CreatePage },
    { path: '/region/:id', name: 'RegionPage', component: RegionPage },
    { path: '*', component: HomePage },
  ],
});
