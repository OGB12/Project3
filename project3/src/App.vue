<template>
  <v-app>
    <v-app-bar app dark color="primary" >
      <v-app-bar-title>
        JobsGH
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn :to="{name: 'Home'}" exact text depressed>
        Jobs
      </v-btn>
      <v-btn v-if="!user" @click="login" text depressed>
        Login / Register
      </v-btn>
      <v-btn :to="{name: 'Create'}" v-else text depressed>
        Create Jobs
      </v-btn>
      <v-btn v-if="user" @click="$firebase.auth().signOut()" text depressed>
        Logout
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
    <v-dialog v-model="openAuth" max-width="320" content-class="rounded-xl">
      <Login @close="openAuth = false"/>
    </v-dialog>
  </v-app>
</template>

<script>
import Login from './views/Login.vue'
export default {
  name: 'App',
  components: {Login},
  data: () => ({
    openAuth: false,
    user: null
  }),
  methods: {
    login(){
      this.openAuth = true
    }
  },

  created(){
    this.$firebase.auth().onAuthStateChanged(user=>{
      console.log({user});
        this.user = user
    })
  }
};
</script>
