<template>
  <div>
    <h1 class="text-center">Tasks list</h1>
    <router-link to="/create">
      <button class="btn btn-success btn-block">Create Task</button>
    </router-link>

    <form @submit.prevent="searchText(textSearch)">
      <input type="text" class="form-control mt-3" placeholder="Search text..."
        v-model="textSearch" @keyup="searchText(textSearch)">
    </form>

    <div class="text-center mt-5" v-if="spinner">
      <h3>loading...</h3>
      <pulse-loader/>
      <!-- <clip-loader/> -->
    </div>
    <ul class="list-group mt-5" v-if="!spinner">
      <li class="list-group-item" 
        v-for="task of filterTasks" :key="task.id">
        {{ task.id }} - {{ task.name }}
        <div class="float-right">
          <router-link class="btn btn-warning btn-sm mr-2"
            :to="{
              name: 'Edit', 
              params: { 
                id: task.id
              }
            }">
            Edit
          </router-link>
          <button class="btn btn-danger btn-sm" @click="deleteTask(task.id)">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapActions, mapState, mapGetters } from "vuex";
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
  // import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
  export default {
   name: 'Index',
   components: {
     PulseLoader,
    //  ClipLoader,
   },
   data() {
     return {
       textSearch:''
     }
   },
   computed: {
     ...mapState(['user','tasks', 'spinner']),
     ...mapGetters(['filterTasks'])
   },
   created() {
      this.getTasks();
    },
    methods: {
      ...mapActions(['getTasks', 'deleteTask', 'searchText'])
    }
  }
</script>