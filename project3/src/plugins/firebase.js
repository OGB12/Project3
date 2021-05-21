import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export default {
    install(Vue, options){
        var firebaseConfig = {
            apiKey: "AIzaSyAU5uDXv4ML_qCnUINYI6p50WWMfGfsSEk",
            authDomain: "project-3-375e4.firebaseapp.com",
            projectId: "project-3-375e4",
            storageBucket: "project-3-375e4.appspot.com",
            messagingSenderId: "678465693513",
            appId: "1:678465693513:web:00d22bb84df5b5cd545c98"
          }
          
          firebase.initializeApp(firebaseConfig)
          Vue.prototype.$firebase = firebase
    }
}