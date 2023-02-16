<template>
  <div class="container-page">
    <v-col cols="12" sm="12" md="12">
      <v-data-table
        :search="search"
        :headers="headers"
        :items="students"
        class="elevation-1 px-10 pt-5"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Student</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>

            <v-text-field
              v-model="search"
              class="ml-5"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>

            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                @click.stop="dialogcreate = true"
              >New Student</v-btn>
            </template>
            <Createstudent :dialog.sync="dialogcreate" v-on:create-success="create_student_success"/>

            <v-dialog v-model="dialogUpdate" max-width="800px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Edit Student</span>
                </v-card-title>

                <v-card-text>
                  <v-form ref="formupdate" v-model="validupdate" lazy-validation>
                    <v-container>
                      <v-row class="mt-2">
                        <v-col cols="12" sm="6" md="6" class="input-data">
                          <v-text-field
                            v-model="submit_edit_data.student_id"
                            label="Student Id"
                            placeholder="Enter Student Id"
                            outlined
                            clearable
                            :rules="student_idrule"
                            required
                          >Id</v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="input-data">
                          <v-text-field
                            v-model="submit_edit_data.name"
                            label="Name"
                            placeholder="Enter name"
                            :rules="nameRules"
                            outlined
                            clearable
                            required
                          >Name</v-text-field>
                        </v-col>
                        <v-col class="d-flex input-data" cols="12" sm="6">
                          <v-select
                            :rules="genderrule"
                            :items="gender"
                            v-model="submit_edit_data.gender"
                            label="gender"
                            outlined
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="input-data">
                          <v-text-field
                            v-model="submit_edit_data.phone_number"
                            label="Phone Number"
                            :rules="phone_numberrule"
                            placeholder="Enter Phone Number"
                            outlined
                            clearable
                            required
                          >Phone Number</v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="12" class="input-data">
                          <!-- <v-text-field v-model="submit_edit_data.dob" label="dob" outlined></v-text-field> -->
                          <v-dialog
                            ref="dialog"
                            v-model="modal"
                            :return-value.sync="date"
                            persistent
                            width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="submit_edit_data.dob"
                                label="Picker in dialog"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                outlined
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="submit_edit_data.dob" scrollable>
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
                            v-model="submit_edit_data.usertype"
                            outlined
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" class="input-data">
                          <v-select
                            :disabled="!student_status"
                            :items="department"
                            label="Department"
                            v-model="submit_edit_data.department"
                            outlined
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" class="input-data">
                          <v-select
                            :items="years"
                            :disabled="!student_status"
                            label="Year Department"
                            v-model="submit_edit_data.year_department"
                            outlined
                          ></v-select>
                        </v-col>

                        <v-col cols="12" sm="12" md="12" class="input-data">
                          <v-file-input
                            accept="image/*"
                            placeholder="Pick an avatar"
                            prepend-icon="mdi-camera"
                            label="Image"
                            type="file"
                            v-model="submit_edit_data.image"
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
                  <v-btn color="blue darken-1" text @click="dialogUpdate = false">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="edit_student">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialogDelete = false">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialogView" max-width="600px">
              <v-card class="pa-5">
                <v-list-item three-line>
                  <v-list-item-avatar tile size="200px">
                    <v-img :src="viewData.imageurl" width="200px"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <div class="text-overline mb-4">Candidate information</div>

                    <v-list-item-title class="name">
                      {{viewData.name}}
                      <br />
                      <span class="usertype">{{viewData.usertype}}</span>
                    </v-list-item-title>
                  </v-list-item-content>
                  <br />
                  <v-avatar size="100">
                    <img src="@/assets/logoitc.png" alt="logoitc" />
                  </v-avatar>
                </v-list-item>
                <v-list-item-content></v-list-item-content>
                <div class="coninfo">
                  <v-chip class="ma-2 information" color="primary" label>
                    <v-icon left>mdi-account</v-icon>
                    {{viewData.student_id}}
                  </v-chip>
                  <v-chip class="ma-2 information" color="primary" label>
                    <v-icon left>mdi-phone</v-icon>
                    {{viewData.phone_number}}
                  </v-chip>
                  <v-chip class="ma-2 information" color="primary" label>
                    <v-icon left>mdi-information</v-icon>
                    {{viewData.option}}
                  </v-chip>
                </div>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="dialogView = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            medium
            color="primary"
            class="mr-2"
            @click="viewItem(item)"
            @click.stop="dialogView = true"
          >mdi-eye</v-icon>
          <v-icon
            medium
            color="primary"
            class="mr-2"
            @click="editItem(item)"
            @click.stop="dialogUpdate = true"
          >mdi-pencil</v-icon>
          <v-icon
            medium
            color="red"
            @click="deleteItem(item)"
            @click.stop="dialogDelete = true"
          >mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>

        <template v-slot:item.imageurl="{ item }">
          <img class="small-image" :src="item.imageurl" style="width: 25px; height:30px" />
        </template>
      </v-data-table>
    </v-col>
    <div>
      <v-snackbar
        v-model="snackbar"
        top
        right
        :color="snackbarColor"
        timeout="2000"
        rounded="pill"
        height="20"
      >
        {{snackbarText}}
        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
            <v-icon>close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
import CandidateService from "../services/CandidateService";
import Createstudent from "@/components/dialog/Createstudent.vue";
export default {
  components: {
    Createstudent
  },
  data: () => ({
    search: "",
    snackbarText: "",
    snackbarColor: "",
    snackbar: false,
    modal: false,
    delete_id: null,
    dialog: false,
    dialogcreate: false,
    dialogUpdate: false,
    dialogDelete: false,
    dialogView: false,
    gender: ["Male", "Female"],
    usertype: ["Ingénieure", "Technique", "Lecturer", "Guest"],
    department: ["None", "DTC", "GIM", "GIC", "GCI", "GTR", "GRU"],
    years: ["0", "1", "2", "3", "4", "5"],
    headers: [
      {
        text: "Image",
        align: "center",
        sortable: false,
        value: "imageurl"
      },
      {
        text: "Student_id",
        align: "start",
        sortable: true,
        value: "student_id"
      },
      { text: "name", value: "name" },
      { text: "Gender", value: "gender" },
      { text: "Phonenumber", value: "phone_number" },
      { text: "dob", value: "dob" },
      { text: "UserType", value: "usertype" },
      { text: "department", value: "department" },
      { text: "Option", value: "option" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    student_status: true,
    students: [],
    editedIndex: -1,
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 50) || "Name must be less than 50 characters"
    ],
    valid: false,
    validupdate: false,
    student_idrule: [v => !!v || "Student ID is required"],
    genderrule: [v => !!v || "Gender is required"],
    dobrule: [v => !!v || "Date of Birth is required"],
    phone_numberrule: [v => !!v || "Phonenumber is required"],
    usertyperule: [v => !!v || "User Type is required"],
    submit_edit_data: {
      student_id: "",
      name: "",
      gender: "",
      dob: "",
      phone_number: "",
      user_type: "",
      department: "",
      year_department: "",
      option: "",
      image: ""
    },
    viewData: {}
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Student" : "Edit Student";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  created() {
    this.initialize();
  },

  mounted() {
    this.get_students();
  },
  methods: {
    initialize() {
      this.get_students();
    },
    moment: function(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    get_students() {
      CandidateService.getAll()
        .then(response => {
          console.log(response);
          let i = 0;
          this.students = response.data.candidates;
          for (i in this.students) {
            this.students[i].dob = this.moment(this.students[i].dob);
            if (this.students[i].imageurl == null) {
              this.lastfivestudent[i].imageurl =
                "http://localhost:3000/uploads/guest.jpg";
            }
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
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
   
    create_student_success() {
       this.dialogcreate = false;
      this.snackbarText = "Create Success";
      this.snackbarColor = "green";
      this.snackbar = true;
      this.get_students();
    },
    validateeditform() {
      this.$refs.formupdate.validate();
    },
    editItem(item) {
      // console.log(item);
      // console.log(item.type._id);
      this.submit_edit_data = Object.assign({}, item);
      this.submit_edit_data.year_department =
        this.submit_edit_data.year_department + "";
      this.submit_edit_data.id = item.id;
    },
    viewItem(item) {
      // console.log(item);
      // console.log(item.type._id);
      this.viewData = Object.assign({}, item);
      console.log(this.viewData);
    },
    async edit_student() {
      if (this.submit_edit_data.usertype == "Ingénieure") {
        this.submit_edit_data.option =
          "I" +
          this.submit_edit_data.year_department +
          "-" +
          this.submit_edit_data.department;
      } else if (this.submit_edit_data.usertype == "Technique") {
        this.submit_edit_data.option =
          "T" +
          this.submit_edit_data.year_department +
          "-" +
          this.submit_edit_data.department;
      } else if (this.submit_edit_data.usertype == "Lecturer") {
        this.submit_edit_data.option = this.usertype;
      } else {
        this.submit_edit_data.option = "Guest";
      }

      await this.validateeditform();

      if (this.validupdate == true) {
        const formData = new FormData();
        formData.append("student_id", this.submit_edit_data.student_id);
        formData.append("name", this.submit_edit_data.name);
        formData.append("gender", this.submit_edit_data.gender);
        formData.append("dob", this.submit_edit_data.dob);
        formData.append("phone_number", this.submit_edit_data.phone_number);
        formData.append("usertype", this.submit_edit_data.usertype);
        formData.append(
          "year_department",
          this.submit_edit_data.year_department
        );
        formData.append("department", this.submit_edit_data.department);
        formData.append("option", this.submit_edit_data.option);
        formData.append("image", this.submit_edit_data.image);
        // console.log(formData);
        axios
          .put(
            `http://localhost:3000/candidate/${this.submit_edit_data.id}`,
            formData
          )
          .then(response => (this.info = response))
          .then(() => {
            if (this.info.statusText == "Created") {
              this.get_students();
              this.dialogUpdate = false;
              this.snackbarText = "Edit Success";
              this.snackbarColor = "green";
              this.snackbar = true;
            } else {
              alert("Create Student Error");
            }
          });
      }
    },
    deleteItem(item) {
      this.delete_id = item.id;
    },
    deleteItemConfirm() {
      if (this.delete_id != null) {
        axios
          .delete(`http://localhost:3000/candidate/${this.delete_id}`)
          .then(response => (this.info = response))
          .then(() => {
            if (this.info) {
              if (this.info.statusText == "OK") {
                this.get_students();
                this.snackbarText = "Delete Success";
                this.snackbarColor = "green";
                this.snackbar = true;
              } else {
                alert("Delete Student Error");
              }
            }
          });
        this.dialogDelete = false;
      }
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