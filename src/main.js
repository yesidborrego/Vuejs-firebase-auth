import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Add the Firebase services that you want to use
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

// Add Bootstrap-vue
import { BootstrapVue } from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false


const firebaseConfig = {
  apiKey: "AIzaSyD0wzGV0G4utqu_TaSSP-zJUU0BlH2tIZ0",
  authDomain: "vuejs-firebase-auth-30acd.firebaseapp.com",
  databaseURL: "https://vuejs-firebase-auth-30acd.firebaseio.com",
  projectId: "vuejs-firebase-auth-30acd",
  storageBucket: "vuejs-firebase-auth-30acd.appspot.com",
  messagingSenderId: "571676385154",
  appId: "1:571676385154:web:e77b286e0a03b7007e399b"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({});
export default firebaseApp.firestore();

// Verifica si hay un usuario registrado
firebase.auth().onAuthStateChanged( user => {
  let userData = null;
  if (user) userData = { uid: user.uid, email: user.email };
  store.dispatch('activatedUser', userData);
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
});


