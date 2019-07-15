<template>
  <div :class="['todo-item',todo.completed?'completed':'']">
    <input
      v-model="todo.completed"
      type="checkbox"
      class="toggle"
    >
    <label>{{ todo.content }}</label>
    <button
      class="delete-todo"
      @click="removeTodo"
    >
      delete
    </button>
  </div>
</template>
<style lang="less" scoped>
.todo-item {
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #f3f3f3;
  height: 50px;
  line-height: 50px;
  * {
    vertical-align: middle;
  }
  .label {
    color: #000;
  }
  .delete-todo {
    display: inline-block;
    appearance: none;
    padding: 5px;
    line-height: 1.5;
    background: #f7f7f7;
    cursor: pointer;
    border: 1px solid #f3f3f3;
  }
  &.completed {
    color: #999;
  }
}
</style>

<script>
export default {
    props: {
        todo: {
            required: true,
            type: Object
        }
    },
    methods: {
        removeTodo: function () {
            this.$emit('removeTodo', this.todo);
        }
    }
};
</script>
