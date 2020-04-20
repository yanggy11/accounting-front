import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "babel-polyfill";
import VueResource from "vue-resource";

Vue.use(ElementUI);
Vue.use(VueResource);

Vue.http.options.root = 'http://localhost:1988/';
Vue.http.interceptors.push((request, next) => {
    let token = localStorage.getItem('AuthenticationToken');
    if (token) {
        request.headers.set('Authorization', token);
    }
    next((response) => {
        console.log(response);
        let status = response.status;
        if(200!= status) {
            Vue.$message({message:response.statusText,
            type:'error',
            center: true
            })
        }
        return response;
    });
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
