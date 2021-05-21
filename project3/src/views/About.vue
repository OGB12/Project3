<template>
  <v-container v-if="job" class="about">
    <h1 class="text-center">{{job.name}}</h1>
    <p class="text-center"><v-icon left>mdi-google-maps</v-icon>{{job.location}}</p>
    <div class="text-center my-12">
      <h3>Description</h3>
      <p>{{job.desc}}</p>
    </div>
    <div class="text-center">
      <a :href="`mailto:${job.contact}`">
        <v-btn color="primary">Apply <v-icon right>mdi-check</v-icon></v-btn>
      </a>
    </div>
  </v-container>
</template>
<script>
export default {
  name: "About",
  data(){
    return {
      job: null
    }
  },
  async created(){
    const index = this.$route.params.index
    const doc = await this.$firebase.firestore().collection('jobs').doc(index).get()
    this.job = {id: doc.id, ...doc.data()}
  }
}
</script>
