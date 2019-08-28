<!--<template>
  <div id="login">
    <transition name="fade">
      <div v-if="performingRequest" class="loading">
        <p>Loading...</p>
      </div>
    </transition>
    <section>
      <div class="col2" :class="{'signup-form': !showLoginForm && !showForgotPassword}">
        <div class="col-md-6 offset-sm-3 login-form-1">
          <form v-if="showLoginForm" @submit.prevent>
            <h1>Welcome</h1>
            <div class="form-group">
              <label for="email1"></label>
              <input
                v-model.trim="loginForm.email"
                type="text"
                placeholder="Your E-mail *"
                id="email1"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label for="password1"></label>
              <input
                v-model.trim="loginForm.password"
                type="password"
                placeholder="Your Password *"
                id="password1"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <button @click="login" class="btnSubmit">Log In</button>
            </div>

            <div class="extras">
              <a @click="togglePasswordReset">Forgot Password</a>
              <br />
              <a @click="toggleForm">Create an Account</a>
            </div>
          </form>
        </div>
        <form v-if="!showLoginForm && !showForgotPassword" @submit.prevent>
          <div>
            <div class="container">
              <div class="col-md-6">
                <div id="logbox">
                  <h1>Create an Account</h1>

                  <input
                    v-model.trim="signupForm.pet"
                    type="text"
                    placeholder="Pet Name"
                    class="input pass"
                  />
                  <input
                    v-model.trim="signupForm.name"
                    type="text"
                    placeholder="First Name"
                    class="input pass"
                  />
                  <input
                    v-model.trim="signupForm.email"
                    type="text"
                    placeholder="Email address"
                    class="input pass"
                  />
                  <input
                    v-model.trim="signupForm.password"
                    type="password"
                    placeholder="Choose a password"
                    class="input pass"
                  />

                  <input type="submit" value="Sign me up!" class="inputButton" @click="signup" />
                  <button @click="signup" class="button">Sign Up</button>
                </div>
              </div>
              
            </div>
          </div>

          <div class="extras">
            <a @click="toggleForm">Back to Log In</a>
          </div>
        </form>
        <form v-if="showForgotPassword" @submit.prevent class="password-reset">
          <div v-if="!passwordResetSuccess">
            <h1>Reset Password</h1>
            <p>We will send you an email to reset your password</p>

            <label for="email3">Email</label>
            <input
              v-model.trim="passwordForm.email"
              type="text"
              placeholder="you@email.com"
              id="email3"
            />

            <button @click="resetPassword" class="button">Submit</button>

            <div class="extras">
              <a @click="togglePasswordReset">Back to Log In</a>
            </div>
          </div>
          <div v-else>
            <h1>Email Sent</h1>
            <p>check your email for a link to reset your password</p>
            <button @click="togglePasswordReset" class="button">Back to login</button>
          </div>
        </form>
        <transition name="fade">
          <div v-if="errorMsg !== ''" class="error-msg">
            <p>{{ errorMsg }}</p>
          </div>
        </transition>
      </div>
    </section>
  </div>
</template>
-->
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
                <v-card-actions></v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </form>

      <div v-if="errorMsg !== ''" class="error-msg">
        <v-alert type="error">{{ errorMsg }}</v-alert>
      </div>
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
        attendence: false
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
      } else {
        this.showLoginForm = false;
        this.showForgotPassword = true;
      }
    },

    resetPassword() {
      this.performingRequest = true;

      fb.auth
        .sendPasswordResetEmail(this.passwordForm.email)
        .then(() => {
          this.performingRequest = false;
          this.passwordResetSuccess = true;
          this.passwordForm.email = "";
        })
        .catch(err => {
          console.log(err);

          this.performingRequest = false;
          this.errorMsg = err.message;
        });
    },
    login() {
      this.performingRequest = true;

      fb.auth
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        )
        .then(user => {
          this.$store.commit("setCurrentUser", user.user);
          this.$store.dispatch("fetchUserProfile");
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
              attendence: this.signupForm.attendence
            })
            .then(() => {
              this.$store.dispatch("fetchUserProfile");
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