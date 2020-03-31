import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase/app'
import router from '../router/index'
import dbFirestore from '../main'
import "firebase/auth";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // User
    user: null,
    error: null,
    // Task
    tasks: [],
    task: {},
  },
  mutations: {
    // User
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    // Task
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    setTask(state, task) {
      state.task = task;
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter( task => task.id != id);
    }
  },
  actions: {
    // User
    createUser({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then( res => {
          commit('setUser', { uid: res.user.uid, email: res.user.email });

          // Create collection
          dbFirestore.collection(res.user.email).add({
            name: 'Tareas de prueba'
          }).then( () => {
            router.push({name: 'Index'});
          })

          // router.push({name: 'Index'});
        })
        .catch( error => {
          commit('setError', error.message );
        })
    },
    loginUser({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then( res => {
          commit('setUser', { uid: res.user.uid, email: res.user.email });
          router.push({name: 'Index'});
        })
        .catch( error => {
          commit('setError', error.message );
        })
    },
    activatedUser({commit}, payload) {
      if(payload != null) {
        commit('setUser', { uid: payload.uid, email: payload.email})
      } else {
        commit('setUser', null)
      }
    },
    logoutUser({commit}) {
      firebase.auth().signOut()
      commit('setUser', null);
      router.push({name: 'Login'});
    },
    // Task
    getTasks({ commit }) {
      const { email } = firebase.auth().currentUser;
      if(email === null) return;
      let tasks = [];
      dbFirestore.collection(email).get()
        .then( snapShots => {
          snapShots.forEach( doc => {
            let task = doc.data();
            task.id = doc.id;
            tasks.push(task);
          })
        })
      commit('setTasks', tasks);
    },
    getTask({ commit }, id) {
      const { email } = firebase.auth().currentUser;
      dbFirestore.collection(email).doc(id).get()
        .then( doc => {
          let task = doc.data();
          task.id = doc.id;
          commit('setTask', task);
        })
    },
    updateTask({commit}, task) {
      const { email } = firebase.auth().currentUser;
      dbFirestore.collection(email).doc(task.id).update({
        name: task.name
      })
        .then( () => {
          router.push('/')
        })
    },
    createTask({commit}, name) {
      const { email } = firebase.auth().currentUser;
      dbFirestore.collection(email).add({
        name
      })
        .then( () => {
          router.push('/');
        })
    },
    deleteTask({commit, dispatch}, id) {
      const { email } = firebase.auth().currentUser;
      dbFirestore.collection(email).doc(id).delete()
        .then( () => {
          // dispatch('getTasks'); // opción no recomendada
          commit('deleteTask', id);
        })
    }
  },
  getters: {
    userExist(state) {
      return (state.user === null || state.user === '' || state.user === undefined) ? false : true
    }
  },
  modules: {
  }
})
