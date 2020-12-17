import Home from '@/pages/Home'
import Products from '@/pages/Products'
import Cart from '@/pages/Cart'
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import MyOrders from '@/pages/auth/MyOrders'
import MyOrder from '@/pages/auth/MyOrder'

const routes = [
    {
        path: '/',
        component: () => import('@/layouts/DefaultTemplate'),
        children: [
            {
                path: '/detalhes-do-pedido/:identify',
                component: MyOrder,
                name: 'my.order',
                props: true
            },
            {
                path: '/meus-pedidos',
                component: MyOrders,
                name: 'my.orders'
            },
            {
                path: '/carrinho',
                component: Cart,
                name: 'cart'
            },
            {
                path: '/loja/:companyUrl',
                component: Products,
                name: 'products',
                props: true
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