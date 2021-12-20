import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'http://localhost/pengaduan/public/api'
// axios.defaults.baseURL = 'http://localhost:8000/api'


new Vue({
  router,
  store,
  methods: {
    isAuthenticate : function(){
        if(this.$store.getters.isLoggedIn){
        axios.defaults.headers.common['Authorization'] = "Bearer " + this.$store.state.token
        this.axios.get("/login/check")
        .then(response => {
        if(response.data.auth == false || response.data.status == 0){
        this.$store.dispatch('logout')
        } else {
        this.$store.commit('userDetail', response.data.user);
        }
        })
        .catch(error => {
        this.$store.dispatch('logout')
        });
        } else {
        this.$store.dispatch('logout')
        }
      },
  },
  mounted(){
    this.isAuthenticate();
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  },
  render: h => h(App)
}).$mount('#app')