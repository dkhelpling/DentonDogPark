<template>
  <div class="col1">
    <button @click="updateProfile" class="button">Checkin</button>
    <button @click="updateProfile2" class="button">Checkout</button>
  </div>
</template>


<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      attendence: ""
    };
  },
  computed: {
    ...mapState(["userProfile"])
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("updateProfile", {
        attendence: this.attendence !== true ? true : false
      });
      setTimeout(() => {}, 2000);
    },
    updateProfile2() {
      this.$store.dispatch("updateProfile2", {
        attendence: this.attendence !== false ? false : true
      });
      setTimeout(() => {}, 2000);
    }
  }
};
</script>

<style>
</style>