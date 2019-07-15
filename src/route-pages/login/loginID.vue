<template>
  <div class="login-id-page">
    <div>hello , this is Login ID page.</div>
    <div>
      loginID:{{ loginID }} <br>
      customId:{{ customId }}
    </div>
  </div>
</template>
<style lang="less" scoped>
    .login-id-page{
        border:1px dashed #fefefe;
        padding:20px;
        margin:5px;
    }
</style>

<script>
export default {
    props: {
        loginID: {
            type: String,
            required: false,
            default: 'NO Login ID'
        },
        customId: {
            type: String,
            required: false,
            default: 'NO Login ID'
        }
    }
};
</script>
