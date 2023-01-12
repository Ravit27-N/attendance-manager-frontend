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
                  <span class="text-h5 header-dialog" >{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row class="mt-2">
                      <v-col cols="12" sm="6" md="6" class="input-data">
                        <v-text-field
                          v-model="submit_data.student_id"
                          label="Id"
                          placeholder="Enter id"
                          outlined
                          clearable
                          required
                        >Id</v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="input-data">
                        <v-text-field
                          v-model="submit_data.name"
                          label="Name"
                          placeholder="Enter name"
                          outlined
                          clearable
                          required
                        >Name</v-text-field>
                      </v-col>
                      <v-col class="d-flex input-data" cols="12" sm="6">
                        <v-select
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
                          placeholder="Enter name"
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
                              label="Picker Date of Birth"
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
                          v-model="submit_data.usertype"
                          outlined
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" class="input-data">
                        <v-select
                          :items="department"
                          label="Department"
                          v-model="submit_data.department"
                          outlined
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" class="input-data">
                        <v-select
                          :items="years"
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
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialogcreate = false">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="create_students">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialogUpdate" max-width="600px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Edit Student</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row class="mt-2">
                      <v-col cols="12" sm="6" md="6" class="input-data">
                        <v-text-field
                          v-model="submit_edit_data.student_id"
                          label="Id"
                          placeholder="Enter id"
                          outlined
                          clearable
                          required
                        >Id</v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="input-data">
                        <v-text-field
                          v-model="submit_edit_data.name"
                          label="Name"
                          placeholder="Enter name"
                          outlined
                          clearable
                          required
                        >Name</v-text-field>
                      </v-col>
                      <v-col class="d-flex input-data" cols="12" sm="6">
                        <v-select
                          :items="gender"
                          v-model="submit_edit_data.gender"
                          label="gender"
                          outlined
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="input-data">
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
                        <v-text-field
                          v-model="submit_edit_data.department"
                          label="department"
                          placeholder=" GIC"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" class="input-data">
                        <v-text-field
                          v-model="submit_edit_data.year_department"
                          label="year_department"
                          placeholder=" GIC5"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" class="input-data">
                        <v-text-field
                          v-model="submit_edit_data.option"
                          label="option"
                          placeholder=" _GIC"
                          outlined
                        ></v-text-field>
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
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
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
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";

export default {
  data: () => ({
    search: "",
    modal: false,
    delete_id: null,
    dialog: false,
    dialogcreate: false,
    dialogUpdate: false,
    dialogDelete: false,
    gender: ["Male", "Female"],
    usertype: ["Ingénieure", "Technique", "Lecturer","Guest"],
    department: ["DTC", "GIM", "GIC","GCI","GTR","GRU"],
    years:["0","1","2","3","4","5"],
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
      { text: "dob", value: "dob" },
      { text: "province", value: "province" },
      { text: "year_dept", value: "year_department" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    students: [],
    editedIndex: -1,
    submit_data: {
      student_id: "",
      name: "",
      gender: "",
      dob: "",
      phone_number:"",
      usertype:"",
      department: "",
      year_department: "0",
      option: "",
      image: ""
    },
    submit_edit_data: {
      student_id: "",
      name: "",
      gender: "",
      dob: "",
      phone_number:"",
      user_type:"",
      department: "",
      year_department: "",
      option: "",
      image: ""
    }
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
    moment: function(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    get_students() {
      axios
        .get(`http://localhost:3000/student`)
        .then(response => (this.info = response))
        .then(() => {
          if (this.info) {
            let i = 0;
            console.log(this.info.data);
            this.students = this.info.data.student;
            for (i in this.students) {
              this.students[i].dob = this.moment(this.students[i].dob);
              if (this.students[i].imageurl == null) {
                this.lastfivestudent[i].imageurl =
                  "http://localhost:3000/uploads/guest.jpg";
              }
            }
          }
        });
    },
    create_students() {
      // const formData = new FormData();

      if(this.submit_data.usertype=="Ingénieure"){
        this.submit_data.option= "I"+this.submit_data.year_department+"-"+this.submit_data.department;
      }else if(this.submit_data.usertype=="Technique"){
        this.submit_data.option= "T"+this.submit_data.year_department+"-"+this.submit_data.department;
      }else if(this.submit_data.usertype=="Lecturer"){
        this.submit_data.option = this.usertype;
      }else{
        this.submit_data.option = "Guest";
      }
      
      console.log(this.submit_data);

      // formData.append("student_id", this.submit_data.student_id);
      // formData.append("name", this.submit_data.name);
      // formData.append("gender", this.submit_data.gender);
      // formData.append("dob", this.submit_data.dob);
      // formData.append("province", this.submit_data.province);
      // formData.append("year_department", this.submit_data.year_department);
      // formData.append("department", this.submit_data.department);
      // formData.append("option", this.submit_data.option);
      // formData.append("image", this.submit_data.image);
     
      // axios
      //   .post(`http://localhost:3000/student`, formData)
      //   .then(response => (this.info = response))
      //   .then(() => {
      //     if (this.info.statusText == "Created") {
      //       this.dialogcreate = false;
      //       this.get_students();
      //     } else {
      //       alert("Create Student Error");
      //     }
      //   });
    },
    editItem(item) {
      // console.log(item);
      // console.log(item.type._id);

      this.submit_edit_data = Object.assign({}, item);
      this.submit_edit_data.id = item.id;
    },
    edit_student() {
      const formData = new FormData();
      formData.append("student_id", this.submit_edit_data.student_id);
      formData.append("name", this.submit_edit_data.name);
      formData.append("gender", this.submit_edit_data.gender);
      formData.append("dob", this.submit_edit_data.dob);
      formData.append("province", this.submit_edit_data.province);
      formData.append("year_department", this.submit_edit_data.year_department);
      formData.append("department", this.submit_edit_data.department);
      formData.append("option", this.submit_edit_data.option);
      formData.append("image", this.submit_edit_data.image);
      console.log(formData);
      axios
        .put(
          `http://localhost:3000/student/${this.submit_edit_data.id}`,
          formData
        )
        .then(response => (this.info = response))
        .then(() => {
          if (this.info.statusText == "Created") {
            this.get_students();
            this.dialogUpdate = false;
          } else {
            alert("Create Student Error");
          }
        });
    },
    deleteItem(item) {
      this.delete_id = item.id;
    },
    deleteItemConfirm() {
      if (this.delete_id != null) {
        axios
          .delete(`http://localhost:3000/student/${this.delete_id}`)
          .then(response => (this.info = response))
          .then(() => {
            if (this.info) {
              if (this.info.statusText == "OK") {
                this.get_students();
                alert("Delete Success");
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
.header-dialog{
  font-weight: 600;
  color: #0062e0;;
}
</style>