// import Vue from "vue";
// import App from "./App.vue";
// import router from "./router";
// import store from "./store";
// import vuetify from "./plugins/vuetify";

// Vue.config.productionTip = false;

// new Vue({
//   router,
//   store,
//   vuetify,
//   render: h => h(App)
// }).$mount("#app");

import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import { store } from "./store";
const fb = require("./firebaseConfig.js");
import vuetify from "./plugins/vuetify.js";

Vue.config.productionTip = false;

//handles page reloads
let app;
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    new Vue({
      router,
      vuetify,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
