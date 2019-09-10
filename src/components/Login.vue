<template>
  <section>
    <div :class="{'signup-form': !showLoginForm && !showForgotPassword}">
      <form v-if="showLoginForm" @submit.prevent>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
              <v-card class="elevation-12">
                <v-toolbar color="indigo" dark>
                  <v-toolbar-title>Login</v-toolbar-title>
                  <div class="flex-grow-1"></div>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="E-mail"
                      name="login"
                      prepend-icon="mdi-account"
                      type="text"
                      v-model.trim="loginForm.email"
                    ></v-text-field>

                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      prepend-icon="mdi-key"
                      type="password"
                      v-model.trim="loginForm.password"
                      @keypress.enter="login"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <div class="flex-grow-2"></div>
                  <v-btn color="red darken-2" class="white--text" @click="toggleForm">Sign up</v-btn>
                  <div class="flex-grow-1"></div>
                  <v-btn color="indigo" dark @click="togglePasswordReset">Forgot Password?</v-btn>
                  <div class="flex-grow-1"></div>
                  <v-btn color="indigo" dark @click="login">Login</v-btn>
                </v-card-actions>
                <v-card-actions></v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </form>
    </div>
    <div>
      <form v-if="!showLoginForm && !showForgotPassword" @submit.prevent>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
              <v-card class="elevation-12">
                <v-toolbar color="indigo" dark>
                  <v-toolbar-title>Create an Account</v-toolbar-title>
                  <div class="flex-grow-1"></div>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="Pet Name"
                      name="Pet Name"
                      type="text"
                      v-model.trim="signupForm.pet"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="First Name"
                      name="First Name"
                      type="text"
                      v-model.trim="signupForm.name"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="E-mail Address"
                      name="E-mail Address"
                      type="text"
                      v-model.trim="signupForm.email"
                    ></v-text-field>
                    <v-text-field
                      label="Choose a Password"
                      name="Choose a Password"
                      type="password"
                      v-model.trim="signupForm.password"
                      @keypress.enter="signup"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <div class="flex-grow-2"></div>
                  <v-btn color="red darken-2" class="white--text" @click="signup">Sign up</v-btn>

                  <div class="flex-grow-1"></div>
                  <v-btn color="indigo" dark @click="toggleForm">Back to Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </form>
      <form v-if="showForgotPassword" @submit.prevent class="password-reset">
        <div v-if="!passwordResetSuccess">
          <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                  <v-toolbar color="indigo" dark>
                    <v-toolbar-title>Reset Password</v-toolbar-title>
                    <div class="flex-grow-1"></div>
                  </v-toolbar>
                  <v-card-text>
                    <v-form>
                      <v-text-field
                        label="E-mail"
                        name="E-mail"
                        type="text"
                        v-model.trim="passwordForm.email"
                        required
                        @keypress.enter="resetPassword"
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <div class="flex-grow-2"></div>
                    <v-btn color="indigo" dark @click="resetPassword">Submit</v-btn>
                    <div class="flex-grow-1"></div>
                    <v-btn color="indigo" dark @click="togglePasswordReset">Back to Login</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>
        <div v-else>
          <div class="flex-grow-1"></div>
          <v-btn color="indigo" dark @click="togglePasswordReset">Back to Login</v-btn>
          <v-alert type="success">Check your email for a link to reset your password</v-alert>
        </div>
      </form>
    </div>

    <div v-if="errorMsg !== ''" class="error-msg">
      <v-alert type="error">{{ errorMsg }}</v-alert>
    </div>
  </section>
</template>
<script>
const fb = require("../firebaseConfig.js");
//login logic for firebase

export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      },
      signupForm: {
        email: "",
        pet: "",
        name: "",
        password: "",
        attendence: false,
        imageURL: "https://www.freeiconspng.com/uploads/dog-icon-30.jpg"
      },
      passwordForm: {
        email: ""
      },
      showLoginForm: true,
      showForgotPassword: false,
      passwordResetSuccess: false,
      performingRequest: false,
      errorMsg: "",
      drawer: null
    };
  },
  props: {
    source: String
  },
  methods: {
    toggleForm() {
      this.errorMsg = "";
      this.showLoginForm = !this.showLoginForm;
    },
    togglePasswordReset() {
      if (this.showForgotPassword) {
        this.showLoginForm = true;
        this.showForgotPassword = false;
        this.passwordResetSuccess = false;
        this.errorMsg = "";
      } else {
        this.showLoginForm = false;
        this.showForgotPassword = true;
      }
    },

    resetPassword() {
      fb.auth
        .sendPasswordResetEmail(this.passwordForm.email)
        .then(() => {
          this.passwordResetSuccess = true;
          this.passwordForm.email = "";
        })
        .catch(err => {
          console.log(err);

          this.errorMsg = err.message;
        });
    },
    login() {
      fb.auth
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        )
        .then(user => {
          this.$store.commit("setCurrentUser", user.user);
          this.$store.dispatch("fetchUserAccount");
          this.performingRequest = false;
          this.$router.push("/dashboard");
        })
        .catch(err => {
          console.log(err);
          console.log("test");
          this.performingRequest = false;
          this.errorMsg = err.message;
        });
    },
    signup() {
      this.performingRequest = true;

      fb.auth
        .createUserWithEmailAndPassword(
          this.signupForm.email,
          this.signupForm.password
        )
        .then(credential => {
          this.$store.commit("setCurrentUser", credential.user);

          // create user obj
          fb.usersCollection
            .doc(credential.user.uid)
            .set({
              name: this.signupForm.name,
              pet: this.signupForm.pet,
              attendence: this.signupForm.attendence,
              imageURL: this.signupForm.imageURL
            })
            .then(() => {
              this.$store.dispatch("fetchUserAccount");
              this.$router.push("/dashboard");
              this.performingRequest = false;
            })
            .catch(err => {
              console.log(err);
              this.performingRequest = false;
              this.errorMsg = err.message;
            });
        })
        .catch(err => {
          console.log(err);
          this.errorMsg = err.message;
        });
    }
  }
};
</script>
<style>
</style>