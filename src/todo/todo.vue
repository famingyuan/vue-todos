<template>
  <section class="todo-wrapper">
    <Tabs
      :filter="filter"
      @toggleFilter="toggleFilter"
    />

    <input
      type="text"
      class="add-todo-input"
      value
      autofocus="true"
      autocomplete="false"
      placeholder="接下来要做什么呢？"
      @keyup.enter="addTodo"
    >
    <template v-for="todo in filterTodos">
      <TodoItem
        :key="todo.id"
        :todo="todo"
        @removeTodo="removeTodo"
      />
    </template>

    <Summary
      :todos="todos"
      @clearAllCompleted="clearAllCompleted"
    />
  </section>
</template>
<style lang="less" scoped>
.todo-wrapper {
  padding: 20px;
  background: #efefef;
  position: relative;
  z-index: 22;
  width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
}

.add-todo-input {
  height: 50;
  line-height: 50px;
  padding-left: 15px;
  border: none;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
  margin:20px 0;
  font-size: 16px;
}
</style>

<script>
import TodoItem from './todo-item.vue'
import Tabs from './tabs.vue'
import Summary from './summary.vue'
let id = 0
export default {
    components: {
        TodoItem: TodoItem,
        Tabs: Tabs,
        Summary: Summary
    },
    data () {
        return {
            todos: [],
            filter: 'active'
        }
    },
    computed: {
        filterTodos: function () {
            if (this.filter === 'all') {
                return this.todos
            }
            var isCompleted = this.filter === 'active'
            var filterTodos = this.todos.filter(item => {
                return item.completed !== isCompleted
            })
            console.log('filterTodos= ', filterTodos)
            return filterTodos
        }
    },
    methods: {
        addTodo: function (e) {
            var content = e.target.value.replace(/\s/g, '')
            if (!content) {
                return
            }
            this.todos.push({
                content: content,
                id: id++,
                completed: false
            })

            e.target.value = ''
        },
        clearAllCompleted: function () {
            console.log('will clearAllCompleted')
            this.todos = this.todos.filter(item => {
                return item.completed !== true
            })
        },
        toggleFilter: function (filter) {
            console.log('toggleFilter')
            console.log(filter)
            this.filter = filter
        },
        removeTodo: function (todo) {
            console.log('will remove todo --> ' + todo.content)
            this.todos = this.todos.filter(item => {
                return item !== todo
            })
        }
    }
}
</script>
