<template>
  <div>
    <h1>User register</h1>
    <form @submit.prevent="createUser({
        email: $v.email.$model, 
        password: $v.password.$model
    })">
      <input type="text" v-model="$v.email.$model" 
        :class="['form-control',{'is-invalid': !$v.email.required}]">
      <small class="text-danger" 
        v-if="!$v.email.required"
        v-text="'Email is required'"></small>
      <small class="text-danger" 
        v-if="!$v.email.email"
        v-text="'Email is invalid'"></small>

      <input type="password" v-model="$v.password.$model" 
        :class="['form-control mt-2',{'is-invalid': !$v.password.required}]">
      <small class="text-danger" 
        v-if="!$v.password.required"
        v-text="'Password is required'"></small>
      <small class="text-danger" 
        v-if="!$v.password.minLength"
        v-text="`Password must have at least ${$v.password.$params.minLength.min} characters`"></small>

      <input type="password" v-model="$v.confirmPassword.$model" 
        :class="['form-control mt-2',{'is-invalid': !$v.confirmPassword.sameAsPassword}]">
      <small v-text="'Password must be identical'" v-if="!$v.confirmPassword.sameAsPassword" class="text-danger d-block"></small>

      <button type="submit" class="btn btn-info my-2" :disabled="!confirmed">Register</button>
    </form>
    <p class="text-danger"
      v-if="error.code === 'auth/email-already-in-use'"
      v-text="'The email is already in use'">
    </p>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';
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
    },
    validations:{
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      },
      confirmPassword: {
        sameAsPassword: sameAs('password')
      }
    }
  }
</script>