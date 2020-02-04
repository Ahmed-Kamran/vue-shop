import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Admin from "./views/Admin.vue";
import Overview from "./components/Overview.vue";
import Products from "./components/Products.vue";
import Order from "./components/Order.vue";
import Profile from "./components/profile.vue";
import { fb } from './firebase';

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [{
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/admin",
            name: "admin",
            component: Admin,
            meta: {
                requiresAuth: true
            },
            children: [{
                    path: "overview",
                    name: "overview",
                    component: Overview
                },
                {
                    path: "products",
                    name: "products",
                    component: Products
                },
                {
                    path: "order",
                    name: "order",
                    component: Order
                },
                {
                    path: "profile",
                    name: "profile",
                    component: Profile
                }
            ]
        },
        {
            path: "/about",
            name: "about",
            component: () =>
                import ("./views/About.vue")
        }

        // {
        //     path: "/products",
        //     name: "Products",
        //     component: Products
        // }

    ]
});


router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
    const currentUser = fb.auth().currentUser;

    if (requiresAuth && !currentUser) {
        next('/');
    } else if (requiresAuth && currentUser) {
        next();
    } else {
        next();
    }
})

export default router;