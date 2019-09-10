
<template>
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
                    <v-avatar size="100" class="grey lighten-2">
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
</template>
<script>
import { mapState } from "vuex";
const fb = require("../firebaseConfig.js");
import Checkin from "./Checkin.vue";

export default {
  data() {
    return {
      test: null
    };
  },
  components: { Checkin },
  computed: {
    ...mapState(["userAccount", "pets"])
  }
};
</script>
