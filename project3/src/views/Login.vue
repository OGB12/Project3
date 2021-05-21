<template>
    <v-card>
        <v-card-title class="primary--text">
            <v-btn-toggle rounded> 
                <v-btn @click="isLogin = true" :color="isLogin ? 'primary' : ''">
                    Login
                </v-btn>
                <v-btn @click="isLogin = false" :color="!isLogin ? 'primary' : ''">
                    Sign Up
                </v-btn>
            </v-btn-toggle>
            <v-spacer/>
            <v-icon @click="$emit('close')">mdi-close</v-icon>
        </v-card-title>
        <v-alert type="error" v-if="error">
            {{error}}
        </v-alert>
        <v-card-text>
            <v-form @submit.prevent="authUser">    
                <v-text-field v-model="email" filled rounded label="Email" />
                <v-text-field v-model="password" filled rounded label="Password" />
                <v-text-field v-if="!isLogin" v-model="confirm_pass" filled rounded label="Confirm Password" />
                <v-btn :loading="loading" block color="primary" rounded large type="submit">{{authText}}</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    name: 'login',
    computed: {
        authText (){
            return this.isLogin ? 'Login' : 'Sign Up'
        }
    },
    data(){
        return {
            loading: false,
            isLogin: true,
            email: '',
            password: '',
            confirm_pass: '',
            error: ''
        }
    },
    methods: {
        async authUser(){
            try{
                this.error = ''
                this.loading = true
                this.isLogin ?
                    await this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                    :
                    await this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                this.loading = false
                this.$emit('close')
            }catch(err){
                this.loading = false
                this.error = err.message
            }
            
        }
    }
}
</script>