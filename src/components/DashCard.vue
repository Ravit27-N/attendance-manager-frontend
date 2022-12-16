<template>

  <v-card
    class="mx-auto rounded-lg card-number"
    width="270"
    max-width="344"
    outlined
    color="#0062E0"
    align="center"
    justify-content="center"
  >
    <v-list-item three-line>
      <img :src="require(`@/assets/${picture_name}`)" align="center" class="ml-4" alt width="80" />

      <v-list-item-content>
        <v-list-item-title class="cardtitle text-h4 text-bold mb-1 mx-1 font-weight-bold">
          <p class="text-h5 font-weight-bold">{{ title }}</p>{{ number }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script>

export default {
  name:"yes",
   props: {
    title: String,
    number: Number,
    picture_name:String
  }
}
</script>
<style scoped>
.cardtitle {
  color: white;
}
</style>