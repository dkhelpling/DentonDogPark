<template>
  <div id="app">
    <v-app id="inspire">
      <div v-if="showProfileForm">
        <v-card class="mx-auto" max-width="400">
          <v-img class="white--text" height="200px" :src="userAccount.imageURL">
            <v-card-title class="align-end fill-height">{{userAccount.pet}}</v-card-title>
          </v-img>

          <v-card-text>
            <span class="text--primary">
              <span>{{userAccount.name}}</span>
              <br />
            </span>
          </v-card-text>

          <v-card-actions>
            <v-btn text color="orange" @click="toggleForm">Update Profile</v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="orange" justify-right @click="toggleAvatarForm">Update Image</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div class="col1" v-if="!showProfileForm && !showAvatarForm">
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
                    <div class="flex-grow-1"></div>
                    <v-btn color="red darken-2" class="white--text" @click="updateAccount">Update</v-btn>
                  </v-card-actions>
                </v-card>
                <br />
                <div align="center" justify="center">
                  <v-btn color="indigo" dark @click="toggleForm">Back to Profile</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <div v-if="showSuccess">
            <v-alert type="success">Your information has been updated</v-alert>
          </div>
        </form>
      </div>
      <div class="col1" v-if="!showProfileForm && showAvatarForm">
        <form @submit.prevent>
          <v-container class="fill-height" fluid v-if="!showSuccess">
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8" md="6">
                <v-card class="elevation-12">
                  <v-toolbar color="indigo" dark>
                    <v-toolbar-title>Change Profile Picture</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-file-input
                      v-model="file"
                      label="Select Image File..."
                      accept="image/*"
                      @change="onFileChange"
                    ></v-file-input>

                    <br />
                    <div align="center" justify="center">
                      <div v-if="loading">
                        <pulse-loader id="loader" :color="color"></pulse-loader>
                      </div>
                      <div v-else>
                        <img
                          :src="this.imageURL"
                          alt="https://i.imgur.com/Fioc3zS.jpg"
                          width="150px"
                        />
                      </div>
                    </div>
                    <br />
                    <div align="center" justify="center">
                      <v-btn
                        color="red darken-2"
                        class="white--text"
                        @click="updateProfileAvatar"
                      >Set Profile Picture</v-btn>
                    </div>
                  </v-card-text>
                </v-card>

                <div align="center" justify="center">
                  <br />
                  <v-btn color="indigo" dark @click="toggleAvatarForm">Back to Profile</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <div v-if="showSuccess">
            <v-alert type="success">Your picture has been updated!</v-alert>
          </div>
        </form>
      </div>
    </v-app>
  </div>
</template>


<script>
import { mapState } from "vuex";
import PictureInput from "vue-picture-input";

import { fb, db } from "../firebaseConfig.js";
import FadeLoader from "vue-spinner/src/FadeLoader.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  data() {
    return {
      showProfileForm: true,
      showAvatarForm: false,
      showSuccess: false,
      name: "",
      pet: "",
      imageURL: "https://via.placeholder.com/150",
      file: null,
      color: "#2f3f9c",
      loading: false
    };
  },
  computed: {
    ...mapState(["userAccount"])
  },
  components: {
    FadeLoader,
    PulseLoader
  },
  methods: {
    toggleForm() {
      this.showProfileForm = !this.showProfileForm;
    },
    toggleAvatarForm() {
      this.showProfileForm = !this.showProfileForm;
      this.showAvatarForm = !this.showAvatarForm;
    },

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
        this.showProfileForm = !this.showProfileForm;
      }, 2000);
    },
    updateProfileAvatar() {
      this.$store.dispatch("updateProfileAvatar", {
        imageURL: this.imageURL
      });

      this.showSuccess = true;

      setTimeout(() => {
        this.showSuccess = false;
        this.showProfileForm = !this.showProfileForm;
        this.showAvatarForm = !this.showAvatarForm;
      }, 2000);
    },
    onFileChange() {
      let reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.file);
      console.log(this.file);
      var storageRef = fb
        .storage()
        .ref("images/" + Math.random() + "_" + this.file.name);
      let uploadTask = storageRef.put(this.file);
      uploadTask.on(
        "state_changed",
        snapshot => {},
        error => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...

          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.imageURL = downloadURL;
          });
        }
      );
    }
  }
};
</script>

<style>
#loader {
  color: red;
}
</style>