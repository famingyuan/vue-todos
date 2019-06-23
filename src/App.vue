<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <Todo></Todo>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './todo/header.vue';
import Footer from './todo/footer.jsx';
import Todo from './todo/todo.vue';

export default {
  components:{
    Header:Header,
    Footer:Footer,
    Todo:Todo
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
#app{
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: url('./assets/images/bg.jpg') no-repeat 0 0;
  background-size: cover;
  z-index: 1;
}
#cover {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: #999;
  opacity: 0.3;
  z-index: 2;
}
</style>
