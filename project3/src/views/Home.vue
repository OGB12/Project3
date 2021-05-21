<template>
  <v-container>
    <v-text-field
      v-model="job_filter"
      placeholder="Search Jobs"
      filled
      append-icon="mdi-magnify"
    ></v-text-field>
    <v-row justify="center">
      <v-progress-circular indeterminate color="primary" v-if="loading"/>
      <v-col v-for="(job, index) in filteredJobs" :key="index" cols="12" sm="6" md="4">
        <v-card color="primary" dark @click="$router.push({name: 'About', params: {index: job.id}})">
          <v-card-title>
            <v-col cols="12">
              <v-row justify="space-between" no-gutters>
                <v-col cols="9">
                  {{job.name}}
                </v-col>
                <v-btn @click.stop="deleteJob(job)" v-if="user_id === job.user_id" icon color="warning"><v-icon>mdi-delete</v-icon></v-btn>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-icon>mdi-google-maps</v-icon>
              <span class="body-1">
                {{job.location}}
              </span>
            </v-col>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',
    computed: {
      filteredJobs(){
        return this.jobs.filter((job)=>{
          return job.name.toLowerCase().includes(this.job_filter.toLowerCase())
        })
      }
    },
    data(){
      return {
        jobs: [],
        job_filter: '',
        loading: false,
        user_id: null
      }
    },
    methods: {
      async deleteJob(job){
        await this.$firebase.firestore().collection("jobs").doc(job.id).delete()
        await this.getJobs()
      },
      getJobs(){
        this.loading = true
        this.$firebase.firestore().collection("jobs").get()
        .then((querySnapshot) => {
            this.jobs = []
            querySnapshot.forEach((doc) => {
              this.jobs.push({id: doc.id, ...doc.data()})
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        }).finally(()=>{
          this.loading = false
        })
      }
    },
    created(){
      this.$firebase.auth().onAuthStateChanged(user=>{
        if(user){
          this.user_id = user.uid
        }else{
          this.user_id = null
        }
        this.getJobs()
      })
    }
  }
</script>
