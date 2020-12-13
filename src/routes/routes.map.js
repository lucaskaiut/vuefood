import Home from '@/pages/Home'
import Products from '@/pages/Products'
import Cart from '@/pages/Cart'
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'

const routes = [
    {
        path: '/',
        component: () => import('@/layouts/DefaultTemplate'),
        children: [
            {
                path: '/carrinho',
                component: Cart,
                name: 'cart'
            },
            {
                path: '/loja',
                component: Products,
                name: 'products'
            },
            {
                path: '/',
                component: Home,
                name: 'home'
            },
        ]
    },
    {
        path: '/',
        component: () => import('@/layouts/AuthTemplate'),
        children: [
            {
                path: '/login',
                component: Login,
                name: 'login'
            },
            {
                path: '/cadastrar',
                component: Register,
                name: 'register'
            }
        ]
    }
];

export default routes