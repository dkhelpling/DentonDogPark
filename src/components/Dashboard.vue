
<template>
  <div>
    <div v-if="showDashboard">
      <v-row align="center" justify="center">
        <p>Pets at the Park:</p>
        <div class="team">
          <v-card-actions class="justify-center">
            <Checkin></Checkin>
          </v-card-actions>
          <v-container fluid>
            <v-layout class="ma-3 pa-6">
              <v-row>
                <v-col cols="12">
                  <v-row>
                    <v-flex v-for="pet in pets" :key="pet.id" class="ma-3 pa-2">
                      <v-responsive class="pt-2">
                        <v-avatar size="100" class="grey lighten-2" @click="showProfile(pet)">
                          <img :src="pet.img" />
                        </v-avatar>
                        <h1>{{pet.petName}}</h1>
                      </v-responsive>
                      <v-card-text class="justify-center"></v-card-text>
                    </v-flex>
                  </v-row>
                </v-col>
              </v-row>
            </v-layout>
          </v-container>
        </div>
      </v-row>
    </div>
    <div v-if="!showDashboard">
      <v-card class="mx-auto" max-width="400">
        <v-img class="white--text" height="200px" :src="petInfo.img">
          <v-card-title class="align-end fill-height">{{petInfo.petName}}</v-card-title>
        </v-img>

        <v-card-text>
          <span class="text--primary">
            <span>Owner: {{petInfo.ownerName}}</span>
            <br />
          </span>
        </v-card-text>
      </v-card>
      <br />
      <div align="center" justify="center">
        <v-btn color="indigo" dark @click="toggleDashboard">Back to Dashboard</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
const fb = require("../firebaseConfig.js");
import Checkin from "./Checkin.vue";

export default {
  data() {
    return {
      test: null,
      petInfo: null,
      showDashboard: true
    };
  },
  components: { Checkin },
  computed: {
    ...mapState(["userAccount", "pets"])
  },
  methods: {
    showProfile(data) {
      this.showDashboard = !this.showDashboard;
      this.petInfo = data;
      console.log(data);
    },
    toggleDashboard() {
      this.showDashboard = !this.showDashboard;
    }
  }
};
</script>
