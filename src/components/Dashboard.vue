<template>
  <v-row align="center" justify="center">
    <div id="dashboard">
      <h5>name: {{ userProfile.name }}</h5>
      <p>pet: {{ userProfile.pet }}</p>
      <p>At dogpark: {{ userProfile.attendence }}</p>
      <p>Pet List:</p>
      <p v-if="pets.length">{{pets}}</p>
      <p v-else>No dogs in park</p>

      <Checkin></Checkin>
    </div>
  </v-row>
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
    ...mapState(["userProfile", "pets"])
  }
};
</script>
