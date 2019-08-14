<template>
  <div id="dashboard">
    <section>
      <div class="col1">
        <div class="profile">
          <h5>{{ userProfile.name }}</h5>
          <p>{{ userProfile.title }}</p>
          <p>{{ userProfile.attendence }}</p>
          <Checkin></Checkin>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import { mapState } from "vuex";
const fb = require("../firebaseConfig.js");
import Checkin from "./Checkin.vue";

export default {
  data() {
    return {};
  },
  components: { Checkin },
  computed: {
    ...mapState(["userProfile"])
  }
};
</script>

<style>
</style>