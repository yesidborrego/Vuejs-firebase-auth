<template>
  <div>
    <h1>Login user</h1>
    <form @submit.prevent="loginUser(payload)">
      <input type="email" v-model="payload.email">
      <input type="password" v-model="payload.password">
      <button type="submit">Sign In</button>
    </form>
    <p v-text="error"></p>
  </div>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  export default {
    name: 'Login',
    data() {
      return {
        payload: {
          email: null,
          password: null
        }
      }
    },
    computed: {
      ...mapState(['error'])
    },
    methods: {
      ...mapActions(['loginUser'])
    }
  }
</script>