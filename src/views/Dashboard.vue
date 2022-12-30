<template>
  <div class="container-page">
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <div class="row1 mt-10">
          <DashCard title="Today" number="120" picture_name="day-icon.png" />
          <DashCard title="Week" number="750" picture_name="week-icon.png" />
          <DashCard title="Month" number="3005" picture_name="month-icon.png" />
          <DashCard title="Year" number="1120" picture_name="year-icon.png" />
        </div>
        <div class="row2 barchart-group mx-10 mt-10">
          <apexchart
            height="300px"
            class="barchart"
            type="bar"
            :options="options_bar"
            :series="series_bar"
            ref="myChart"
          ></apexchart>

          <apexchart
            type="pie"
            class="peichart"
            height="300px"
            :options="options_pei"
            :series="series_pei"
            ref="myChart2"
          ></apexchart>
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
      </v-col>
    </v-row>
  </div>
</template>
<script>
import DashCard from "@/components/DashCard.vue";
import axios from "axios";
import moment from "moment";

export default {
  components: {
    DashCard
  },
  data: () => ({
    testKey: 1,
    options_bar: {
      chart: {
        id: "barchart-month",
        type: "bar",
        events: {}
      },
      title: {
        text: "Daily Attendance",
        align: "center",
        style: {
          fontSize: "20px"
        }
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: ["#F44336", "#C9F400", "#9C27B0"],
            fontSize: "1rem"
          }
        }
      }
    },
    series_bar: [
      {
        name: "Student",
        data: []
      }
    ],
    series_pei: [],
    options_pei: {
      chart: {
        width: 380,
        type: "pie"
      },
      title: {
        text: "Daily Attendance",
        align: "center",
        style: {
          fontSize: "20px"
        }
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    },
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
    students: [
      {
        student_id: "e20180328",
        name: "Hun Ravit",
        gender: "Male",
        year_dept: "I5GIC",
        created: "8:00 pm"
      },
      {
        student_id: "e20180328",
        name: "Hun Ravit",
        gender: "Male",
        year_dept: "I5GIC",
        created: "7:00 pm"
      },
      {
        student_id: "e20180328",
        name: "Hun Ravit",
        gender: "Male",
        year_dept: "GIM",
        created: "6:00 pm"
      },
      {
        student_id: "e20180328",
        name: "Hun Ravit",
        gender: "Male",
        year_dept: "I5GIC",
        created: "5:00 pm"
      }
    ],
    data: []
  }),
  mounted() {
    this.getattendance();
    this.getdailyattendance();
  },
  methods: {
    moment: function(date) {
      return moment(date).format("DD/MM/YYYY h:mm a");
    },
    getattendance() {
      axios
        .get(`http://localhost:3000/attendance`)
        .then(response => (this.info = response))
        .then(() => {
          if (this.info) {
            // console.log(this.info.data.attendances);
            this.students = this.info.data.attendances;
            let i = 0;
            for (i in this.students) {
              this.students[i].created = this.moment(this.students[i].created);
            }
          }
        });
    },
    getdailyattendance() {
      axios
        .get(`http://localhost:3000/chart/today`)
        .then(response => (this.info = response))
        .then(() => {
          if (this.info) {
            let i = 0;
            // console.log(this.info.data.data);
            let getdata = this.info.data.data;
            let categories = [];
            let data = [];
            for (i in getdata) {
              if (getdata[i].count != 0) {
                categories[i] = getdata[i].category;
                data[i] = getdata[i].count;
              }
            }

            this.options_bar.xaxis.categories = categories;
            this.series_bar[0].data = data;

            this.options_pei.labels = categories;
            this.series_pei = data;

            this.$refs.myChart.refresh();
            this.$refs.myChart2.refresh();
          }
        });
    }
  }
};
</script>
<style scoped>
.test {
  background-color: red;
}
.row1 {
  width: 100%;
  display: flex;
  justify-content: center;
}
.cardtitle {
  color: white;
}
.row2 {
  display: flex;
  justify-content: center;
}
chart {
  width: "100%";
}
.row2 .barchart {
  width: 70%;
}
.row2 .peichart {
  width: 30%;
}
</style>