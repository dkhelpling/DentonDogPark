<template>
  <section id="settings">
    <div class="col1">
      <form @submit.prevent>
        <v-container class="fill-height" fluid v-if="!showSuccess">
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
              <v-card class="elevation-12">
                <v-toolbar color="indigo" dark>
                  <v-toolbar-title>Change Profile</v-toolbar-title>
                  <div class="flex-grow-1"></div>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      :placeholder="userAccount.pet"
                      prepend-icon="mdi-dog-side"
                      type="text"
                      v-model.trim="pet"
                    ></v-text-field>

                    <v-text-field
                      :placeholder="userAccount.name"
                      prepend-icon="mdi-account"
                      type="text"
                      v-model.trim="name"
                      @keypress.enter="updateAccount"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <div class="flex-grow-2"></div>
                  <v-btn
                    color="red darken-2"
                    class="white--text"
                    @click="updateAccount"
                    to="/Profile"
                  >Update</v-btn>
                  <div class="flex-grow-1"></div>
                  <v-btn color="indigo" dark to="/Profile">Back to Profile</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <div v-if="showSuccess">
          <v-alert type="success">Your information has been updated</v-alert>
        </div>
      </form>
    </div>
  </section>
</template>


<script>
import { mapState } from "vuex";

export default {
  data() {
    return { name: "", pet: "", showSuccess: false, attendence: false };
  },
  computed: {
    ...mapState(["userAccount"])
  },
  methods: {
    updateAccount() {
      this.$store.dispatch("updateAccount", {
        name: this.name !== "" ? this.name : this.userAccount.name,
        pet: this.pet !== "" ? this.pet : this.userAccount.pet
      });

      this.name = "";
      this.pet = "";

      this.showSuccess = true;

      setTimeout(() => {
        this.showSuccess = false;
      }, 2000);
    }
  }
};
</script>

<style>
</style>