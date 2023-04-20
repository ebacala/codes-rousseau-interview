import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'

export const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/learners', name: 'learners', component: Home },
  { path: '/results', name: 'results', component: Home },
  { path: '/:pathMatch(.*)*', name: 'notFound', component: NotFound },
]