<template>
  <div class="container-page">
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <div class="row1 mt-10">
          <DashCard title="Today" :number="totaltoday" picture_name="day-icon.png" />
          <DashCard title="Week" :number="totalweek" picture_name="week-icon.png" />
          <DashCard title="Month" :number="totalmonth" picture_name="month-icon.png" />
          <DashCard title="Year" :number="totalyear"  picture_name="year-icon.png" />
        </div>
        <div class="d-flex mx-10 mt-10">
          <v-col class="d-flex " cols="12" sm="2">
            Select chart theme here:
          </v-col>
          <v-col class="d-flex" cols="12" sm="2">
            <v-select :items="items" label="Outlined style" v-model="themechart" solo @change="updateTheme"></v-select>
          </v-col>
        </div>
        <div class="row2 barchart-group">
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
import AttendanceService from "../services/AttendanceService";

export default {
  components: {
    DashCard
  },
  data: () => ({
    totaltoday:0,
    totalweel:0,
    totalmonth:0,
    totalyear:0,
    themechart:"palette1",
    items:["palette1","palette2","palette3","palette4","palette5","palette6","palette7","palette8","palette9"],
    testKey: 1,
    options_bar: {
      chart: {
        id: "barchart-month",
        animations: {
          speed: 200
        },
        type: "bar",
        events: {}
      },
      theme: {
        mode: "light",
        palette: "palette1",
        monochrome: {
          enabled: false,
          color: "#255aee",
          shadeTo: "light",
          shadeIntensity: 0.65
        }
      },
      title: {
        text: "Daily Attendance",
        align: "center",
        style: {
          fontSize: "20px"
        }
      },
      plotOptions: {
        bar: {
          distributed: true
        }
      },
      xaxis: {
        categories: ["GIM", "GIC", "Test"],
        labels: {
          style: {
            fontSize: "1rem"
          }
        }
      }
    },
    series_bar: [
      {
        name: "Student",
        data: [5, 8, 9]
      }
    ],
    series_pei: [],
    options_pei: {
      chart: {
        width: 380,
        type: "pie"
      },
      theme: {
        mode: "light",
        palette: "palette1",
        monochrome: {
          enabled: false,
          color: "#255aee",
          shadeTo: "light",
          shadeIntensity: 0.65
        }
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
    this.get_count_attendance();
  },
  methods: {
    updateTheme() {
      this.options_bar = {
        theme: {
          palette: this.themechart
        }
      };
      this.options_pei = {
        theme: {
          palette: this.themechart
        }
      };
    },
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
    get_count_attendance() {
      AttendanceService.getcountattendance()
        .then(response => {
          this.totaltoday=response.data.today;
          this.totalweek=response.data.week;
          this.totalmonth=response.data.month;
          this.totalyear=response.data.year;
          console.log(response);
        })
        .catch(e => {
          console.log(e);
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