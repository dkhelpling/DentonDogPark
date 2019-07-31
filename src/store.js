import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const fb = require("./firebaseConfig.js");

export default new Vuex.Store({
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
    }
  }
});
