<template>
  <div>
    <div class="alert-contain"></div>
    <div class="type">
      <v-col cols="12" sm="8" class="test">
        <v-select
          class="select-input"
          :items="items"
          v-model="selectOption"
          label="Data Type Barchart"
          solo
        ></v-select>
      </v-col>
      <v-col cols="12" sm="2">
        <v-select
          class="select-input"
          :items="templateitems"
          label="Chart Template"
          v-model="themechart"
          solo
          @change="updateTheme"
        ></v-select>
      </v-col>
    </div>
    <div class="select_date">
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
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
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
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu2.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
    </div>
    <div class="row2">
      <v-btn depressed class="mr-5" color="primary" @click="getdata">
        Get Data
        <v-icon right dark>mdi-share</v-icon>
      </v-btn>
    </div>
    <div class="row3 barchart-group mx-10 mt-10">
      <apexchart
        height="300px"
        class="barchart"
        type="bar"
        :options="options_bar"
        :series="series_bar"
        ref="myChart"
      ></apexchart>

      <!-- <apexchart
            type="pie"
            class="peichart"
            height="300px"
            :options="options_pei"
            :series="series_pei"
            ref="myChart2"
      ></apexchart>-->
    </div>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
export default {
  data: () => ({
    start_date: null,
    items: ["Department", "Daily", "Monthly"],
    templateitems: [
      "palette1",
      "palette2",
      "palette3",
      "palette4",
      "palette5",
      "palette6",
      "palette7",
      "palette8",
      "palette9"
    ],
    selectOption: "Department",
    end_date: null,
    menu: false,
    menu2: false,
    search: "",
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
        data: []
      }
    ]
  }),
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    }
  },
  mounted() {
    // this.settoday();
    // this.getattendance();
  },
  methods: {
    updateTheme() {
      this.options_bar = {
        theme: {
          palette: this.themechart
        }
      };
    },
    settoday: function() {
      var currentTime = new Date();
      const convertTime = moment(currentTime).format("YYYY-MM-DD");

      this.start_date = convertTime;
      this.end_date = convertTime;
    },
    getAttendanceDepartment() {
      var submit_data = {
        start_date: this.start_date,
        end_date: this.end_date
      };
      axios
        .post(`http://localhost:3000/chart/department`, submit_data)
        .then(response => (this.info = response))
        .then(() => {
          if (this.info) {
            console.log(this.info.data);
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

            this.$refs.myChart.refresh();
          }
        });
    },
    getAttendanceDaily() {
      var submit_data = {
        start_date: this.start_date,
        end_date: this.end_date
      };
      axios
        .post(`http://localhost:3000/chart/daily`, submit_data)
        .then(response => (this.info = response))
        .then(() => {
          if (this.info) {
            //  console.log(this.info.data);
            let i = 0;
            // console.log(this.info.data.data);
            let getdata = this.info.data.data;
            let categories = [];
            let data = [];
            for (i in getdata) {
              if (getdata[i].count != 0) {
                categories[i] = moment(getdata[i].category).format(
                  "YYYY-MM-DD"
                );
                data[i] = getdata[i].count;
              }
            }

            this.options_bar.xaxis.categories = categories;
            this.series_bar[0].data = data;

            this.$refs.myChart.refresh();
          }
        });
    },
    getAttendanceMonthly() {
      var submit_data = {
        start_date: this.start_date,
        end_date: this.end_date
      };
      axios
        .post(`http://localhost:3000/chart/monthly`, submit_data)
        .then(response => (this.info = response))
        .then(() => {
          if (this.info) {
            //  console.log(this.info.data);
            let i = 0;
            // console.log(this.info.data.data);
            let getdata = this.info.data.data;
            let categories = [];
            let data = [];
            for (i in getdata) {
              if (getdata[i].count != 0) {
                categories[i] = moment(getdata[i].category).format("YYYY-MM");
                data[i] = getdata[i].count;
              }
            }

            this.options_bar.xaxis.categories = categories;
            this.series_bar[0].data = data;

            this.$refs.myChart.refresh();
          }
        });
    },
    getdata() {
      if (this.selectOption == "Department") {
        // alert("Select Department");
        this.getAttendanceDepartment();
      } else if (this.selectOption == "Daily") {
        // alert("Select dialy");
        this.getAttendanceDaily();
      } else {
        this.getAttendanceMonthly();
      }
      this.getattendance();
    }
  }
};
</script>
<style scoped>
.type {
  width: 100%;
  background: #0062e0;
  display: flex;
  justify-content: center;
  margin-bottom: -0.5rem;
}

.select-input {
  margin-top: 3rem;
  margin-bottom: -1.4rem;
}
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