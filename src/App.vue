/* eslint-disable vue/no-unused-components */
<template>
  <div id="app">
    <div id="cover" />
    <Header />
    <!-- <Todo /> -->
    <router-view />
    <router-view name="sidebar" />
    <Footer />
    <CustomNav />
  </div>
</template>

<script>
import Header from './todo/header.vue';
import Footer from './todo/footer.jsx';

import CustomNav from './route-pages/customNav/index.vue';

export default {
    components: {
        Header: Header,
        Footer: Footer,
        CustomNav: CustomNav
    },
    data () {
        return {};
    },
    mounted () {

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
