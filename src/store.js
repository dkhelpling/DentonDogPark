import Vue from "vue";
import Vuex from "vuex";
const fb = require("./firebaseConfig.js");

Vue.use(Vuex);

//handles page reloads
fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit("setCurrentUser", user);
    store.dispatch("fetchUserAccount");
    fb.usersCollection.doc(user.uid).onSnapshot(doc => {
      store.commit("setUserAccount", doc.data());
    });
    //handles list of pets in park
    fb.usersCollection.orderBy("pet").onSnapshot(querySnapshot => {
      let petArray = [];
      querySnapshot.forEach(doc => {
        let pet = doc.data();
        if (pet.attendence === true) {
          let petObj = {};
          petObj["petName"] = pet.pet;
          petObj["img"] = pet.imageURL;
          petArray.push(petObj);
        }
      });
      store.commit("setPets", petArray);
    });
  }
});

export const store = new Vuex.Store({
  //Added properties to the state file
  state: {
    currentUser: null,
    userAccount: {},
    pets: [],
    userAvatar: null
  },
  //Created mutations to update user in state object
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setUserAccount(state, val) {
      state.userAccount = val;
    },
    setPets(state, val) {
      state.pets = val;
    },
    setUserAvatar(state, val) {
      state.userAvatar = val;
    }
  },
  //Setup actions to fetch the user profile
  actions: {
    clearData({ commit }) {
      commit("setCurrentUser", null);
      commit("setUserAccount", {});
    },
    fetchUserAccount({ commit, state }) {
      fb.usersCollection
        .doc(state.currentUser.uid)
        .get()
        .then(res => {
          commit("setUserAccount", res.data());
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateProfile({ state }, data) {
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
    updateProfile2({ state }, data) {
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
    updateAccount({ state }, data) {
      let name = data.name;
      let pet = data.pet;

      fb.usersCollection
        .doc(state.currentUser.uid)
        .update({ name, pet })
        .then(function() {
          // update name or pet
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateProfileAvatar({ state }, data) {
      let imageURL = data.imageURL;

      fb.usersCollection
        .doc(state.currentUser.uid)
        .update({ imageURL })
        .then(function() {
          // update profile image URL
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
