<template>
  <div>
    <apexchart height="300px" type="bar" :options="options" :series="series"></apexchart>
  </div>
</template>
<script>

export default {
  name:"yes",
   props: {
    series: [],
    options: [],
  
  }
}
</script>