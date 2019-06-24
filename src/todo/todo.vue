<template>
  <section class="todo-wrapper">
    <input
      type="text"
      class="add-todo-input"
      value
      autofocus="true"
      autocomplete="false"
      placeholder="接下来要做什么呢2？"
      @keyup.enter="addTodo"
    >
    <template v-for="todo in filterTodos">
      <TodoItem :todo="todo" :key="todo.id" @removeTodo="removeTodo"></TodoItem>
    </template>

    <Tabs
      :filter="filter"
      :todos="todos"
      @clearAllCompleted="clearAllCompleted"
      @toggleFilter="toggleFilter"
    ></Tabs>
  </section>
</template>
<style lang="less" scoped>
.todo-wrapper {
  padding: 20px;
  background: #efefef;
  box-shadow: 0 0 3px 4px #f3f3f3;
  position: relative;
  z-index: 22;
  width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
}

.add-todo-input {
  height: 30px;
  line-height: 30px;
  padding-left: 15px;
  border: none;
  text-align: left;
  width: 100%;
}
</style>

<script>
import TodoItem from "./todo-item.vue";
import Tabs from "./tabs.vue";
let id = 0;
export default {
  components: {
    TodoItem: TodoItem,
    Tabs: Tabs
  },
  data() {
    return {
      todos: [],
      filter: "active"
    };
  },
  computed: {
    filterTodos: function() {
      if (this.filter === "all") {
        return this.todos;
      }
      var isCompleted = this.filter === "active";
      var filterTodos = this.todos.filter(item => {
        return item.completed != isCompleted;
      });
      console.log("filterTodos= ", filterTodos);
      return filterTodos;
    },
    
  },
  methods: {
    addTodo: function(e) {
      var content = e.target.value.replace(/\s/g, "");
      if (!content) {
        return;
      }
      this.todos.push({
        content: content,
        id: id++,
        completed: false
      });

      e.target.value = "";
    },
    clearAllCompleted: function() {
      console.log("will clearAllCompleted");
      this.todos = this.todos.filter(item => {
        return item.completed != true;
      });
    },
    toggleFilter: function(filter) {
      console.log("toggleFilter");
      console.log(filter);
      this.filter = filter;
    },
    removeTodo: function(todo) {
      console.log("will remove todo --> " + todo.content);
      this.todos = this.todos.filter(item => {
        return item !== todo;
      });
    }
  }
};
</script>
