<template>
  <v-app>
    <!-- Create Navigation while logged in and while logged out-->
    <v-app-bar app v-if="currentUser">
      <Navigation></Navigation>
    </v-app-bar>
    <v-app-bar app v-else color="indigo" dark>
      <v-toolbar-title>Denton Dog Park</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>



<script>
import { mapState } from "vuex";
import Navigation from "./components/Navigation.vue";

export default {
  components: { Navigation },
  computed: {
    ...mapState(["currentUser", "pets"])
  }
};
</script>

<style>
</style>
