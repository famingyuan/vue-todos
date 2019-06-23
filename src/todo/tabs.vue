<template>
  <div class="helpers">
    <span class="lefts">{{unFinishedLen}} lefts</span>

    <span class="tabs">
      <span
        v-for="(state,index) in  states"
        :key="index"
        :class="['state-item',state,(state==filter?'actived':'')]"
        @click="toggleFilter(state)"
      >{{state}}</span>
    </span>

    <span class="clear-completed" @click="clearCompleted">clear completed</span>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: String,
      required: true
    },
    todos: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      states: ["active", "completed", "all"]
    };
  },
  computed: {
    unFinishedLen: function() {
      var len = 0;
      this.todos.forEach(item => {
        if (item.completed !== true) {
          len++;
        }
      });
      return len;
    }
  },
  methods: {
    toggleFilter: function(state) {
      this.$emit("toggleFilter", state);
    },
    clearCompleted: function() {
      this.$emit("clearAllCompleted");
    }
  }
};
</script>

<style lang="less" scoped>
.state-item {
  &.actived {
    color: red;
  }
}
</style>
