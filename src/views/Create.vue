<template>
  <div>
    <h1>Create New Task</h1>
    <form class="form-inline" @submit.prevent="createTask($v.name.$model)">
      <div class="input-group mb-2 mr-sm-2">
        <div class="input-group-prepend">
          <div class="input-group-text">Name</div>
        </div>
        <input type="text" class="form-control" v-model="$v.name.$model">
      </div>
      <button 
        type="submit" 
        class="btn btn-primary mb-2" 
        :disabled="$v.$invalid || spinner"
        >
        Add Task
      </button>
    </form>
    <small class="text-danger d-block" v-if="!$v.name.required">Name required</small>
    <small class="text-danger d-block" 
      v-if="!$v.name.minLength"
      v-text="`Name must have at least ${$v.name.$params.minLength.min} characters`">
    </small>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import { required, minLength } from 'vuelidate/lib/validators';
  export default {
    name: 'Add',
    data() {
      return {
        name: ''
      }
    },
    computed: {
      ...mapState(['spinner'])
    },
    methods: {
      ...mapActions(['createTask'])
    },
    validations: {
      name: {
        required,
        minLength: minLength(5),
      }
    }
  }
</script>