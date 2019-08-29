<!--// <template>
  //
  <div id="dashboard">
    //
    <section>
      //
      <div class="col1">
        //
        <div class="profile">
          //
          <Checkin></Checkin>//
        </div>//
      </div>//
    </section>//
  </div>//
</template>


// <script>
// const fb = require("../firebaseConfig.js");
// //creating method to get all dogs at dog park
// export default {
//   data() {
//     return {
//       peopleInPark: []
//     };
//   },
//   methods: {
//     getAttendance() {
//       let attendanceRef = db.collection("users");
//       let query = attendanceRef
//         .where("attendance", "==", true)
//         .get()
//         .then(snapshot => {
//           if (snapshot.empty) {
//             console.log("No matching documents.");
//             return;
//           }

//           snapshot.forEach(doc => {
//             console.log(doc.id, "=>", doc.data());
//           });
//         })
//         .catch(err => {
//           console.log("Error getting documents", err);
//         });
//     }
//   },
//   created() {
//     db.collection("users").onSnapshot(res => {
//       const changes = res.docChanges();

//       changes.forEach(change => {
//         if (change.type === "modify")
//         this.peopleInPark.push({
//             ...change.doc.data("attendence")
//         })
//         }
//       });
//     }
//   };

//
</script>

// <style>
//
</style>