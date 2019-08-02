import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import { store } from "./store";
const fb = require("./firebaseConfig.js");

Vue.config.productionTip = false;

//handles page reloads
let app;
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
