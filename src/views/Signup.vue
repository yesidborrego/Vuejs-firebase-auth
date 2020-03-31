<template>
  <div>
    <h1>User register</h1>
    <form @submit.prevent="createUser({email, password})">
      <input type="text" v-model="email">
      <input type="password" v-model="password">
      <input type="password" v-model="confirmPassword">
      <button type="submit" :disabled="!confirmed">Register</button>
    </form>
    <p v-text="error"></p>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  export default {
    name: 'Signup',
    data() {
      return {
        email: '',
        password: '',
        confirmPassword: ''
      }
    },
    computed: {
      ...mapState(['error']),
      confirmed() {
        return this.password === this.confirmPassword && this.password != ''
      }
    },
    methods: {
      ...mapActions(['createUser'])
    }
  }
</script>