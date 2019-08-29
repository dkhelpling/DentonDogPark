<!-- <template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand">
      <router-link to="dashboard">Denton Dog Park</router-link>
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-item nav-link">
          <router-link to="dashboard">Dashboard</router-link>
        </a>
        <a class="nav-item nav-link">
          <router-link to="settings">Settings</router-link>
        </a>
        <a class="nav-item nav-link">
          <a @click="logout">Logout</a>
        </a>
      </div>
    </div>
  </nav>
</template>
-->
<!-- <template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dark>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer class="hidden-md-and-up"></v-spacer>
      <v-toolbar-title>Denton Dog Park</v-toolbar-title>

      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <v-btn text class="hidden-sm-and-down" to="/Dashboard">Home</v-btn>
      <v-btn text class="hidden-sm-and-down">Profile</v-btn>

      <v-btn text class="hidden-sm-and-down" to="/Login">Login</v-btn>
      <v-btn color="teal darken-3" class="hidden-sm-and-down">Sign Up</v-btn>
    </v-app-bar>
  </div>
</template>
-->

<template>
  <v-app id="inspire">
    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer class="hidden-md-and-up"></v-spacer>
      <v-toolbar-title>Denton Dog Park</v-toolbar-title>

      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <v-btn text class="hidden-sm-and-down" to="/Dashboard">Home</v-btn>
      <v-btn text class="hidden-sm-and-down" to="/Profile">Profile</v-btn>
      <div v-if="!currentUser">
        <v-btn text class="hidden-sm-and-down" to="/Login">Login</v-btn>
        <v-btn color="red darken-3" class="hidden-sm-and-down">Sign Up</v-btn>
      </div>
      <div v-else>
        <v-btn color="red darken-3" class="hidden-sm-and-down" @click="logout">Logout</v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item @click>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click>
          <v-list-item-action>
            <v-icon>mdi-contact_mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
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
      drawer: false,
      menuItems: [
        { title: "Home", path: "/home", icon: "home" },
        { title: "Sign Up", path: "/signup", icon: "face" },
        { title: "Sign In", path: "/signin", icon: "lock_open" }
      ]
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
