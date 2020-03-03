import Vue from 'vue';
import VueRouter from 'vue-router';
import Profile from "../page/Profile";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/profile/1'
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile
  },
  {
    path: '*',
    redirect: '/profile/1',
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
