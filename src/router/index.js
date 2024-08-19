import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CancionesView from '../views/cancion/CancionesView.vue'
import CancionView from '../views/cancion/CancionView.vue'
import ArtistasView from '../views/artista/ArtistasView.vue'

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/cancion',
        name: 'cancion',
        component: CancionView
    },
    {
        path: '/canciones',
        name: 'canciones',
        component: CancionesView
    },
    {
        path: '/artistas',
        name: 'artistas',
        component: ArtistasView
    },
    {
        path: '/artista/:id/canciones',
        name: 'cancionesDeArtista',
        component: CancionesView
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router