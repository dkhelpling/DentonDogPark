<template>
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
              <!--col-md-6-->
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
      errorMsg: ""
    };
  },
  methods: {
    toggleForm() {
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
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style>
.login-container {
  margin-top: 5%;
  margin-bottom: 5%;
}
.login-form-1 {
  padding: 5%;
}
.login-form-1 h3 {
  text-align: center;
  color: #333;
}
.login-form-2 {
  padding: 5%;
  background: #0062cc;
}
.login-form-2 h3 {
  text-align: center;
  color: #fff;
}
.login-container form {
  padding: 10%;
}
.btnSubmit {
  width: 50%;
  border-radius: 1rem;
  padding: 1.5%;
  border: none;
  cursor: pointer;
}
.login-form-1 .btnSubmit {
  font-weight: 600;
  color: #fff;
  background-color: #0062cc;
}
.login-form-2 .btnSubmit {
  font-weight: 600;
  color: #0062cc;
  background-color: #fff;
}
.login-form-2 .ForgetPwd {
  color: #fff;
  font-weight: 600;
  text-decoration: none;
}
.login-form-1 .ForgetPwd {
  color: #0062cc;
  font-weight: 600;
  text-decoration: none;
}

::selection {
  background-color: #b5e2e7;
}

::-moz-selection {
  background-color: #8ac7d8;
}

.container {
  display: -webkit-flex;
  display: flex;
  height: 100%;
}

#logbox {
  padding: 10px;
  margin: 50px auto;
  width: 340px;
  background-color: #fff;
  -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);
}

h1 {
  text-align: center;
  font-size: 175%;
  color: #757575;
  font-weight: 300;
}

h1,
input {
  font-family: "Open Sans", Helvetica, sans-serif;
}

.input {
  width: 75%;
  height: 50px;
  display: block;
  margin: 0 auto 15px;
  padding: 0 15px;
  border: none;
  border-bottom: 2px solid #ebebeb;
}
.input:focus {
  outline: none;
  border-bottom-color: #3cc !important;
}
.input:hover {
  border-bottom-color: #dcdcdc;
}
.input:invalid {
  box-shadow: none;
}

.pass:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px white inset;
}

.inputButton {
  position: relative;
  width: 85%;
  height: 50px;
  display: block;
  margin: 30px auto 30px;
  color: white;
  background-color: #3cc;
  border: none;
  -webkit-box-shadow: 0 5px 0 #2cadad;
  -moz-box-shadow: 0 5px 0 #2cadad;
  box-shadow: 0 5px 0 #2cadad;
}
.inputButton:hover {
  top: 2px;
  -webkit-box-shadow: 0 3px 0 #2cadad;
  -moz-box-shadow: 0 3px 0 #2cadad;
  box-shadow: 0 3px 0 #2cadad;
}
.inputButton:active {
  top: 5px;
  box-shadow: none;
}
.inputButton:focus {
  outline: none;
}
</style>