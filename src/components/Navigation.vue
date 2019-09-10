<template>
  <v-app id="inspire">
    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer class="hidden-md-and-up"></v-spacer>
      <v-toolbar-title>Denton Dog Park</v-toolbar-title>

      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <v-btn text class="hidden-sm-and-down" to="/Dashboard">Home</v-btn>
      <v-btn text class="hidden-sm-and-down" to="/Profile">Profile</v-btn>
      <div v-if="currentUser">
        <v-btn color="red darken-3" class="hidden-sm-and-down" @click="logout">Logout</v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item to="/Dashboard">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/Profile">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <div v-if="currentUser">
          <v-list-item @click="logout">
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>
<script>
const fb = require("../firebaseConfig.js");
import { mapState } from "vuex";

export default {
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    ...mapState(["currentUser", "pets"])
  },
  props: {
    source: String
  },

  methods: {
    logout() {
      fb.auth
        .signOut()
        .then(() => {
          this.$store.dispatch("clearData");
          this.$router.push("/login");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
    
<style>
</style>
