export default [
    {
        component: './HomePage/index',
        path: '/',
        name: 'HomePage',
        routes: [
            {
                path: '/',
                redirect: '/search',
            },
            {
                path: '/search',
                component: './Search/index',
            },
            {
                path: '/chapter',
                component: './Chapter/index',
            },
            {
                path: '/images',
                component: './Images/index',
            },
            {
                path: '/result',
                component: './Result/index',
            },
        ],
    },
    {
        component: './Help/index',
        path: '/help',
    },
];
