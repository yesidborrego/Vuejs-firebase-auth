<template>
  <div id="app" class="container text-left mt-5">
    <div id="nav" class="text-center">
      <router-link :to="{name: 'Index'}" v-if="userExist">Home | </router-link>
      <router-link :to="{name: 'Signup'}" v-if="!userExist">Signup | </router-link>
      <router-link :to="{name: 'Login'}" v-if="!userExist">Login</router-link>
      <a @click="logoutUser" v-if="userExist">Log Out</a>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  export default {
    name: 'App',
    computed: {
      ...mapGetters(['userExist'])
    },
    methods: {
      ...mapActions(['logoutUser'])
    }
  }
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>