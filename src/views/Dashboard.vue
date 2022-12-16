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
          <apexchart height="300px" type="bar" :options="options" :series="series"></apexchart>
        </div>
        <div class="row3 mx-10 my-10">
          <v-card>
            <v-card-title>
              Nutrition
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="desserts" :search="search"></v-data-table>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import DashCard from "@/components/DashCard.vue";

export default {
  components: {
    DashCard
  },
  data: () => ({
    options: {
      chart: {
        id: "barchart-month"
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ]
      }
    },
    series: [
      {
        name: "Student",
        color: "#0062E0",
        data: [55, 62, 89, 66, 98, 72, 101, 75, 94, 120, 117, 139]
      }
    ],
    search: "",
    headers: [
      {
        text: "Student_id",
        align: "start",
        sortable: true,
        value: "student_id",
      },
      { text: "Name", value: "name" },
      { text: "Gender", value: "gender" },
      { text: "Department", value: "year_dept" },
      { text: "Join Time", value: "created" }
    ],
    desserts: [
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
        year_dept: "I5GIC",
        created: "6:00 pm"
      },
      {
        student_id: "e20180328",
        name: "Hun Ravit",
        gender: "Male",
        year_dept: "I5GIC",
        created: "5:00 pm"
      },
    ]
  }),
  methods: {
    btnClick() {
      alert(this.getinput);
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

</style>