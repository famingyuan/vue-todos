<template>
  <div :class="['todo-item',todo.completed?'completed':'']">
    <input type="checkbox" class="toggle" v-model="todo.completed">
    <label>{{todo.content}}</label>
    <button class="delete-todo" @click="removeTodo">delete</button>
  </div>
</template>
<style lang="less" scoped>
.todo-item {
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #f3f3f3;
  .label {
    color: #000;
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
  methods:{
      removeTodo:function(){
        this.$emit('removeTodo',this.todo);   
      }
  }
};
</script>