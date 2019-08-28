<template>
  <v-row align="center" justify="center">
    <div id="dashboard">
      <!-- <h5>name: {{ userProfile.name }}</h5>
      <p>pet: {{ userProfile.pet }}</p>
      <p>At dogpark: {{ userProfile.attendence }}</p>-->

      <p>Pets at the Park:</p>

      <div v-if="pets.length">
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <v-row
                :align="center"
                :justify="center"
                class="grey lighten-5"
                style="height: 100px;"
              >
                <v-card v-for="pet in pets" :key="pet.id" class="ma-3 pa-6" outlined tile>{{pet}}</v-card>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div v-else>
        <p>No dogs in park</p>
      </div>

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
