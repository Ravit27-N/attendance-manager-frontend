<template>
  <div>
    <div class="alert-contain"></div>
    <div class="select_date mt-10">
      <div>
        <v-btn depressed color="primary">From</v-btn>
      </div>
      <v-col cols="12" sm="6" md="4" class="mt-8">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="start_date"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="start_date"
              label="Picker Start Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              solo
            ></v-text-field>
          </template>
          <v-date-picker v-model="start_date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(start_date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <div>
        <v-btn depressed color="primary">To</v-btn>
      </div>
      <v-col cols="12" sm="6" md="4" class="mt-8">
        <v-menu
          ref="menu2"
          v-model="menu2"
          :close-on-content-click="false"
          :return-value.sync="end_date"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="end_date"
              label="Picker End Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              solo
            ></v-text-field>
          </template>
          <v-date-picker v-model="end_date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu2.save(end_date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
    </div>
    <div class="row2">
      <v-btn depressed class="mr-5" color="primary" @click="getdata">
        Get Data
        <v-icon right dark>mdi-share</v-icon>
      </v-btn>
      <v-btn depressed color="primary" @click="exportexcel">
        Export Excel
        <v-icon right dark>mdi-file-download</v-icon>
      </v-btn>
    </div>
    <div class="row3 mx-10 my-10">
      <v-card>
        <v-card-title>
          Attendances
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="students" :search="search">
          <template v-slot:item.imageurl="{ item }">
            <img class="small-image" :src="item.imageurl" style="width: 25px; height:30px" />
          </template>
        </v-data-table>
      </v-card>
    </div>
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
import { excelParser } from "../plugins/excel-parser";
import moment from "moment";
export default {
  data: () => ({
    start_date: null,
    snackbarText: "",
    snackbarColor: "",
    snackbar: false,
    end_date: null,
    menu: false,
    menu2: false,
    search: "",
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
      { text: "Name", value: "name" },
      { text: "Gender", value: "gender" },
      { text: "Option", value: "option" },
      { text: "Join Time", value: "created" }
    ],
    students: []
  }),
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    }
  },
  mounted() {
    this.settoday();
  },
  methods: {
    settoday: function() {
      var currentTime = new Date();
      const convertTime = moment(currentTime).format("YYYY-MM-DD");

      this.start_date = convertTime;
      this.end_date = convertTime;
    },
    getattendance() {
      if (this.start_date < this.end_date) {
        var submit_data = {
          start_date: this.start_date,
          end_date: this.end_date
        };
        try {
          axios
            .post(`http://localhost:3000/report`, submit_data)
            .then(response => (this.info = response))
            .then(() => {
              if (this.info) {
                // console.log(this.info.data);
                this.students = this.info.data.data;
                console.log(this.students.created);
                let i = 0;
                for (i in this.students) {
                  this.students[i].created = moment(
                    this.students[i].created
                  ).format("DD/MM/YYYY h:mm a");
                }
                this.snackbarText = "List Success";
                this.snackbarColor = "green";
                this.snackbar = true;
              }
            });
        } catch (e) {
          console.log(e);
        }
      } else {
        alert("Start date cannot be greater than end date");
      }
    },
    getdata() {
      this.getattendance();
    },
    exportexcel() {
      if (this.students.length != 0) {
        excelParser().exportDataFromJSON(this.students, null, null);
        this.snackbarText = "Export Excel Success";
        this.snackbarColor = "green";
        this.snackbar = true;
      } else {
        this.snackbarText = "Please get data first";
        this.snackbarColor = "red";
        this.snackbar = true;
      }
    }
  }
};
</script>
<style scoped>
.select_date {
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  vertical-align: middle;
}
.row2 {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>