<template>
  <div>
    <h1>Edit Task</h1>
    <form class="form-inline" @submit.prevent="updateTask(task)">
      <div class="input-group mb-2 mr-sm-2">
        <div class="input-group-prepend">
          <div class="input-group-text">Name</div>
        </div>
        <input type="text" class="form-control" v-model="$v.task.name.$model">
      </div>
      <button 
        type="submit" 
        class="btn btn-warning mb-2"
        :disabled="$v.$invalid"
      >
        Edit
      </button>
    </form>
    <small class="text-danger d-block" v-if="!$v.task.name.required">Name required</small>
    <small class="text-danger d-block" 
      v-if="!$v.task.name.minLength"
      v-text="`Name must have at least ${$v.task.name.$params.minLength.min} characters`">
    </small>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import { required, minLength } from 'vuelidate/lib/validators';
  export default {
    name: 'Edit',
    data() {
      return {
        id: this.$route.params.id,
      }
    },
    computed: {
      ...mapState(['task', 'spinner']),
    },
    created() {
      this.getTask(this.id);
    },
    methods: {
      ...mapActions(['getTask', 'updateTask'])
    },
    validations: {
      task: {
        name: {
          required,
          minLength: minLength(5),
        }
      }
    }
  }
</script>