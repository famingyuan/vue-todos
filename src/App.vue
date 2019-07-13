/* eslint-disable vue/no-unused-components */
<template>
  <div id="app">
    <div id="cover" />
    <Header>
      <router-link to="/app">
        app
      </router-link>
      <router-link to="/login">
        login
      </router-link>
    </Header>

    <!-- <Todo /> -->
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from './todo/header.vue';
import Footer from './todo/footer.jsx';

export default {
    components: {
        Header: Header,
        Footer: Footer
    },
    data () {
        return {};
    }
};
</script>

<style lang="less" scoped>
#app {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: url("./images/bg.jpg") no-repeat 0 0;
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
  z-index: -1;
}
</style>
