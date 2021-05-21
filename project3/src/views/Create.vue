<template>
    <v-container class="text-center">
        <v-text-field v-model="job.name" filled placeholder="Name"></v-text-field>
        <v-text-field v-model="job.location" filled placeholder="Location"></v-text-field>
        <v-text-field v-model="job.salary" filled placeholder="Salary"></v-text-field>
        <v-textarea v-model="job.desc" filled placeholder="Description"></v-textarea>
        <v-btn @click="submit" :loading="loading" rounded color="primary" large>Submit</v-btn>
    </v-container>
</template>
<script>
export default {
    name: 'Create',
    data(){
        return {
            loading: false,
            job: {}
        }
    },
    methods: {
        async createJob(){
            const user = this.$firebase.auth().currentUser
            this.loading = true
            await this.$firebase.firestore().collection('jobs').add({
                ...this.job,
                contact: user.email,
                user_id: user.uid
            })
            this.$router.push({name: 'Home'})
            this.loading = false
        }
    },
    created(){
        this.$firebase.auth().onAuthStateChanged(user=>{
            if(!user)
                this.$router.push({name: 'Home'})
        })
    }
}
</script>