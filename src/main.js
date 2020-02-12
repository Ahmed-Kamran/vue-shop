import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import jQuery from 'jquery';
import {
    fb
} from './firebase';
import VueFirestore from 'vue-firestore';
Vue.use(VueFirestore, {
    key: 'id', // the name of the property. Default is '.key'.
    enumerable: true //  whether it is enumerable or not. Default is true.
})

Vue.use(VueFirestore);


import store from './store.js';

import Vue2Filters from 'vue2-filters';

Vue.use(Vue2Filters);

import 'popper.js';
import 'bootstrap';
import './assets/app.scss';

// notification aleart 
import Swal from 'sweetalert2';



const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

window.$ = window.jQuery = jQuery;
window.Swal = Swal;
window.Toast = Toast;

// slider design import 
// import Vue from 'vue';
import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

Vue.component('Navbar', require('./components/Navbar.vue').default);
Vue.component('Hero', require('./components/Hero.vue').default);
Vue.component('products-list', require('./sections/Products.vue').default);
Vue.component('add-to-cart', require('./components/AddToCart.vue').default);
Vue.component('mini-cart', require('./components/MiniCart.vue').default);
// Vue.component('products-list', require('./sections/ProductList.vue').default);



// Vue.component('Products', require('./sections/Products.vue').default);

Vue.config.productionTip = false;

let app = '';

fb.auth().onAuthStateChanged(function(user) {
    if (!app) {
        new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount("#app");
    }
});