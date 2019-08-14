import Vue from "vue";
import Vuex from "vuex";
const fb = require("./firebaseConfig.js");

Vue.use(Vuex);

//handles page reloads
fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit("setCurrentUser", user);
    store.dispatch("fetchUserProfile");
    fb.usersCollection.doc(user.uid).onSnapshot(doc => {
      store.commit("setUserProfile", doc.data());
    });
  }
});

export const store = new Vuex.Store({
  //Added properties to the state file
  state: {
    currentUser: null,
    userProfile: {}
  },
  //Created mutations to update user in state object
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    }
  },
  //Setup actions to fetch the user profile
  actions: {
    clearData({ commit }) {
      commit("setCurrentUser", null);
      commit("setUserProfile", {});
    },
    fetchUserProfile({ commit, state }) {
      fb.usersCollection
        .doc(state.currentUser.uid)
        .get()
        .then(res => {
          commit("setUserProfile", res.data());
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateProfile({ commit, state }, data) {
      let attendence = data.attendence;
      fb.usersCollection
        .doc(state.currentUser.uid)
        .update({ attendence })
        .then(function() {
          //successful
        })
        .catch(function(error) {
          console.log(error.message);
        });
    },
    updateProfile2({ commit, state }, data) {
      let attendence = data.attendence;
      fb.usersCollection
        .doc(state.currentUser.uid)
        .update({ attendence })
        .then(function() {
          //successful
        })
        .catch(function(error) {
          console.log(error.message);
        });
    }
  }
});
