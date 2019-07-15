<template>
  <div class="custom-nav">
    <router-link to="/app">
      app
    </router-link>

    <router-link :to="{name:'test-page',params:{id:'123456'}}">
      test-page with ID = 123456
    </router-link>
    <router-link to="/test/123/login">
      /test/123/login
    </router-link>

    <router-link to="/login">
      login
    </router-link>
    <router-link to="/login/123">
      /login/123
    </router-link>

    <router-link to="/post/123">
      /post/123
    </router-link>
    <router-link to="/post/456">
      /post/456
    </router-link>

    <router-link to="/post/456/detail">
      /post/456/detail
    </router-link>
  </div>
</template>

<style lang="less" scoped>
.custom-nav {
  margin-top: 30px;
  display: flex;
  a {
    margin: 0 20px;
  }
}
</style>
