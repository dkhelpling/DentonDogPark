// import Vue from "vue";
// import Vuetify, { VToolbar, VToolbarTitle, VListItem, } from "vuetify/lib";

// Vue.use(Vuetify, {
//   components: {
//     VToolbar,
//     VToolbarTitle,
//     VListItem
//   }
// });

// export default new Vuetify({
//   icons: {
//     iconfont: "mdi"
//   },
//   components: {
//     VToolbar,
//     VToolbarTitle,
//     VListItem
//   }
// });

import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  }
});
