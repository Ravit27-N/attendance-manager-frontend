<template>
  <!-- <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">Use Google's location service?</v-card-title>
      <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click.native="submit">Submit</v-btn>
        <v-btn color="red darken-1" flat @click.native="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>-->
  <v-dialog v-model="dialogcreate" max-width="800px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        class="mb-2"
        v-bind="attrs"
        @click.stop="dialogcreate = true"
      >New Student</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5 header-dialog">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row class="mt-2">
              <v-col cols="12" sm="6" md="6" class="input-data">
                <v-text-field
                  v-model="submit_data.student_id"
                  label="Student Id"
                  :rules="student_idrule"
                  placeholder="Enter Student Id"
                  outlined
                  clearable
                  required
                >Id</v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="input-data">
                <v-text-field
                  v-model="submit_data.name"
                  label="Name"
                  :rules="nameRules"
                  placeholder="Enter name"
                  outlined
                  clearable
                  required
                >Name</v-text-field>
              </v-col>
              <v-col class="d-flex input-data" cols="12" sm="6">
                <v-select
                  :rules="genderrule"
                  :items="gender"
                  v-model="submit_data.gender"
                  label="gender"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="input-data">
                <v-text-field
                  v-model="submit_data.phone_number"
                  label="Phone Number"
                  :rules="phone_numberrule"
                  placeholder="Enter Phone number"
                  outlined
                  clearable
                  required
                >Phone Number</v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12" class="input-data">
                <!-- <v-text-field v-model="submit_data.dob" label="dob" outlined></v-text-field> -->
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  label="gender"
                  :return-value.sync="date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="submit_data.dob"
                      label="Date of Birth"
                      append-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="submit_data.dob" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="input-data">
                <v-select
                  :items="usertype"
                  label="usertype"
                  v-on:change="listenUsertype"
                  v-model="submit_data.usertype"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="input-data">
                <v-select
                  :disabled="!student_status"
                  :items="department"
                  label="Department"
                  v-model="submit_data.department"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="input-data">
                <v-select
                  :items="years"
                  :disabled="!student_status"
                  label="Year Department"
                  v-model="submit_data.year_department"
                  outlined
                ></v-select>
              </v-col>

              <v-col cols="12" sm="12" md="12" class="input-data">
                <v-file-input
                  accept="image/*"
                  placeholder="Pick an image"
                  append-icon="mdi-camera"
                  label="Image"
                  type="file"
                  v-model="submit_data.image"
                  show-size
                  outlined
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialogcreate = false">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="create_students">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import axios from "axios";
export default {
  props: {
    dialogcreate: {
      default: false
    }
  },
  data: () => ({
    submit_data: {
      student_id: "",
      name: "",
      gender: "Male",
      dob: "",
      phone_number: "",
      usertype: "Ingénieure",
      department: "None",
      year_department: "0",
      option: "",
      image: ""
    },
    student_status: true,
    gender: ["Male", "Female"],
    usertype: ["Ingénieure", "Technique", "Lecturer", "Guest"],
    department: ["None", "DTC", "GIM", "GIC", "GCI", "GTR", "GRU"],
    years: ["0", "1", "2", "3", "4", "5"]
  }),
  methods: {
    listenUsertype() {
      if (
        this.submit_data.usertype != "Ingénieure" &&
        this.submit_data.usertype != "Technique"
      ) {
        this.student_status = false;
        this.submit_data.department = "None";
        this.submit_data.year_department = "0";
      } else {
        this.student_status = true;
      }
    },

    async create_students() {
      if (this.submit_data.usertype == "Ingénieure") {
        this.submit_data.option =
          "I" +
          this.submit_data.year_department +
          "-" +
          this.submit_data.department;
      } else if (this.submit_data.usertype == "Technique") {
        this.submit_data.option =
          "T" +
          this.submit_data.year_department +
          "-" +
          this.submit_data.department;
      } else if (this.submit_data.usertype == "Lecturer") {
        this.submit_data.option = this.usertype;
      } else {
        this.submit_data.option = "Guest";
      }

      await this.validate();

      if (this.valid == true) {
        const formData = new FormData();
        formData.append("student_id", this.submit_data.student_id);
        formData.append("name", this.submit_data.name);
        formData.append("gender", this.submit_data.gender);
        formData.append("dob", this.submit_data.dob);
        formData.append("usertype", this.submit_data.usertype);
        formData.append("phone_number", this.submit_data.phone_number);
        formData.append("year_department", this.submit_data.year_department);
        formData.append("department", this.submit_data.department);
        formData.append("option", this.submit_data.option);
        formData.append("image", this.submit_data.image);
        axios
          .post(`http://localhost:3000/candidate`, formData)
          .then(response => (this.info = response))
          .then(() => {
            if (this.info.statusText == "Created") { 
              this.dialogcreate = false;
              this.$emit('create-success'); 
            } else {
              alert("Create Student Error");
            }
          });
      } else {
        this.dialogcreate = true;
      }
    },
    validate() {
      this.$ref;
    }
  }
};
</script>
<style scoped>
.input-data {
  padding: 0px 5px;
}
.header-dialog {
  font-weight: 600;
  color: #0062e0;
}
.name {
  font-size: 2rem;
  font-weight: bold;
}
.usertype {
  font-size: 1.3rem;
  font-weight: 600;
}
.coninfo {
  display: flex;
  flex-direction: row;
}
.information {
  width: 30%;
  text-align: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 500;
}
</style>
