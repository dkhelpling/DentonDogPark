
<template>
  <div>
    <div v-if="showDashboard">
      <!-- <v-row align="center" justify="center">
        <p>Pets at the Park:</p>
        <div class="team">
          <v-card-actions class="justify-center">
            <Checkin></Checkin>
          </v-card-actions>
          <v-container fluid>
            <v-layout class="ma-6 pa-2">
              <v-row>
                <v-col cols="12">
                  <v-row :align="alignment" :justify="justify">
                    <v-flex v-for="pet in pets" :key="pet.id" class="ma-1 pa-3">
                      <v-avatar size="50" class="grey lighten-2" @click="showProfile(pet)">
                        <img :src="pet.img" />
                      </v-avatar>
                      <p>{{pet.petName}}</p>
                    </v-flex>
                  </v-row>
                </v-col>
              </v-row>
            </v-layout>
          </v-container>
        </div>
      </v-row>-->
      <v-layout row>
        <v-flex xs14 sm4 offset-sm3>
          <v-toolbar flat>
            <v-toolbar-title>Pets in Park:</v-toolbar-title>
            <div class="flex-grow-1"></div>
            <Checkin></Checkin>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-container fluid grid-list-sm>
            <v-layout row wrap>
              <v-flex v-for="pet in pets" :key="pet.id" xs4>
                <v-avatar size="120" class="grey lighten-2" @click="showProfile(pet)">
                  <img :src="pet.img" />
                </v-avatar>
                <br />

                <h3 align="center">{{pet.petName}}</h3>
                <br />
              </v-flex>
            </v-layout>
          </v-container>
          <v-footer class="mt-5"></v-footer>
        </v-flex>
      </v-layout>
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
    },
    toggleDashboard() {
      this.showDashboard = !this.showDashboard;
    }
  }
};
</script>
