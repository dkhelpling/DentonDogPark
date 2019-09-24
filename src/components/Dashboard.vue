
<template>
  <div>
    <div>
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
                <v-avatar size="120" class="grey lighten-2" @click="showPopup(pet)">
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
      <v-dialog width="500" v-model="dialog">
        <v-card color="indigo">
          <div align="right" justify="right">
            <v-icon x-large @click="closePopup">mdi-close</v-icon>
          </div>
          <v-card class="mx-auto" max-width="400">
            <br />
            <v-img class="white--text" max-height="200" contain :src="petInfo.img"></v-img>
            <v-card-text>
              <span class="text--primary">
                <span>Pet Name: {{petInfo.petName}}</span>
                <br />
                <span>Owner: {{petInfo.ownerName}}</span>
                <br />
              </span>
            </v-card-text>
          </v-card>
          <br />
        </v-card>
        <!-- <br />
        <div class="white--text" align="center" justify="center">Click outside box to close!</div>
        <div prepend-icon="mdi-close"></div>
        <br />-->
      </v-dialog>
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
      showDashboard: true,
      dialog: false
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
    },
    showPopup(data) {
      this.dialog = !this.dialog;
      this.petInfo = data;
      this.showDashboard = !this.dialog;
    },
    closePopup() {
      this.dialog = !this.dialog;
    }
  }
};
</script>
