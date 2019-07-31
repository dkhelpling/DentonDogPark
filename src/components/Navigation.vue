<template>
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

<script>
const fb = require("../firebaseConfig.js");

export default {
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
