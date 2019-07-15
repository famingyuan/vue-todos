<template>
  <div class="login-page">
    <div>hello , this is login page.</div>
    <div>will login with ID: {{ loginID }}</div>
    <router-view />
  </div>
</template>
<style lang="less" scoped>
  .login-page{
    border:1px solid #ddd;
    padding:30px;
    margin:5px;
  }
</style>

<script>
export default {
    props: {
        loginID: {
            type: String,
            required: false,
            default: ''
        }
    }
};
</script>
