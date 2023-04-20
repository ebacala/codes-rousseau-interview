import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import Learners from '../views/Learners.vue'
import Results from '../views/Results.vue'

export const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/learners', name: 'learners', component: Learners },
    { path: '/results', name: 'results', component: Results },
    { path: '/:pathMatch(.*)*', name: 'notFound', component: NotFound },
]
