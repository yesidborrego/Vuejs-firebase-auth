<template>
  <div>
    <h1>Login user</h1>
    <form @submit.prevent="loginUser(payload)" class="mb-4">
      <input type="email" v-model="$v.payload.email.$model" 
        placeholder="Insert your Email"
        :class="['form-control', {'is-invalid': $v.payload.email.$invalid}]">
      <small 
        class="text-danger d-block" 
        v-if="!$v.payload.email.required"
        v-text="'Email is required'">
      </small>
      <small 
        class="text-danger d-block" 
        v-if="!$v.payload.email.email"
        v-text="'Email is invalid'">
      </small>

      <input type="password" v-model="$v.payload.password.$model"
        placeholder="Insert your password"
        :class="['form-control mt-2', {'is-invalid': $v.payload.password.$invalid}]">
      <small 
        class="text-danger d-block" 
        v-if="!$v.payload.password.required"
        v-text="'Password is required'">
      </small>
      <small 
        class="text-danger d-block" 
        v-if="!$v.payload.password.minLength"
        v-text="`Password must have at least ${$v.payload.password.$params.minLength.min} characters`">
      </small>

      <button type="submit" class="btn btn-info mt-2" :disabled="$v.$invalid">Sign In</button>
    </form>
    <p 
      v-if="error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password'"
      v-text="'The email or password is incorrect'">
    </p>
  </div>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import { required, minLength, email } from 'vuelidate/lib/validators';
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
    },
    validations: {
      payload: {
        email: {
          required, 
          email
        },
        password: {
          required,
          minLength: minLength(6)
        }
      }
    }
  }
</script>