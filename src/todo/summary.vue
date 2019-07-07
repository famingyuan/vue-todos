<template>
  <div class="helpers">
    <span class="lefts">{{ unFinishedLen }} lefts</span>
    <span
      class="clear-completed"
      @click="clearCompleted"
    >clear completed</span>
  </div>
</template>


<style lang="less" scoped>
.helpers{
    padding-top: 30px;
    display: flex;
    justify-content: space-between;
    .clear-completed{
        cursor: pointer;
        &:hover{
            color:red;
        }
    }
}
</style>

<script>
export default {
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
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
    clearCompleted: function() {
      this.$emit("clearAllCompleted");
    }
  }
};
</script>