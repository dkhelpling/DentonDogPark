<template>
  <div class="col1">
    <div class="flex-grow-1" v-if="userAccount.attendence === false">
      <v-btn color="indigo" dark @click="updateProfile">Checkin</v-btn>
    </div>
    <div v-else>
      <v-btn color="indigo" dark @click="updateProfile2">Checkout</v-btn>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["userProfile", "userAccount"])
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("updateProfile", {
        attendence: this.attendence !== true ? true : false
      });
      this.atPark = true;
      setTimeout(() => {}, 2000);
    },
    updateProfile2() {
      this.$store.dispatch("updateProfile2", {
        attendence: this.attendence !== false ? false : true
      });
      this.atPark = false;
      setTimeout(() => {}, 2000);
    }
  }
};
</script>

<style>
</style>